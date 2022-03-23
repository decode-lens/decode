// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity 0.8.10;

import {Errors} from "../libraries/Errors.sol";
import {Events} from "../libraries/Events.sol";
import {IFollowModule} from "../interfaces/IFollowModule.sol";
import {ModuleBase} from "../core/modules/ModuleBase.sol";
import {FollowValidatorFollowModuleBase} from "../core/modules/follow/FollowValidatorFollowModuleBase.sol";
import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';

/**
 * @title FeeModuleBase
 * @author Lens Protocol
 *
 * @notice This is an abstract contract to be inherited from by modules that require basic fee functionality. It
 * contains getters for module globals parameters as well as a validation function to check expected data.
 */
contract SubscriptionFollowModule is
  IFollowModule,
  FollowValidatorFollowModuleBase
{
  mapping(uint256 => bool) internal _dataByProfile;
  mapping(address => mapping(uint256 => mapping(address => bool)))
    internal _approvedByProfilebySubscription;

  /**
   * @notice Emitted when one or multiple addresses are approved (or disapproved) for following in
   * the `ApprovalFollowModule`.
   *
   * @param owner The profile owner who executed the approval.
   * @param profileId The profile ID that the follow approvals are granted/revoked for.
   * @param addresses The addresses that have had the follow approvals grnated/revoked.
   * @param approved Whether each corresponding address is now approved or disapproved.
   * @param timestamp The current block timestamp.
   */
  event FollowsSubscription(
    address indexed owner,
    uint256 indexed profileId,
    address follower,
    uint256 timestamp
  );

  constructor(address hub, address moduleGlobals) ModuleBase(hub) {}

  /**
   * @notice This follow module levies a fee on follows.
   *
   * @param data The arbitrary data parameter, decoded into:
   *      address currency: The currency address, must be internally whitelisted.
   *      uint256 amount: The currency total amount to levy.
   *      address recipient: The custom recipient address to direct earnings to.
   *
   * @return An abi encoded bytes parameter, which is the same as the passed data parameter.
   */
  function initializeFollowModule(uint256 profileId, bytes calldata data)
    external
    override
    onlyHub
    returns (bytes memory)
  {
    // (uint256 amount, address currency, address recipient) = abi.decode(
    //     data,
    //     (uint256, address, address)
    // );

    return data;
  }

  /**
   * @dev Processes a follow by:
   *  1. Charging a fee
   */
  function processFollow(
    address follower,
    uint256 profileId,
    bytes calldata data
  ) external override onlyHub {
    // uint256 amount = _dataByProfile[profileId].amount;
    // address currency = _dataByProfile[profileId].currency;
    // _validateDataIsExpected(data, currency, amount);
  }

  function approve(uint256 profileId, address calldata follower) public {
    address owner = IERC721(HUB).ownerOf(profileId);
    _approvedByProfilebySubscription[owner][profileId][follower] = true;

    emit Events.FollowsSubscription(
      owner,
      profileId,
      follower,
      block.timestamp
    );
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

  /**
   * @notice Returns the profile data for a given profile, or an empty struct if that profile was not initialized
   * with this module.
   *
   * @param profileId The token ID of the profile to query.
   *
   * @return The ProfileData struct mapped to that profile.
   */
  function getProfileData(uint256 profileId) external view returns (bool) {
    return _dataByProfile[profileId];
  }
}