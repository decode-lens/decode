//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4 <=0.9.10;

import {ISuperfluid, ISuperAgreement, ISuperToken, ISuperApp, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {IFollowModule} from "../interfaces/IFollowModule.sol";
import {Errors} from "../libraries/Errors.sol";
import {Events} from "../libraries/Events.sol";
import {ModuleBase} from "../core/modules/ModuleBase.sol";
import {FollowValidatorFollowModuleBase} from "../core/modules/follow/FollowValidatorFollowModuleBase.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract SuperFluidFollowModule is
  SuperAppBase,
  IFollowModule,
  FollowValidatorFollowModuleBase
{
  mapping(address => mapping(uint256 => bool)) internal _streamsProfileByOwner;

  ISuperfluid private _host; // host
  IConstantFlowAgreementV1 private _cfa; // the stored constant flow agreement class address

  ISuperToken public _acceptedToken; // accepted token

  event RegistrationTimedOutEvent(bytes32 indexed phoneNumberHash);
  event RegistrationSuccessEvent(bytes32 indexed phoneNumberHash);

  struct PendingRegistration {
    address newUserAddress;
    bytes32 codeHash;
    uint256 timestamp;
  }

  constructor(
    ISuperfluid host,
    IConstantFlowAgreementV1 cfa,
    ISuperToken acceptedToken,
    address hub
  ) ModuleBase(hub) {
    require(address(host) != address(0), "host is zero address");
    require(address(cfa) != address(0), "cfa is zero address");
    require(
      address(acceptedToken) != address(0),
      "acceptedToken is zero address"
    );
    _host = host;
    _cfa = cfa;
    _acceptedToken = acceptedToken;

    uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL |
      SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
      SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
      SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

    _host.registerApp(configWord);
  }

  /**
   * @notice This follow module works on custom profile owner approvals.
   *
   * @param data The arbitrary data parameter, decoded into:
   *      address[] addresses: The array of addresses to approve initially.
   *
   * @return An abi encoded bytes parameter, which is the same as the passed data parameter.
   */
  function initializeFollowModule(uint256 profileId, bytes calldata data)
    external
    override
    onlyHub
    returns (bytes memory)
  {
    address owner = IERC721(HUB).ownerOf(profileId);
    /// get folower from calldata
    // _streamsProfileByOwner[follower][profileId] = false;
    return data;
  }

  /**
   * @dev Processes a follow by:
   *  1. Validating that the follower has been approved for that profile by the profile owner
   */
  function processFollow(
    address follower,
    uint256 profileId,
    bytes calldata data
  ) external override onlyHub {
    //_streamsProfileByOwner[follower][profileId] = false;

    address owner = IERC721(HUB).ownerOf(profileId);
    if (_streamsProfileByOwner[follower][profileId] == false)
      revert Errors.FollowNotApproved();
    // prevents repeat follows
  }

  /**
   * @dev We don't need to execute any additional logic on transfers in this follow module.
   */
  function followModuleTransferHook(
    uint256 profileId,
    address from,
    address to,
    uint256 followNFTTokenId
  ) external override {}

  /**************************************************************************
   * SuperApp callbacks
   *************************************************************************/

  function afterAgreementCreated(
    ISuperToken _superToken,
    address _agreementClass,
    bytes32, // _agreementId,
    bytes calldata _agreementData,
    bytes calldata, // _cbdata,
    bytes calldata _ctx
  )
    external
    override
    onlyExpected(_superToken, _agreementClass)
    onlyHost
    returns (bytes memory newCtx)
  {
    return _updateOutflow(_ctx, _agreementData);
  }

  function afterAgreementUpdated(
    ISuperToken _superToken,
    address _agreementClass,
    bytes32, // _agreementId,
    bytes calldata _agreementData,
    bytes calldata, //_cbdata,
    bytes calldata _ctx
  )
    external
    override
    onlyExpected(_superToken, _agreementClass)
    onlyHost
    returns (bytes memory newCtx)
  {
    return _updateOutflow(_ctx, _agreementData);
  }

  function parseFollowerStream(bytes memory data)
    internal
    pure
    returns (uint256)
  {
    (uint256 profileId) = abi.decode(data, (uint256));
  }

  /// @dev If a new stream is opened, or an existing one is opened
  function _updateOutflow(bytes calldata ctx, bytes calldata _agreementData)
    private
    returns (bytes memory newCtx)
  {
    newCtx = ctx; //update the context with the same logic...
    ISuperfluid.Context memory decodedContext = _host.decodeCtx(ctx);
    (uint256 profileId) = parseFollowerStream(decodedContext.userData);

    (address follower, ) = abi.decode(_agreementData, (address, address));
     address profileOwner = IERC721(HUB).ownerOf(profileId);

    // address treasury = "";

    require(address(profileOwner) != address(0), "Recipient is not registered");
    require(!_host.isApp(ISuperApp(profileOwner)), "Recipient is an app!");

    (, int96 inFlowRate, , ) = _cfa.getFlow(
      _acceptedToken,
      follower,
      address(this)
    ); // CHECK: unclear what happens if flow doesn't exist.

    (, int96 outFlowRate, , ) = _cfa.getFlow(
      _acceptedToken,
      address(this),
      profileOwner
    ); // CHECK: unclear what happens if flow doesn't exist.

    // @dev If inFlowRate === 0, then delete existing flow.
    if (inFlowRate == int96(0)) {
      // @dev if inFlowRate is zero, delete outflow.
      (newCtx, ) = _host.callAgreementWithContext(
        _cfa,
        abi.encodeWithSelector(
          _cfa.deleteFlow.selector,
          _acceptedToken,
          address(this),
          profileOwner,
          new bytes(0) // placeholder
        ),
        "0x",
        newCtx
      );
      _streamsProfileByOwner[follower][profileId] = false;
    } else if (outFlowRate != int96(0)) {
      (newCtx, ) = _host.callAgreementWithContext(
        _cfa,
        abi.encodeWithSelector(
          _cfa.updateFlow.selector,
          _acceptedToken,
          profileOwner,
          inFlowRate,
          new bytes(0) // placeholder
        ),
        "0x",
        newCtx
      );
         _streamsProfileByOwner[follower][profileId] = true;
    } else {
      // @dev If there is no existing outflow, then create new flow to equal inflow
      (newCtx, ) = _host.callAgreementWithContext(
        _cfa,
        abi.encodeWithSelector(
          _cfa.createFlow.selector,
          _acceptedToken,
          profileOwner,
          inFlowRate,
          new bytes(0) // placeholder
        ),
        "0x",
        newCtx
      );
         _streamsProfileByOwner[follower][profileId] = true;
    }
  }

  function afterAgreementTerminated(
    ISuperToken, /*superToken*/
    address, /*agreementClass*/
    bytes32, // _agreementId,
    bytes calldata _agreementData,
    bytes calldata, /*cbdata*/
    bytes calldata _ctx
  ) external virtual override returns (bytes memory newCtx) {
    return _updateOutflow(_ctx, _agreementData);
  }



  /**
   * @notice Returns flow details. You should always provide the sender of the originating flow that is incoming to the contract
   *
   * @param sender the flow sender
   */
  function getFlowDetails(address sender)
    public
    view
    returns (
      uint256 timestamp,
      int96 inFlowRate,
      uint256 deposit,
      uint256 owedDeposit
    )
  {
    (timestamp, inFlowRate, deposit, owedDeposit) = _cfa.getFlow(
      _acceptedToken,
      sender,
      address(this)
    );
  }

  function _isSameToken(ISuperToken superToken) private view returns (bool) {
    return address(superToken) == address(_acceptedToken);
  }

  function _isCFAv1(address agreementClass) private view returns (bool) {
    return
      ISuperAgreement(agreementClass).agreementType() ==
      keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1");
  }

  modifier onlyExpected(ISuperToken superToken, address agreementClass) {
    require(_isSameToken(superToken), "RedirectAll: not accepted token");
    require(_isCFAv1(agreementClass), "RedirectAll: only CFAv1 supported");
    _;
  }

  modifier onlyHost() {
    require(msg.sender == address(_host), "RedirectAll: support only one host");
    _;
  }
}