/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  PublishingLogic,
  PublishingLogicInterface,
} from "../PublishingLogic";

const _abi = [
  {
    inputs: [],
    name: "CollectModuleNotWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "FollowModuleNotWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "HandleContainsInvalidCharacters",
    type: "error",
  },
  {
    inputs: [],
    name: "HandleLengthInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "HandleTaken",
    type: "error",
  },
  {
    inputs: [],
    name: "PublicationDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "ReferenceModuleNotWhitelisted",
    type: "error",
  },
];

const _bytecode =
  "0x61174261003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100615760003560e01c80636a7ecf13146100665780637ecf4cde146100885780638588c2ff146100a85780639dbf0510146100c8578063e63aa93e146100e8575b600080fd5b81801561007257600080fd5b50610086610081366004610ee1565b610108565b005b81801561009457600080fd5b506100866100a3366004610f4d565b6101cc565b8180156100b457600080fd5b506100866100c3366004610faf565b6103a2565b8180156100d457600080fd5b506100866100e3366004611128565b610502565b8180156100f457600080fd5b50610086610103366004611204565b6105a3565b60018201546001600160a01b03908116908616811461013f576001830180546001600160a01b0319166001600160a01b0388161790555b6000610184888888888080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525089925061074b915050565b9050877f92d95e400932d129885e627b38b169cbb28443ffaaa282d0fba0cf87977213598883426040516101ba9392919061137a565b60405180910390a25050505050505050565b6101e16101dc60208701876113ae565b61082f565b60006101f060208701876113ae565b6040516101fe9291906113f5565b604051809103902090508360008281526020019081526020016000205460001461023b5760405163902815b960e01b815260040160405180910390fd5b600081815260208581526040909120869055610259908701876113ae565b600087815260208690526040902061027692600390910191610d6f565b5061028460408701876113ae565b60008781526020869052604090206102a192600490910191610d6f565b506102af60a08701876113ae565b60008781526020869052604090206102cc92600590910191610d6f565b5060006102df6080880160608901611405565b6001600160a01b03161461032d576102fd6080870160608801611405565b600086815260208590526040902060010180546001600160a01b0319166001600160a01b03929092169190911790555b600061038c8661034360808a0160608b01611405565b61035060808b018b6113ae565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525089925061074b915050565b90506103998688836109bb565b50505050505050565b6000806103b08a8a86610a4f565b5060008d8152602087815260408083208a845282528083208581556001018490558051601f8c018390048302810183019091528a81529395509193509161041c918e9189918d91908d908d90819084018382808284376000920191909152508c92508b9150610b119050565b6000848152602087815260408083208684529091529020600301549091506001600160a01b031680156104b25760405163671fc6e360e11b8152600481018e905260248101859052604481018490526001600160a01b0382169063ce3f8dc690606401600060405180830381600087803b15801561049957600080fd5b505af11580156104ad573d6000803e3d6000fd5b505050505b868d7f97b9055fe47ed7cd8c738acfff5df5ea4d7acc72bd6c52946e5cdf7f1d0b5fe486868e87426040516104eb959493929190611427565b60405180910390a350505050505050505050505050565b60008a81526020848152604080832087845282529091208a5161052d926002909201918c0190610df3565b50600061053e8b868b8b8888610c20565b905060006105508c878a8a8988610b11565b9050858c7fc672c38b4d26c3c978228e99164105280410b144af24dd3ed8e4f9d211d96a508d8d868d874260405161058d96959493929190611466565b60405180910390a3505050505050505050505050565b60408087015160009081526020869052205460608701518110806105c957506060870151155b156105e75760405163a43d2a7160e01b815260040160405180910390fd5b6020808801518851600090815286835260408082208a83528452902081516106189360029092019290910190610df3565b506040808801518851600090815260208781528382208a835281528382209290925560608a01518a5182528783528382208a8352909252918220600101558751608089015160a08a015161067092918a918989610c20565b9050600061068e8960000151898b60c001518c60e001518a89610b11565b6040808b01516000908152602089815282822060608e01518352905220600301549091506001600160a01b031680156107335789516040808c015160608d015191516372f2470960e01b81526004810193909352602483015260448201526001600160a01b038216906372f2470990606401600060405180830381600087803b15801561071a57600080fd5b505af115801561072e573d6000803e3d6000fd5b505050505b61073f8a8a8585610d0a565b50505050505050505050565b60606001600160a01b03841615610816576001600160a01b03841660009081526020839052604090205460ff166107955760405163efb6a45f60e01b815260040160405180910390fd5b604051634b89cac560e11b81526000906001600160a01b03861690639713958a906107c690899088906004016114cb565b6000604051808303816000875af11580156107e5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261080d91908101906114e4565b91506108279050565b506040805160008152602081019091525b949350505050565b600082828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050825192935050901590508061087b57508051601f105b1561089957604051633eb64ab360e01b815260040160405180910390fd5b60005b81518110156109b557600360fc1b8282815181106108bc576108bc61155b565b01602001516001600160f81b03191610806108fa5750603d60f91b8282815181106108e9576108e961155b565b01602001516001600160f81b031916115b806109565750603960f81b8282815181106109175761091761155b565b01602001516001600160f81b0319161180156109565750606160f81b8282815181106109455761094561155b565b01602001516001600160f81b031916105b8015610987575081818151811061096f5761096f61155b565b6020910101516001600160f81b031916601760f91b14155b156109a557604051630bb7f19b60e21b815260040160405180910390fd5b6109ae81611571565b905061089c565b50505050565b6109c86020830183611405565b6001600160a01b031633847f4e14f57cff7910416f2ef43cf05019b5a97a313de71fec9344be11b9b88fed12610a0160208701876113ae565b610a0e60408901896113ae565b610a1e60808b0160608c01611405565b89610a2c60a08d018d6113ae565b42604051610a42999897969594939291906115c3565b60405180910390a4505050565b600083815260208281526040808320858452909152812060040154819081906001600160a01b03168015610a8a578693508592509050610b08565b60008781526020868152604080832089845290915290205480610ac05760405163a43d2a7160e01b815260040160405180910390fd5b6000888152602087815260408083208a84528252808320600101548484528983528184208185529092529091206004015491955093506001600160a01b03169150610b089050565b93509350939050565b60606001600160a01b03851615610c05576001600160a01b03851660009081526020839052604090205460ff16610b5b576040516355bdf4ef60e11b815260040160405180910390fd5b6000878152602084815260408083208984529091529081902060030180546001600160a01b0319166001600160a01b0388169081179091559051632b00a57d60e11b81526356014afa90610bb7908a908a908990600401611639565b6000604051808303816000875af1158015610bd6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610bfe91908101906114e4565b9050610c16565b506040805160008152602081019091525b9695505050505050565b6001600160a01b03841660009081526020829052604090205460609060ff16610c5c576040516396c65af360e01b815260040160405180910390fd5b60008781526020848152604080832089845290915290819020600490810180546001600160a01b0319166001600160a01b038916908117909155915163c233f95160e01b815263c233f95191610cb8918b918b918a9101611639565b6000604051808303816000875af1158015610cd7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610cff91908101906114e4565b979650505050505050565b8284600001517f1ebcc7e9f727eddf156305e8ac88d34c06f354e5632129feb0235e4aea3b7a9d8660200151876040015188606001518960800151888b60c001518942604051610d61989796959493929190611658565b60405180910390a350505050565b828054610d7b906116d1565b90600052602060002090601f016020900481019282610d9d5760008555610de3565b82601f10610db65782800160ff19823516178555610de3565b82800160010185558215610de3579182015b82811115610de3578235825591602001919060010190610dc8565b50610def929150610e67565b5090565b828054610dff906116d1565b90600052602060002090601f016020900481019282610e215760008555610de3565b82601f10610e3a57805160ff1916838001178555610de3565b82800160010185558215610de3579182015b82811115610de3578251825591602001919060010190610e4c565b5b80821115610def5760008155600101610e68565b80356001600160a01b0381168114610e9357600080fd5b919050565b60008083601f840112610eaa57600080fd5b50813567ffffffffffffffff811115610ec257600080fd5b602083019150836020828501011115610eda57600080fd5b9250929050565b60008060008060008060a08789031215610efa57600080fd5b86359550610f0a60208801610e7c565b9450604087013567ffffffffffffffff811115610f2657600080fd5b610f3289828a01610e98565b979a9699509760608101359660809091013595509350505050565b600080600080600060a08688031215610f6557600080fd5b853567ffffffffffffffff811115610f7c57600080fd5b860160c08189031215610f8e57600080fd5b97602087013597506040870135966060810135965060800135945092505050565b60008060008060008060008060006101008a8c031215610fce57600080fd5b8935985060208a0135975060408a01359650610fec60608b01610e7c565b955060808a013567ffffffffffffffff81111561100857600080fd5b6110148c828d01610e98565b9a9d999c50979a9699979860a08801359760c0810135975060e0013595509350505050565b634e487b7160e01b600052604160045260246000fd5b604051610100810167ffffffffffffffff8111828210171561107357611073611039565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156110a2576110a2611039565b604052919050565b600067ffffffffffffffff8211156110c4576110c4611039565b50601f01601f191660200190565b600082601f8301126110e357600080fd5b81356110f66110f1826110aa565b611079565b81815284602083860101111561110b57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806000806000806000806000806101408b8d03121561114857600080fd5b8a35995060208b013567ffffffffffffffff8082111561116757600080fd5b6111738e838f016110d2565b9a5061118160408e01610e7c565b995060608d013591508082111561119757600080fd5b6111a38e838f016110d2565b98506111b160808e01610e7c565b975060a08d01359150808211156111c757600080fd5b506111d48d828e016110d2565b95505060c08b0135935060e08b013592506101008b013591506101208b013590509295989b9194979a5092959850565b60008060008060008060c0878903121561121d57600080fd5b863567ffffffffffffffff8082111561123557600080fd5b90880190610100828b03121561124a57600080fd5b61125261104f565b8235815260208301358281111561126857600080fd5b6112748c8286016110d2565b602083015250604083013560408201526060830135606082015261129a60808401610e7c565b608082015260a0830135828111156112b157600080fd5b6112bd8c8286016110d2565b60a0830152506112cf60c08401610e7c565b60c082015260e0830135828111156112e657600080fd5b6112f28c8286016110d2565b60e0830152509a60208a01359a5060408a013599606081013599506080810135985060a001359650945050505050565b60005b8381101561133d578181015183820152602001611325565b838111156109b55750506000910152565b60008151808452611366816020860160208601611322565b601f01601f19169290920160200192915050565b6001600160a01b038416815260606020820181905260009061139e9083018561134e565b9050826040830152949350505050565b6000808335601e198436030181126113c557600080fd5b83018035915067ffffffffffffffff8211156113e057600080fd5b602001915036819003821315610eda57600080fd5b8183823760009101908152919050565b60006020828403121561141757600080fd5b61142082610e7c565b9392505050565b85815284602082015260018060a01b038416604082015260a06060820152600061145460a083018561134e565b90508260808301529695505050505050565b60c08152600061147960c083018961134e565b6001600160a01b038881166020850152838203604085015261149b828961134e565b9087166060850152838103608085015290506114b7818661134e565b9150508260a0830152979650505050505050565b828152604060208201526000610827604083018461134e565b6000602082840312156114f657600080fd5b815167ffffffffffffffff81111561150d57600080fd5b8201601f8101841361151e57600080fd5b805161152c6110f1826110aa565b81815285602083850101111561154157600080fd5b611552826020830160208601611322565b95945050505050565b634e487b7160e01b600052603260045260246000fd5b600060001982141561159357634e487b7160e01b600052601160045260246000fd5b5060010190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60c0815260006115d760c083018b8d61159a565b82810360208401526115ea818a8c61159a565b6001600160a01b03891660408501528381036060850152905061160d818861134e565b9050828103608084015261162281868861159a565b9150508260a08301529a9950505050505050505050565b838152826020820152606060408201526000611552606083018461134e565b600061010080835261166c8184018c61134e565b602084018b9052604084018a90526001600160a01b038981166060860152848203608086015290915061169f828961134e565b90871660a085015283810360c085015290506116bb818661134e565b9150508260e08301529998505050505050505050565b600181811c908216806116e557607f821691505b6020821081141561170657634e487b7160e01b600052602260045260246000fd5b5091905056fea26469706673582212209d53e6d69175276f0ec64bb95a0ce980e72ba1d1942ebb55e3fb5b346a747f5e64736f6c634300080a0033";

type PublishingLogicConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PublishingLogicConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PublishingLogic__factory extends ContractFactory {
  constructor(...args: PublishingLogicConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PublishingLogic> {
    return super.deploy(overrides || {}) as Promise<PublishingLogic>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PublishingLogic {
    return super.attach(address) as PublishingLogic;
  }
  connect(signer: Signer): PublishingLogic__factory {
    return super.connect(signer) as PublishingLogic__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PublishingLogicInterface {
    return new utils.Interface(_abi) as PublishingLogicInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PublishingLogic {
    return new Contract(address, _abi, signerOrProvider) as PublishingLogic;
  }
}
