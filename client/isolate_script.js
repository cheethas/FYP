const Web3 = require("web3");
const Tx = require("ethereumjs-tx");
const Common = require("ethereumjs-common");



var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

web3.eth.accounts.wallet.add("0x3f07fec333030b43aefeb1e6eb1a85ffc732d322f5300639b8770d2354240632")
let privateKey = "3f07fec333030b43aefeb1e6eb1a85ffc732d322f5300639b8770d2354240632"
let addressFrom = "0x3341455C984441D730738cad896BcFe9A01D0cce"
let addressTo = "0x21f754eF0aDb6279b03d2a2821a8FA667779FE06"
let recoveryContractAddress = "0x1779398c44D58fd85f7E8BbDeA75d0de322617a0"

let abi = {
  "contractName": "Recovery",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_parentContract",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "_recoveryThreshold",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "previousChange",
          "type": "uint256"
        }
      ],
      "name": "TrusteeAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "previousChange",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currentBlock",
          "type": "uint256"
        }
      ],
      "name": "TrusteeVerified",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "blacklisted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "confirmed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "confirmedBlockNo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentChange",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "shardHolders",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "trustees",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNFTAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTrustees",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "viewWhoTriggeredRecovery",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_toAdd",
          "type": "address[]"
        }
      ],
      "name": "batchAddShardholder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_toBlacklist",
          "type": "address[]"
        }
      ],
      "name": "batchBlacklistShardholder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_toBlacklist",
          "type": "address[]"
        }
      ],
      "name": "batchRemoveBlacklistShardholder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "confirmTrustee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_shardOwner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_shardURI",
          "type": "string"
        }
      ],
      "name": "sendShardToShardOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_payloadURI",
          "type": "string"
        }
      ],
      "name": "triggerRecoveryEvent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_payloadURI",
          "type": "string"
        }
      ],
      "name": "sendShardToRecoveryInitialiser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "destroyShardContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_currentOwner",
          "type": "address"
        }
      ],
      "name": "transferRecoveryOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.7.4+commit.3f05b770\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_parentContract\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"internalType\":\"uint8\",\"name\":\"_recoveryThreshold\",\"type\":\"uint8\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"previousChange\",\"type\":\"uint256\"}],\"name\":\"TrusteeAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"previousChange\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"currentBlock\",\"type\":\"uint256\"}],\"name\":\"TrusteeVerified\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"_toAdd\",\"type\":\"address[]\"}],\"name\":\"batchAddShardholder\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"_toBlacklist\",\"type\":\"address[]\"}],\"name\":\"batchBlacklistShardholder\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"_toBlacklist\",\"type\":\"address[]\"}],\"name\":\"batchRemoveBlacklistShardholder\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"blacklisted\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"confirmTrustee\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"confirmed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"confirmedBlockNo\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"currentChange\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"destroyShardContract\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getNFTAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getTrustees\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_payloadURI\",\"type\":\"string\"}],\"name\":\"sendShardToRecoveryInitialiser\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_shardOwner\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"_shardURI\",\"type\":\"string\"}],\"name\":\"sendShardToShardOwner\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"shardHolders\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_newOwner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_currentOwner\",\"type\":\"address\"}],\"name\":\"transferRecoveryOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_payloadURI\",\"type\":\"string\"}],\"name\":\"triggerRecoveryEvent\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"trustees\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"viewWhoTriggeredRecovery\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"renounceOwnership()\":{\"details\":\"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.\"},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"confirmTrustee()\":{\"notice\":\"Confirm Trustee\"},\"destroyShardContract()\":{\"notice\":\"Destroy Shard contract\"},\"triggerRecoveryEvent(string)\":{\"notice\":\"Trigger Recovery Event Triggering the recovery event will send a recovery NFT to the addresses of the token holders Any of the shard owners can trigger this event\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"/C/Users/schee/Documents/Projects/fresh_fyp/contracts/Recovery.sol\":\"Recovery\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"/C/Users/schee/Documents/Projects/fresh_fyp/contracts/IShardManager.sol\":{\"keccak256\":\"0x8eee34527fde95d86c9a6dbcf3177d6d7977c2afaaa32abf29404857d045c0bf\",\"urls\":[\"bzz-raw://cd23fd0cd4aa8dacb2e1165c3a4ab716f75e220c3cf0802c35314dbfcbf0a6a0\",\"dweb:/ipfs/Qmd8FYrqYCBfVq1oWEWhSYnbHHFvLqgRC8236KmjjtSz3P\"]},\"/C/Users/schee/Documents/Projects/fresh_fyp/contracts/IShardNFT.sol\":{\"keccak256\":\"0xbfdbff198b20810cd60e7975cfcb6bd0143a3e83fd8ea9f6c7a3be6198712490\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d466bf06ec4f52d42e731fab196d60396fee2e9dd39a0080ea0801767390c0e5\",\"dweb:/ipfs/QmbHkPcnDahz1hqbn4Prbfg19oMcz9t9aLKoRhLX1GqgRw\"]},\"/C/Users/schee/Documents/Projects/fresh_fyp/contracts/Recovery.sol\":{\"keccak256\":\"0x254634127a6249d7f65b0c6f6853164abc8c2adf5b8fbe603c4e2d93a326a7a3\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://dacc05336e5b1d203859d60fd0e60d8c2ea22115c5f61d7223bca56f8d03fe95\",\"dweb:/ipfs/Qmc51udJ2rLnPkwd3NUA767dP6Zrs59Nnaj5XMKJs5VeLx\"]},\"/C/Users/schee/Documents/Projects/fresh_fyp/contracts/ShardNFT.sol\":{\"keccak256\":\"0x16cb86bfdb2962fe5e8c540f2f0a31d1b496cf46ca748066ad6dea1d68135dde\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://811a6bc8b240b481498f55be684ea0807fe2e8f183696e28b9c9af162b879cff\",\"dweb:/ipfs/QmXrY54D3XK7nhS2eD3ScxvinihkVFyH39ez97tqFEwTK9\"]},\"@openzeppelin/contracts/access/Ownable.sol\":{\"keccak256\":\"0x15e2d5bd4c28a88548074c54d220e8086f638a71ed07e6b3ba5a70066fcf458d\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://90faf5851c02f9bd42c5bfb54d4f0421a2612f50ab80b2c4fa24fa3792071cc2\",\"dweb:/ipfs/QmRGM4F2PcGVF85aTfaA9YBhCHHDqrMhRjyp6fGeBTtirb\"]},\"@openzeppelin/contracts/introspection/ERC165.sol\":{\"keccak256\":\"0x24141d2f6b98d4cb77a8936eae8cbaad2e261d9062bdc08036096f4550092501\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b710eb003944777135f027500a5a57b479fe857849f5f467c1ef9687401e3c95\",\"dweb:/ipfs/QmcELzi6KRzAs3DXwxdsoKWRJ13KSeipKQsJgD3unctdZM\"]},\"@openzeppelin/contracts/introspection/IERC165.sol\":{\"keccak256\":\"0xf70bc25d981e4ec9673a995ad2995d5d493ea188d3d8f388bba9c227ce09fb82\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://bd970f51e3a77790c2f02b5b1759827c3b897c3d98c407b3631e8af32e3dc93c\",\"dweb:/ipfs/QmPF85Amgbqjk3SNZKsPCsqCw8JfwYEPMnnhvMJUyX58je\"]},\"@openzeppelin/contracts/math/SafeMath.sol\":{\"keccak256\":\"0xcc78a17dd88fa5a2edc60c8489e2f405c0913b377216a5b26b35656b2d0dab52\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://526dc85e1f9b9b45830e202568d267d93dde7a4fcccf4ad7798dadcd92304d3c\",\"dweb:/ipfs/QmaoXMB972J3cSDLtBq3xBo4jLwqD2uzXTwujtSPqkYVhR\"]},\"@openzeppelin/contracts/token/ERC721/ERC721.sol\":{\"keccak256\":\"0x118ed7540f56b21ff92e21ebaa73584048e98d2ac04ca67571329bb8dbd9032f\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da2918b7aff73dd51d41bfcfa548f81eb50531b8353500fdbdacf297076db070\",\"dweb:/ipfs/Qmb8ixAs1vBjZRowQNuNg6bRf2NZmgZ1JTBxmQS14PHpcL\"]},\"@openzeppelin/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0x2d99a0deb6648c34fbc66d6ac4a2d64798d7a5321b45624f6736fadc63da1962\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2dcdce5ede1e5e650d174ec0b35be7d47b6a50f30bc895ef0d9e59fb75052e45\",\"dweb:/ipfs/QmQ2XFsDLTYqfEdw7pYzHiGtFRY11yQm4b6ynYgKqDxeB8\"]},\"@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol\":{\"keccak256\":\"0xe6bd1b1218338b6f9fe17776f48623b4ac3d8a40405f74a44bc23c00abe2ca13\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://0c354c3f6e9c487759aa7869be4fba68e0b2efc777b514d289c4cbd3ff8f7e1a\",\"dweb:/ipfs/QmdF9LcSYVmiUCL7JxLEYmSLrjga6zJsujfi6sgEJD4M1z\"]},\"@openzeppelin/contracts/token/ERC721/IERC721Metadata.sol\":{\"keccak256\":\"0xccb917776f826ac6b68bd5a15a5f711e3967848a52ba11e6104d9a4f593314a7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://430255ad2229ced6d880e61a67bdc6e48dbbaed8354a7c1fe918cd8b8714a886\",\"dweb:/ipfs/QmTHY56odzqEpEC6v6tafaWMYY7vmULw25q5XHJLCCAeox\"]},\"@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol\":{\"keccak256\":\"0x52146049d6709c870e8ddcd988b5155cb6c5d640cfcd8978aee52bc1ba2ec4eb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ada84513617b7c1b2f890b44503735abaec73a1acd030112a17aac7e6c66a4a1\",\"dweb:/ipfs/QmaiFwdio67iJrfjAdkMac24eJ5sS1qD7CZW6PhUU6KjiK\"]},\"@openzeppelin/contracts/utils/Address.sol\":{\"keccak256\":\"0x28911e614500ae7c607a432a709d35da25f3bc5ddc8bd12b278b66358070c0ea\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://256c8c8af5eb072bc473226ab2b2187149b8fc04f5f4a4820db22527f5ce8e3c\",\"dweb:/ipfs/QmRvi5BhnL7Rxf85KrJhwM6RRhukm4tzoctRdgQEheNyiN\"]},\"@openzeppelin/contracts/utils/Context.sol\":{\"keccak256\":\"0x8d3cb350f04ff49cfb10aef08d87f19dcbaecc8027b0bed12f3275cd12f38cf0\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ded47ec7c96750f9bd04bbbc84f659992d4ba901cb7b532a52cd468272cf378f\",\"dweb:/ipfs/QmfBrGtQP7rZEqEg6Wz6jh2N2Kukpj1z5v3CGWmAqrzm96\"]},\"@openzeppelin/contracts/utils/Counters.sol\":{\"keccak256\":\"0x21662e4254ce4ac8570b30cc7ab31435966b3cb778a56ba4d09276881cfb2437\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://acce8fe6adc670f9987a8b6aedc4cc0abcd0dcd2e152d649a12099d735bd7bad\",\"dweb:/ipfs/QmXAk17oK3daBmA8CGyVcU56L496jW3U6Ef1WkfHyB1JAV\"]},\"@openzeppelin/contracts/utils/EnumerableMap.sol\":{\"keccak256\":\"0x4b087f06b6670a131a5a14e53b1d2a5ef19c034cc5ec42eeebcf9554325744ad\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://f6a6af5d848334e40db419773f6360601e311ffc21c2e274f730b8c542da99fd\",\"dweb:/ipfs/QmfA24cxQ2g41ZWUuDF295dxDJ4xF1bSDYtC3EaLd7CzW8\"]},\"@openzeppelin/contracts/utils/EnumerableSet.sol\":{\"keccak256\":\"0x1562cd9922fbf739edfb979f506809e2743789cbde3177515542161c3d04b164\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://4580d57781513d98870d9738c7d39094336e0a70cdb90d68dad549c6ced466ec\",\"dweb:/ipfs/Qmf9YZzzRFuvMnav9dgmeRUpdYMMECiZX8w25sHWVbA18V\"]},\"@openzeppelin/contracts/utils/Strings.sol\":{\"keccak256\":\"0xa1e12f97981f1d0964b1c048978606a57127c56c438bab61cdfe269cad859a74\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://5eefac1760f524971e14aa3f3d79515a3d54fd28c1d3bdca0b36127da349b830\",\"dweb:/ipfs/QmUMzkyH3ytJX5gVPizQruNLhkKmuJb3nFqBDad4LPdg5U\"]}},\"version\":1}",
  "bytecode": "0x60806040526000600760006101000a81548160ff021916908360ff1602179055503480156200002d57600080fd5b506040516200565638038062005656833981810160405260608110156200005357600080fd5b8101908080519060200190929190805190602001909291908051906020019092919050505060006200008a6200020a60201b60201c565b9050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35082600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604051620001779062000440565b604051809103906000f08015801562000194573d6000803e3d6000fd5b50600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620001e6826200021260201b60201c565b80600760006101000a81548160ff021916908360ff1602179055505050506200044e565b600033905090565b620002226200020a60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16620002486200041760201b60201c565b73ffffffffffffffffffffffffffffffffffffffff1614620002d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156200035a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180620056306026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b612ef8806200273883390190565b6122da806200045e6000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80638da5cb5b116100b8578063beffaf091161007c578063beffaf091461070b578063c6ea00671461076a578063dbac26e914610774578063dd70b55c146107ce578063f2fde38b146107d8578063f5cd36431461081c57610137565b80638da5cb5b146105345780638eb4285a146105685780639bcfb6f9146105c2578063a9d997951461067d578063b9618478146106d757610137565b80636fa0245d116100ff5780636fa0245d14610360578063715018a61461043b578063717d63a414610445578063798c20ea1461049d57806383f3138b1461051657610137565b806321668dd41461013c578063238a6acb146101f75780633ccfbde31461024f5780635df6849d146102c857806364cc629b1461032c575b600080fd5b6101f56004803603602081101561015257600080fd5b810190808035906020019064010000000081111561016f57600080fd5b82018360208201111561018157600080fd5b803590602001918460018302840111640100000000831117156101a357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610895565b005b6102396004803603602081101561020d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c9a565b6040518082815260200191505060405180910390f35b6102c66004803603602081101561026557600080fd5b810190808035906020019064010000000081111561028257600080fd5b82018360208201111561029457600080fd5b803590602001918460208302840111640100000000831117156102b657600080fd5b9091929391929390505050610cb2565b005b61032a600480360360408110156102de57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e07565b005b610334611019565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104396004803603604081101561037657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156103b357600080fd5b8201836020820111156103c557600080fd5b803590602001918460018302840111640100000000831117156103e757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611043565b005b6104436112e9565b005b6104716004803603602081101561045b57600080fd5b8101908080359060200190929190505050611456565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610514600480360360208110156104b357600080fd5b81019080803590602001906401000000008111156104d057600080fd5b8201836020820111156104e257600080fd5b8035906020019184602083028401116401000000008311171561050457600080fd5b9091929391929390505050611495565b005b61051e6116fb565b6040518082815260200191505060405180910390f35b61053c611701565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105aa6004803603602081101561057e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061172a565b60405180821515815260200191505060405180910390f35b61067b600480360360208110156105d857600080fd5b81019080803590602001906401000000008111156105f557600080fd5b82018360208201111561060757600080fd5b8035906020019184600183028401116401000000008311171561062957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061174a565b005b6106bf6004803603602081101561069357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611a7d565b60405180821515815260200191505060405180910390f35b6106df611a9d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610713611b76565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561075657808201518184015260208101905061073b565b505050509050019250505060405180910390f35b610772611c04565b005b6107b66004803603602081101561078a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611cb5565b60405180821515815260200191505060405180910390f35b6107d6611cd5565b005b61081a600480360360208110156107ee57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611f2f565b005b6108936004803603602081101561083257600080fd5b810190808035906020019064010000000081111561084f57600080fd5b82018360208201111561086157600080fd5b8035906020019184602083028401116401000000008311171561088357600080fd5b9091929391929390505050612121565b005b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156109385750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b6109aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f4e6f7420612076616c696420547275737465650000000000000000000000000081525060200191505060405180910390fd5b33600760026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060005b6006805490508160ff161015610c96576001600060068360ff1681548110610a1257fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff168015610b1557506002600060068360ff1681548110610aa057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b15610c8957600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663542792b660068360ff1681548110610b6857fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610bff578082015181840152602081019050610be4565b50505050905090810190601f168015610c2c5780820380516001836020036101000a031916815260200191505b509350505050602060405180830381600087803b158015610c4c57600080fd5b505af1158015610c60573d6000803e3d6000fd5b505050506040513d6020811015610c7657600080fd5b8101908080519060200190929190505050505b80806001019150506109ee565b5050565b60046020528060005260406000206000915090505481565b610cba612276565b73ffffffffffffffffffffffffffffffffffffffff16610cd8611701565b73ffffffffffffffffffffffffffffffffffffffff1614610d61576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b60005b828290508160ff161015610e025760006002600085858560ff16818110610d8757fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508080600101915050610d64565b505050565b610e0f612276565b73ffffffffffffffffffffffffffffffffffffffff16610e2d611701565b73ffffffffffffffffffffffffffffffffffffffff1614610eb6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663317c51b1833073ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610f3b57600080fd5b505afa158015610f4f573d6000803e3d6000fd5b505050506040513d6020811015610f6557600080fd5b8101908080519060200190929190505050306040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019350505050600060405180830381600087803b158015610ffd57600080fd5b505af1158015611011573d6000803e3d6000fd5b505050505050565b6000600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61104b612276565b73ffffffffffffffffffffffffffffffffffffffff16611069611701565b73ffffffffffffffffffffffffffffffffffffffff16146110f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166111b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f4e6f7420612076616c696420547275737465650000000000000000000000000081525060200191505060405180910390fd5b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663542792b683836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561125c578082015181840152602081019050611241565b50505050905090810190601f1680156112895780820380516001836020036101000a031916815260200191505b509350505050602060405180830381600087803b1580156112a957600080fd5b505af11580156112bd573d6000803e3d6000fd5b505050506040513d60208110156112d357600080fd5b8101908080519060200190929190505050505050565b6112f1612276565b73ffffffffffffffffffffffffffffffffffffffff1661130f611701565b73ffffffffffffffffffffffffffffffffffffffff1614611398576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6006818154811061146657600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61149d612276565b73ffffffffffffffffffffffffffffffffffffffff166114bb611701565b73ffffffffffffffffffffffffffffffffffffffff1614611544576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b60005b828290508160ff1610156116f657600115156001600085858560ff1681811061156c57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515146116e957600180600085858560ff168181106115ec57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600683838360ff1681811061166b57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff169080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b8080600101915050611547565b505050565b60055481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60016020528060005260406000206000915054906101000a900460ff1681565b600073ffffffffffffffffffffffffffffffffffffffff16600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561180f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f5265636f76657279206e6f742079657420696e697469616c697365640000000081525060200191505060405180910390fd5b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156118b25750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b611924576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f4e6f7420612076616c696420547275737465650000000000000000000000000081525060200191505060405180910390fd5b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663542792b6600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156119f15780820151818401526020810190506119d6565b50505050905090810190601f168015611a1e5780820380516001836020036101000a031916815260200191505b509350505050602060405180830381600087803b158015611a3e57600080fd5b505af1158015611a52573d6000803e3d6000fd5b505050506040513d6020811015611a6857600080fd5b81019080805190602001909291905050505050565b60036020528060005260406000206000915054906101000a900460ff1681565b6000611aa7612276565b73ffffffffffffffffffffffffffffffffffffffff16611ac5611701565b73ffffffffffffffffffffffffffffffffffffffff1614611b4e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606006805480602002602001604051908101604052809291908181526020018280548015611bfa57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611bb0575b5050505050905090565b611c0c612276565b73ffffffffffffffffffffffffffffffffffffffff16611c2a611701565b73ffffffffffffffffffffffffffffffffffffffff1614611cb3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b565b60026020528060005260406000206000915054906101000a900460ff1681565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611d94576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f53656e646572206973206e6f742061207472757374656500000000000000000081525060200191505060405180910390fd5b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555043600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff167f19a67108cdc6ba4d7a3b8dbbb34ff36b3def77fcf222e93968c6e60e41565a313073ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015611eae57600080fd5b505afa158015611ec2573d6000803e3d6000fd5b505050506040513d6020811015611ed857600080fd5b810190808051906020019092919050505060055443604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a243600581905550565b611f37612276565b73ffffffffffffffffffffffffffffffffffffffff16611f55611701565b73ffffffffffffffffffffffffffffffffffffffff1614611fde576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415612064576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602681526020018061227f6026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b612129612276565b73ffffffffffffffffffffffffffffffffffffffff16612147611701565b73ffffffffffffffffffffffffffffffffffffffff16146121d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b60005b828290508160ff1610156122715760016002600085858560ff168181106121f657fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555080806001019150506121d3565b505050565b60003390509056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a2646970667358221220246f358f8adbc497ea298910f5bb7ec873342cf322ab168132028517ce9c013664736f6c6343000704003360806040523480156200001157600080fd5b506040518060400160405280600881526020017f5265636f766572790000000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f724e465400000000000000000000000000000000000000000000000000000000815250620000966301ffc9a760e01b6200015960201b60201c565b8160069080519060200190620000ae92919062000262565b508060079080519060200190620000c792919062000262565b50620000e06380ac58cd60e01b6200015960201b60201c565b620000f8635b5e139f60e01b6200015960201b60201c565b6200011063780e9d6360e01b6200015960201b60201c565b505032600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000318565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161415620001f6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433136353a20696e76616c696420696e746572666163652069640000000081525060200191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200029a5760008555620002e6565b82601f10620002b557805160ff1916838001178555620002e6565b82800160010185558215620002e6579182015b82811115620002e5578251825591602001919060010190620002c8565b5b509050620002f59190620002f9565b5090565b5b8082111562000314576000816000905550600101620002fa565b5090565b612bd080620003286000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063542792b6116100a257806395d89b411161007157806395d89b4114610667578063a22cb465146106ea578063b88d4fde1461073a578063c87b56dd1461083f578063e985e9c5146108e657610116565b8063542792b6146104455780636352211e146105345780636c0360eb1461058c57806370a082311461060f57610116565b806318160ddd116100e957806318160ddd146102a757806323b872dd146102c55780632f745c591461033357806342842e0e146103955780634f6ccce71461040357610116565b806301ffc9a71461011b57806306fdde031461017e578063081812fc14610201578063095ea7b314610259575b600080fd5b6101666004803603602081101561013157600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610960565b60405180821515815260200191505060405180910390f35b6101866109c7565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101c65780820151818401526020810190506101ab565b50505050905090810190601f1680156101f35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61022d6004803603602081101561021757600080fd5b8101908080359060200190929190505050610a69565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102a56004803603604081101561026f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b04565b005b6102af610c48565b6040518082815260200191505060405180910390f35b610331600480360360608110156102db57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c59565b005b61037f6004803603604081101561034957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ccf565b6040518082815260200191505060405180910390f35b610401600480360360608110156103ab57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d2a565b005b61042f6004803603602081101561041957600080fd5b8101908080359060200190929190505050610d4a565b6040518082815260200191505060405180910390f35b61051e6004803603604081101561045b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561049857600080fd5b8201836020820111156104aa57600080fd5b803590602001918460018302840111640100000000831117156104cc57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610d6d565b6040518082815260200191505060405180910390f35b6105606004803603602081101561054a57600080fd5b8101908080359060200190929190505050610da5565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610594610ddc565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105d45780820151818401526020810190506105b9565b50505050905090810190601f1680156106015780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6106516004803603602081101561062557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e7e565b6040518082815260200191505060405180910390f35b61066f610f53565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106af578082015181840152602081019050610694565b50505050905090810190601f1680156106dc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6107386004803603604081101561070057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050610ff5565b005b61083d6004803603608081101561075057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001906401000000008111156107b757600080fd5b8201836020820111156107c957600080fd5b803590602001918460018302840111640100000000831117156107eb57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506111ab565b005b61086b6004803603602081101561085557600080fd5b8101908080359060200190929190505050611223565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156108ab578082015181840152602081019050610890565b50505050905090810190601f1680156108d85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610948600480360360408110156108fc57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114f4565b60405180821515815260200191505060405180910390f35b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b606060068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a5f5780601f10610a3457610100808354040283529160200191610a5f565b820191906000526020600020905b815481529060010190602001808311610a4257829003601f168201915b5050505050905090565b6000610a7482611588565b610ac9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612a99602c913960400191505060405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000610b0f82610da5565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b96576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180612b496021913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610bb56115a5565b73ffffffffffffffffffffffffffffffffffffffff161480610be45750610be381610bde6115a5565b6114f4565b5b610c39576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260388152602001806129ec6038913960400191505060405180910390fd5b610c4383836115ad565b505050565b6000610c546002611666565b905090565b610c6a610c646115a5565b8261167b565b610cbf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526031815260200180612b6a6031913960400191505060405180910390fd5b610cca83838361176f565b505050565b6000610d2282600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206119b290919063ffffffff16565b905092915050565b610d45838383604051806020016040528060008152506111ab565b505050565b600080610d618360026119cc90919063ffffffff16565b50905080915050919050565b6000610d79600a6119f8565b6000610d85600a611a0e565b9050610d918482611a1c565b610d9b8184611c10565b8091505092915050565b6000610dd582604051806060016040528060298152602001612a4e602991396002611c9a9092919063ffffffff16565b9050919050565b606060098054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e745780601f10610e4957610100808354040283529160200191610e74565b820191906000526020600020905b815481529060010190602001808311610e5757829003601f168201915b5050505050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f05576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180612a24602a913960400191505060405180910390fd5b610f4c600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611cb9565b9050919050565b606060078054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610feb5780601f10610fc057610100808354040283529160200191610feb565b820191906000526020600020905b815481529060010190602001808311610fce57829003601f168201915b5050505050905090565b610ffd6115a5565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561109e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4552433732313a20617070726f766520746f2063616c6c65720000000000000081525060200191505060405180910390fd5b80600560006110ab6115a5565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff166111586115a5565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b6111bc6111b66115a5565b8361167b565b611211576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526031815260200180612b6a6031913960400191505060405180910390fd5b61121d84848484611cce565b50505050565b606061122e82611588565b611283576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f815260200180612b1a602f913960400191505060405180910390fd5b6060600860008481526020019081526020016000208054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561132c5780601f106113015761010080835404028352916020019161132c565b820191906000526020600020905b81548152906001019060200180831161130f57829003601f168201915b50505050509050606061133d610ddc565b90506000815114156113535781925050506114ef565b6000825111156114245780826040516020018083805190602001908083835b602083106113955780518252602082019150602081019050602083039250611372565b6001836020036101000a03801982511681845116808217855250505050505090500182805190602001908083835b602083106113e657805182526020820191506020810190506020830392506113c3565b6001836020036101000a03801982511681845116808217855250505050505090500192505050604051602081830303815290604052925050506114ef565b8061142e85611d40565b6040516020018083805190602001908083835b602083106114645780518252602082019150602081019050602083039250611441565b6001836020036101000a03801982511681845116808217855250505050505090500182805190602001908083835b602083106114b55780518252602082019150602081019050602083039250611492565b6001836020036101000a03801982511681845116808217855250505050505090500192505050604051602081830303815290604052925050505b919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600061159e826002611e8790919063ffffffff16565b9050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff1661162083610da5565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600061167482600001611ea1565b9050919050565b600061168682611588565b6116db576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c8152602001806129c0602c913960400191505060405180910390fd5b60006116e683610da5565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061175557508373ffffffffffffffffffffffffffffffffffffffff1661173d84610a69565b73ffffffffffffffffffffffffffffffffffffffff16145b80611766575061176581856114f4565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661178f82610da5565b73ffffffffffffffffffffffffffffffffffffffff16146117fb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180612af16029913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611881576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806129766024913960400191505060405180910390fd5b61188c838383611eb2565b6118976000826115ad565b6118e881600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611eb790919063ffffffff16565b5061193a81600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611ed190919063ffffffff16565b5061195181836002611eeb9092919063ffffffff16565b50808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b60006119c18360000183611f20565b60001c905092915050565b6000806000806119df8660000186611fa3565b915091508160001c8160001c9350935050509250929050565b6001816000016000828254019250508190555050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611abf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4552433732313a206d696e7420746f20746865207a65726f206164647265737381525060200191505060405180910390fd5b611ac881611588565b15611b3b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000081525060200191505060405180910390fd5b611b4760008383611eb2565b611b9881600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611ed190919063ffffffff16565b50611baf81836002611eeb9092919063ffffffff16565b50808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b611c1982611588565b611c6e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180612ac5602c913960400191505060405180910390fd5b80600860008481526020019081526020016000209080519060200190611c95929190612876565b505050565b6000611cad846000018460001b8461203c565b60001c90509392505050565b6000611cc782600001612132565b9050919050565b611cd984848461176f565b611ce584848484612143565b611d3a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260328152602001806129446032913960400191505060405180910390fd5b50505050565b60606000821415611d88576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611e82565b600082905060005b60008214611db2578080600101915050600a8281611daa57fe5b049150611d90565b60608167ffffffffffffffff81118015611dcb57600080fd5b506040519080825280601f01601f191660200182016040528015611dfe5781602001600182028036833780820191505090505b50905060006001830390508593505b60008414611e7a57600a8481611e1f57fe5b0660300160f81b82828060019003935081518110611e3957fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a8481611e7257fe5b049350611e0d565b819450505050505b919050565b6000611e99836000018360001b61235c565b905092915050565b600081600001805490509050919050565b505050565b6000611ec9836000018360001b61237f565b905092915050565b6000611ee3836000018360001b612467565b905092915050565b6000611f17846000018460001b8473ffffffffffffffffffffffffffffffffffffffff1660001b6124d7565b90509392505050565b600081836000018054905011611f81576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806129226022913960400191505060405180910390fd5b826000018281548110611f9057fe5b9060005260206000200154905092915050565b60008082846000018054905011612005576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180612a776022913960400191505060405180910390fd5b600084600001848154811061201657fe5b906000526020600020906002020190508060000154816001015492509250509250929050565b60008084600101600085815260200190815260200160002054905060008114158390612103576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156120c85780820151818401526020810190506120ad565b50505050905090810190601f1680156120f55780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5084600001600182038154811061211657fe5b9060005260206000209060020201600101549150509392505050565b600081600001805490509050919050565b60006121648473ffffffffffffffffffffffffffffffffffffffff166125b3565b6121715760019050612354565b60606122db63150b7a0260e01b6121866115a5565b888787604051602401808573ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561220a5780820151818401526020810190506121ef565b50505050905090810190601f1680156122375780820380516001836020036101000a031916815260200191505b5095505050505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051806060016040528060328152602001612944603291398773ffffffffffffffffffffffffffffffffffffffff166125c69092919063ffffffff16565b905060008180602001905160208110156122f457600080fd5b8101908080519060200190929190505050905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614925050505b949350505050565b600080836001016000848152602001908152602001600020541415905092915050565b6000808360010160008481526020019081526020016000205490506000811461245b57600060018203905060006001866000018054905003905060008660000182815481106123ca57fe5b90600052602060002001549050808760000184815481106123e757fe5b906000526020600020018190555060018301876001016000838152602001908152602001600020819055508660000180548061241f57fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050612461565b60009150505b92915050565b600061247383836125de565b6124cc5782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190506124d1565b600090505b92915050565b600080846001016000858152602001908152602001600020549050600081141561257e578460000160405180604001604052808681526020018581525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010155505084600001805490508560010160008681526020019081526020016000208190555060019150506125ac565b8285600001600183038154811061259157fe5b90600052602060002090600202016001018190555060009150505b9392505050565b600080823b905060008111915050919050565b60606125d58484600085612601565b90509392505050565b600080836001016000848152602001908152602001600020541415905092915050565b60608247101561265c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602681526020018061299a6026913960400191505060405180910390fd5b612665856125b3565b6126d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000081525060200191505060405180910390fd5b600060608673ffffffffffffffffffffffffffffffffffffffff1685876040518082805190602001908083835b602083106127275780518252602082019150602081019050602083039250612704565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114612789576040519150601f19603f3d011682016040523d82523d6000602084013e61278e565b606091505b509150915061279e8282866127aa565b92505050949350505050565b606083156127ba5782905061286f565b6000835111156127cd5782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612834578082015181840152602081019050612819565b50505050905090810190601f1680156128615780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826128ac57600085556128f3565b82601f106128c557805160ff19168380011785556128f3565b828001600101855582156128f3579182015b828111156128f25782518255916020019190600101906128d7565b5b5090506129009190612904565b5090565b5b8082111561291d576000816000905550600101612905565b509056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f2061646472657373416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c4552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e456e756d657261626c654d61703a20696e646578206f7574206f6620626f756e64734552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732314d657461646174613a2055524920736574206f66206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314d657461646174613a2055524920717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a26469706673582212208c7f9380f690271cd8449bac1cf0f082bc99d617e0df30e728cea9030a34ba6364736f6c634300070400334f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101375760003560e01c80638da5cb5b116100b8578063beffaf091161007c578063beffaf091461070b578063c6ea00671461076a578063dbac26e914610774578063dd70b55c146107ce578063f2fde38b146107d8578063f5cd36431461081c57610137565b80638da5cb5b146105345780638eb4285a146105685780639bcfb6f9146105c2578063a9d997951461067d578063b9618478146106d757610137565b80636fa0245d116100ff5780636fa0245d14610360578063715018a61461043b578063717d63a414610445578063798c20ea1461049d57806383f3138b1461051657610137565b806321668dd41461013c578063238a6acb146101f75780633ccfbde31461024f5780635df6849d146102c857806364cc629b1461032c575b600080fd5b6101f56004803603602081101561015257600080fd5b810190808035906020019064010000000081111561016f57600080fd5b82018360208201111561018157600080fd5b803590602001918460018302840111640100000000831117156101a357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610895565b005b6102396004803603602081101561020d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c9a565b6040518082815260200191505060405180910390f35b6102c66004803603602081101561026557600080fd5b810190808035906020019064010000000081111561028257600080fd5b82018360208201111561029457600080fd5b803590602001918460208302840111640100000000831117156102b657600080fd5b9091929391929390505050610cb2565b005b61032a600480360360408110156102de57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e07565b005b610334611019565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104396004803603604081101561037657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156103b357600080fd5b8201836020820111156103c557600080fd5b803590602001918460018302840111640100000000831117156103e757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611043565b005b6104436112e9565b005b6104716004803603602081101561045b57600080fd5b8101908080359060200190929190505050611456565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610514600480360360208110156104b357600080fd5b81019080803590602001906401000000008111156104d057600080fd5b8201836020820111156104e257600080fd5b8035906020019184602083028401116401000000008311171561050457600080fd5b9091929391929390505050611495565b005b61051e6116fb565b6040518082815260200191505060405180910390f35b61053c611701565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105aa6004803603602081101561057e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061172a565b60405180821515815260200191505060405180910390f35b61067b600480360360208110156105d857600080fd5b81019080803590602001906401000000008111156105f557600080fd5b82018360208201111561060757600080fd5b8035906020019184600183028401116401000000008311171561062957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061174a565b005b6106bf6004803603602081101561069357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611a7d565b60405180821515815260200191505060405180910390f35b6106df611a9d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610713611b76565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561075657808201518184015260208101905061073b565b505050509050019250505060405180910390f35b610772611c04565b005b6107b66004803603602081101561078a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611cb5565b60405180821515815260200191505060405180910390f35b6107d6611cd5565b005b61081a600480360360208110156107ee57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611f2f565b005b6108936004803603602081101561083257600080fd5b810190808035906020019064010000000081111561084f57600080fd5b82018360208201111561086157600080fd5b8035906020019184602083028401116401000000008311171561088357600080fd5b9091929391929390505050612121565b005b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156109385750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b6109aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f4e6f7420612076616c696420547275737465650000000000000000000000000081525060200191505060405180910390fd5b33600760026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060005b6006805490508160ff161015610c96576001600060068360ff1681548110610a1257fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff168015610b1557506002600060068360ff1681548110610aa057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b15610c8957600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663542792b660068360ff1681548110610b6857fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610bff578082015181840152602081019050610be4565b50505050905090810190601f168015610c2c5780820380516001836020036101000a031916815260200191505b509350505050602060405180830381600087803b158015610c4c57600080fd5b505af1158015610c60573d6000803e3d6000fd5b505050506040513d6020811015610c7657600080fd5b8101908080519060200190929190505050505b80806001019150506109ee565b5050565b60046020528060005260406000206000915090505481565b610cba612276565b73ffffffffffffffffffffffffffffffffffffffff16610cd8611701565b73ffffffffffffffffffffffffffffffffffffffff1614610d61576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b60005b828290508160ff161015610e025760006002600085858560ff16818110610d8757fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508080600101915050610d64565b505050565b610e0f612276565b73ffffffffffffffffffffffffffffffffffffffff16610e2d611701565b73ffffffffffffffffffffffffffffffffffffffff1614610eb6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663317c51b1833073ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610f3b57600080fd5b505afa158015610f4f573d6000803e3d6000fd5b505050506040513d6020811015610f6557600080fd5b8101908080519060200190929190505050306040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019350505050600060405180830381600087803b158015610ffd57600080fd5b505af1158015611011573d6000803e3d6000fd5b505050505050565b6000600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61104b612276565b73ffffffffffffffffffffffffffffffffffffffff16611069611701565b73ffffffffffffffffffffffffffffffffffffffff16146110f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166111b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f4e6f7420612076616c696420547275737465650000000000000000000000000081525060200191505060405180910390fd5b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663542792b683836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561125c578082015181840152602081019050611241565b50505050905090810190601f1680156112895780820380516001836020036101000a031916815260200191505b509350505050602060405180830381600087803b1580156112a957600080fd5b505af11580156112bd573d6000803e3d6000fd5b505050506040513d60208110156112d357600080fd5b8101908080519060200190929190505050505050565b6112f1612276565b73ffffffffffffffffffffffffffffffffffffffff1661130f611701565b73ffffffffffffffffffffffffffffffffffffffff1614611398576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6006818154811061146657600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61149d612276565b73ffffffffffffffffffffffffffffffffffffffff166114bb611701565b73ffffffffffffffffffffffffffffffffffffffff1614611544576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b60005b828290508160ff1610156116f657600115156001600085858560ff1681811061156c57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515146116e957600180600085858560ff168181106115ec57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600683838360ff1681811061166b57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff169080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b8080600101915050611547565b505050565b60055481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60016020528060005260406000206000915054906101000a900460ff1681565b600073ffffffffffffffffffffffffffffffffffffffff16600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561180f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f5265636f76657279206e6f742079657420696e697469616c697365640000000081525060200191505060405180910390fd5b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156118b25750600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b611924576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f4e6f7420612076616c696420547275737465650000000000000000000000000081525060200191505060405180910390fd5b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663542792b6600760029054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156119f15780820151818401526020810190506119d6565b50505050905090810190601f168015611a1e5780820380516001836020036101000a031916815260200191505b509350505050602060405180830381600087803b158015611a3e57600080fd5b505af1158015611a52573d6000803e3d6000fd5b505050506040513d6020811015611a6857600080fd5b81019080805190602001909291905050505050565b60036020528060005260406000206000915054906101000a900460ff1681565b6000611aa7612276565b73ffffffffffffffffffffffffffffffffffffffff16611ac5611701565b73ffffffffffffffffffffffffffffffffffffffff1614611b4e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606006805480602002602001604051908101604052809291908181526020018280548015611bfa57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611bb0575b5050505050905090565b611c0c612276565b73ffffffffffffffffffffffffffffffffffffffff16611c2a611701565b73ffffffffffffffffffffffffffffffffffffffff1614611cb3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b565b60026020528060005260406000206000915054906101000a900460ff1681565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611d94576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f53656e646572206973206e6f742061207472757374656500000000000000000081525060200191505060405180910390fd5b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555043600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff167f19a67108cdc6ba4d7a3b8dbbb34ff36b3def77fcf222e93968c6e60e41565a313073ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015611eae57600080fd5b505afa158015611ec2573d6000803e3d6000fd5b505050506040513d6020811015611ed857600080fd5b810190808051906020019092919050505060055443604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a243600581905550565b611f37612276565b73ffffffffffffffffffffffffffffffffffffffff16611f55611701565b73ffffffffffffffffffffffffffffffffffffffff1614611fde576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415612064576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602681526020018061227f6026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b612129612276565b73ffffffffffffffffffffffffffffffffffffffff16612147611701565b73ffffffffffffffffffffffffffffffffffffffff16146121d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b60005b828290508160ff1610156122715760016002600085858560ff168181106121f657fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555080806001019150506121d3565b505050565b60003390509056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a2646970667358221220246f358f8adbc497ea298910f5bb7ec873342cf322ab168132028517ce9c013664736f6c63430007040033",
  "immutableReferences": {},
  "generatedSources": [],
  "deployedGeneratedSources": [],
  "sourceMap": "209:6309:3:-:0;;;1013:1;987:27;;;;;;;;;;;;;;;;;;;;1625:303;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;884:17:5;904:12;:10;;;:12;;:::i;:::-;884:32;;935:9;926:6;;:18;;;;;;;;;;;;;;;;;;992:9;959:43;;988:1;959:43;;;;;;;;;;;;850:159;1780:15:3;1749:14;;:47;;;;;;;;;;;;;;;;;;1821:14;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;1807:11;;:28;;;;;;;;;;;;;;;;;;1846:25;1864:6;1846:17;;;:25;;:::i;:::-;1902:18;1882:17;;:38;;;;;;;;;;;;;;;;;;1625:303;;;209:6309;;598:104:15;651:15;685:10;678:17;;598:104;:::o;2011:240:5:-;1308:12;:10;;;:12;;:::i;:::-;1297:23;;:7;:5;;;:7;;:::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2119:1:::1;2099:22;;:8;:22;;;;2091:73;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2208:8;2179:38;;2200:6;::::0;::::1;;;;;;;;2179:38;;;;;;;;;;;;2236:8;2227:6;::::0;:17:::1;;;;;;;;;;;;;;;;;;2011:240:::0;:::o;1085:85::-;1131:7;1157:6;;;;;;;;;;;1150:13;;1085:85;:::o;209:6309:3:-;;;;;;;;:::o;:::-;;;;;;;",
  "deployedSourceMap": "209:6309:3:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4667:972;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;676:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;3431:243;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;6255:260;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;2161:125;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;4117:329;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;1717:145:5;;;:::i;:::-;;955:25:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;2700:420;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;832:28;;;:::i;:::-;;;;;;;;;;;;;;;;;;;1085:85:5;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;413:44:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;5647:492;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;514:41;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1936:111;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;2055:98;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6196:51;;;:::i;:::-;;464:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;3716:393;;;:::i;:::-;;2011:240:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;3128:295:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;4667:972;4764:12;:24;4777:10;4764:24;;;;;;;;;;;;;;;;;;;;;;;;;:52;;;;;4793:11;:23;4805:10;4793:23;;;;;;;;;;;;;;;;;;;;;;;;;4792:24;4764:52;4742:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4901:10;4874:24;;:37;;;;;;;;;;;;;;;;;;5253:7;5248:384;5270:8;:15;;;;5266:1;:19;;;5248:384;;;5395:12;:25;5408:8;5417:1;5408:11;;;;;;;;;;;;;;;;;;;;;;;;;;;5395:25;;;;;;;;;;;;;;;;;;;;;;;;;:54;;;;;5425:11;:24;5437:8;5446:1;5437:11;;;;;;;;;;;;;;;;;;;;;;;;;;;5425:24;;;;;;;;;;;;;;;;;;;;;;;;;5424:25;5395:54;5391:230;;;5552:11;;;;;;;;;;;:27;;;5580:8;5589:1;5580:11;;;;;;;;;;;;;;;;;;;;;;;;;;;5593;5552:53;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5391:230;5287:3;;;;;;;5248:384;;;;4667:972;:::o;676:51::-;;;;;;;;;;;;;;;;;:::o;3431:243::-;1308:12:5;:10;:12::i;:::-;1297:23;;:7;:5;:7::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3561:7:3::1;3556:111;3578:12;;:19;;3574:1;:23;;;3556:111;;;3650:5;3619:11;:28;3631:12;;3644:1;3631:15;;;;;;;;;;;;;;;;;3619:28;;;;;;;;;;;;;;;;:36;;;;;;;;;;;;;;;;;;3599:3;;;;;;;3556:111;;;;3431:243:::0;;:::o;6255:260::-;1308:12:5;:10;:12::i;:::-;1297:23;;:7;:5;:7::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6383:14:3::1;;;;;;;;;;;:34;;;6432:9;6456:4;:10;;;:12;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;;;;;;6491:4;6383:124;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;::::0;::::1;;;;;;;;;6255:260:::0;;:::o;2161:125::-;2218:7;2253:24;;;;;;;;;;;2238:40;;2161:125;:::o;4117:329::-;1308:12:5;:10;:12::i;:::-;1297:23;;:7;:5;:7::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4327:12:3::1;:25;4340:11;4327:25;;;;;;;;;;;;;;;;;;;;;;;;;4319:57;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;4387:11;;;;;;;;;;;:27;;;4415:11;4428:9;4387:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;;;;;;;4117:329:::0;;:::o;1717:145:5:-;1308:12;:10;:12::i;:::-;1297:23;;:7;:5;:7::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1823:1:::1;1786:40;;1807:6;::::0;::::1;;;;;;;;1786:40;;;;;;;;;;;;1853:1;1836:6:::0;::::1;:19;;;;;;;;;;;;;;;;;;1717:145::o:0;955:25:3:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;2700:420::-;1308:12:5;:10;:12::i;:::-;1297:23;;:7;:5;:7::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2848:7:3::1;2843:270;2865:6;;:13;;2861:1;:17;;;2843:270;;;2988:4;2961:31;;:12;:23;2974:6;;2981:1;2974:9;;;;;;;;;;;;;;;;;2961:23;;;;;;;;;;;;;;;;;;;;;;;;;:31;;;2957:145;;3039:4;3013:12:::0;:23:::1;3026:6;;3033:1;3026:9;;;;;;;;;;;;;;;;;3013:23;;;;;;;;;;;;;;;;:30;;;;;;;;;;;;;;;;;;3062:8;3076:6;;3083:1;3076:9;;;;;;;;;;;;;;;;;3062:24;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2957:145;2880:3;;;;;;;2843:270;;;;2700:420:::0;;:::o;832:28::-;;;;:::o;1085:85:5:-;1131:7;1157:6;;;;;;;;;;;1150:13;;1085:85;:::o;413:44:3:-;;;;;;;;;;;;;;;;;;;;;;:::o;5647:492::-;5790:1;5754:38;;:24;;;;;;;;;;;:38;;;;5732:116;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5881:12;:24;5894:10;5881:24;;;;;;;;;;;;;;;;;;;;;;;;;:52;;;;;5910:11;:23;5922:10;5910:23;;;;;;;;;;;;;;;;;;;;;;;;;5909:24;5881:52;5859:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6065:11;;;;;;;;;;;:27;;;6093:24;;;;;;;;;;;6119:11;6065:66;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5647:492;:::o;514:41::-;;;;;;;;;;;;;;;;;;;;;;:::o;1936:111::-;1992:7;1308:12:5;:10;:12::i;:::-;1297:23;;:7;:5;:7::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2027:11:3::1;;;;;;;;;;;2012:27;;1936:111:::0;:::o;2055:98::-;2101:16;2137:8;2130:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2055:98;:::o;6196:51::-;1308:12:5;:10;:12::i;:::-;1297:23;;:7;:5;:7::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6196:51:3:o;464:43::-;;;;;;;;;;;;;;;;;;;;;;:::o;3716:393::-;3768:12;:24;3781:10;3768:24;;;;;;;;;;;;;;;;;;;;;;;;;3760:60;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3855:4;3831:9;:21;3841:10;3831:21;;;;;;;;;;;;;;;;:28;;;;;;;;;;;;;;;;;;3901:12;3870:16;:28;3887:10;3870:28;;;;;;;;;;;;;;;:43;;;;3959:10;3929:133;;;3984:4;:10;;;:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4011:13;;4039:12;3929:133;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4089:12;4073:13;:28;;;;3716:393::o;2011:240:5:-;1308:12;:10;:12::i;:::-;1297:23;;:7;:5;:7::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2119:1:::1;2099:22;;:8;:22;;;;2091:73;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2208:8;2179:38;;2200:6;::::0;::::1;;;;;;;;2179:38;;;;;;;;;;;;2236:8;2227:6;::::0;:17:::1;;;;;;;;;;;;;;;;;;2011:240:::0;:::o;3128:295:3:-;1308:12:5;:10;:12::i;:::-;1297:23;;:7;:5;:7::i;:::-;:23;;;1289:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3311:7:3::1;3306:110;3328:12;;:19;;3324:1;:23;;;3306:110;;;3400:4;3369:11;:28;3381:12;;3394:1;3381:15;;;;;;;;;;;;;;;;;3369:28;;;;;;;;;;;;;;;;:35;;;;;;;;;;;;;;;;;;3349:3;;;;;;;3306:110;;;;3128:295:::0;;:::o;598:104:15:-;651:15;685:10;678:17;;598:104;:::o",
  "source": "// SPDX-License-Identifier: UNLICENSED\r\npragma solidity ^0.7.4;\r\n\r\nimport \"./IShardManager.sol\";\r\nimport \"./ShardNFT.sol\";\r\nimport \"./IShardNFT.sol\";\r\n\r\nimport \"@openzeppelin/contracts/access/Ownable.sol\";\r\n\r\ncontract Recovery is Ownable {\r\n    enum RecoveryState {Created, Normal, InRecovery, Death}\r\n\r\n    // a user can revoke a particular shard holder from being user by storing by blacklisting them here\r\n    mapping(address => bool) public shardHolders;\r\n    mapping(address => bool) public blacklisted;\r\n    mapping(address => bool) public confirmed; // trustees can send a transaction from their own account to the contract so that they can show up as confirmed\r\n\r\n    mapping(address => uint256) public confirmedBlockNo;\r\n\r\n    // mapping(address => string) publicKeys;\r\n    // mapping(address => bool) pubKeyGathered;\r\n    uint256 public currentChange; //The block number when a public key was verified, so that the transaction can be found\r\n    address[] public trustees;\r\n    uint8 recoveryThreshold = 0;\r\n\r\n    // The current recovery state of the contract\r\n    //TODO: Set recovery state along the chain\r\n    RecoveryState recoveryState;\r\n    // Will be set if a trustee has triggered recovery\r\n    address trusteeTriggeredRecovery;\r\n    IShardManager parentContract;\r\n    ShardNFT nftContract;\r\n\r\n    event TrusteeVerified(\r\n        address indexed account,\r\n        address owner,\r\n        uint256 previousChange,\r\n        uint256 currentBlock\r\n    );\r\n\r\n    event TrusteeAdded(\r\n        address indexed account,\r\n        address owner,\r\n        uint256 previousChange\r\n    );\r\n\r\n    /**\r\n     *\r\n     */\r\n    constructor(\r\n        address _parentContract,\r\n        address _owner,\r\n        uint8 _recoveryThreshold\r\n    ) {\r\n        parentContract = IShardManager(_parentContract);\r\n        nftContract = new ShardNFT();\r\n        transferOwnership(_owner);\r\n        recoveryThreshold = _recoveryThreshold;\r\n    }\r\n\r\n    function getNFTAddress() public view onlyOwner returns (address) {\r\n        return address(nftContract);\r\n    }\r\n\r\n    function getTrustees() external view returns (address[] memory) {\r\n        return trustees;\r\n    }\r\n\r\n    function viewWhoTriggeredRecovery() public view returns (address) {\r\n        return address(trusteeTriggeredRecovery);\r\n    }\r\n\r\n    /*\r\n        Idea that when a user sends a recovery request to this contract it will contact the other shard holders\r\n    */\r\n\r\n    /*\r\n        add Shard holder\r\n        \r\n        The owner of this shard contract can set a shard holder for themselves, this will be a number \r\n        of ethereum addresses that will then be marked and stored.\r\n        Only the owner can perform this operation\r\n    */\r\n    function batchAddShardholder(address[] calldata _toAdd) public onlyOwner {\r\n        // Set the provided addresses to be shard holders\r\n        for (uint8 i = 0; i < _toAdd.length; i++) {\r\n            // check trustee has not been already added\r\n            if (shardHolders[_toAdd[i]] != true) {\r\n                shardHolders[_toAdd[i]] = true;\r\n                trustees.push(_toAdd[i]);\r\n            }\r\n        }\r\n    }\r\n\r\n    function batchBlacklistShardholder(address[] calldata _toBlacklist)\r\n        public\r\n        onlyOwner\r\n    {\r\n        // Set the provided addresses to be shard holders\r\n        for (uint8 i = 0; i < _toBlacklist.length; i++) {\r\n            blacklisted[_toBlacklist[i]] = true;\r\n        }\r\n    }\r\n\r\n    function batchRemoveBlacklistShardholder(address[] calldata _toBlacklist)\r\n        public\r\n        onlyOwner\r\n    {\r\n        for (uint8 i = 0; i < _toBlacklist.length; i++) {\r\n            blacklisted[_toBlacklist[i]] = false;\r\n        }\r\n    }\r\n\r\n    /** Confirm Trustee\r\n     */\r\n    function confirmTrustee() public {\r\n        require(shardHolders[msg.sender], \"Sender is not a trustee\");\r\n        confirmed[msg.sender] = true;\r\n        confirmedBlockNo[msg.sender] = block.number;\r\n        emit TrusteeVerified(\r\n            msg.sender,\r\n            this.owner(),\r\n            currentChange,\r\n            block.number\r\n        );\r\n        currentChange = block.number;\r\n    }\r\n\r\n    function sendShardToShardOwner(address _shardOwner, string memory _shardURI)\r\n        public\r\n        onlyOwner\r\n    {\r\n        // check that the shard holder it is being sent to is registered\r\n        require(shardHolders[_shardOwner], \"Not a valid Trustee\");\r\n        nftContract.distributeShard(_shardOwner, _shardURI);\r\n    }\r\n\r\n    /**\r\n     * Trigger Recovery Event\r\n     *\r\n     * Triggering the recovery event will send a recovery NFT to the addresses of the token holders\r\n     * Any of the shard owners can trigger this event\r\n     */\r\n    function triggerRecoveryEvent(string memory _payloadURI) public {\r\n        require(\r\n            shardHolders[msg.sender] && !blacklisted[msg.sender],\r\n            \"Not a valid Trustee\"\r\n        );\r\n        trusteeTriggeredRecovery = msg.sender;\r\n        // mark the parent contract's state to have been updated\r\n        //TODO: un-comment this line\r\n        // parentContract.updateRecoveryState(\r\n        //     _owner,\r\n        //     address(msg.sender),\r\n        //     uint256(3)\r\n        // );\r\n        // send recovery token to each of the validated shard holders\r\n        for (uint8 j = 0; j < trustees.length; j++) {\r\n            // only send the token if the trustee address has not been blacklisted\r\n            if (shardHolders[trustees[j]] && !blacklisted[trustees[j]]) {\r\n                // Send the shard with the given payload to the list of trustees\r\n                nftContract.distributeShard(trustees[j], _payloadURI);\r\n            }\r\n        }\r\n    }\r\n\r\n    function sendShardToRecoveryInitialiser(string memory _payloadURI) public {\r\n        require(\r\n            trusteeTriggeredRecovery != address(0),\r\n            \"Recovery not yet initialised\"\r\n        );\r\n        require(\r\n            shardHolders[msg.sender] && !blacklisted[msg.sender],\r\n            \"Not a valid Trustee\"\r\n        );\r\n        // send the encoded payload to the user who initialised recovery\r\n        nftContract.distributeShard(trusteeTriggeredRecovery, _payloadURI);\r\n    }\r\n\r\n    /**\r\n     * Destroy Shard contract\r\n     */\r\n    function destroyShardContract() public onlyOwner {}\r\n\r\n    function transferRecoveryOwnership(address _newOwner, address _currentOwner)\r\n        public\r\n        onlyOwner\r\n    {\r\n        parentContract.setNewContractOwner(\r\n            _newOwner,\r\n            this.owner(),\r\n            address(this)\r\n        );\r\n    }\r\n}\r\n",
  "sourcePath": "C:/Users/schee/Documents/Projects/fresh_fyp/contracts/Recovery.sol",
  "ast": {
    "absolutePath": "/C/Users/schee/Documents/Projects/fresh_fyp/contracts/Recovery.sol",
    "exportedSymbols": {
      "Address": [
        2523
      ],
      "Context": [
        2546
      ],
      "Counters": [
        2596
      ],
      "ERC165": [
        724
      ],
      "ERC721": [
        2035
      ],
      "EnumerableMap": [
        3156
      ],
      "EnumerableSet": [
        3648
      ],
      "IERC165": [
        736
      ],
      "IERC721": [
        2151
      ],
      "IERC721Enumerable": [
        2182
      ],
      "IERC721Metadata": [
        2209
      ],
      "IERC721Receiver": [
        2227
      ],
      "IShardManager": [
        52
      ],
      "IShardNFT": [
        65
      ],
      "Ownable": [
        667
      ],
      "Recovery": [
        496
      ],
      "SafeMath": [
        1091
      ],
      "ShardNFT": [
        557
      ],
      "Strings": [
        3735
      ]
    },
    "id": 497,
    "license": "UNLICENSED",
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 67,
        "literals": [
          "solidity",
          "^",
          "0.7",
          ".4"
        ],
        "nodeType": "PragmaDirective",
        "src": "40:23:3"
      },
      {
        "absolutePath": "/C/Users/schee/Documents/Projects/fresh_fyp/contracts/IShardManager.sol",
        "file": "./IShardManager.sol",
        "id": 68,
        "nodeType": "ImportDirective",
        "scope": 497,
        "sourceUnit": 53,
        "src": "67:29:3",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/C/Users/schee/Documents/Projects/fresh_fyp/contracts/ShardNFT.sol",
        "file": "./ShardNFT.sol",
        "id": 69,
        "nodeType": "ImportDirective",
        "scope": 497,
        "sourceUnit": 558,
        "src": "98:24:3",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/C/Users/schee/Documents/Projects/fresh_fyp/contracts/IShardNFT.sol",
        "file": "./IShardNFT.sol",
        "id": 70,
        "nodeType": "ImportDirective",
        "scope": 497,
        "sourceUnit": 66,
        "src": "124:25:3",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "@openzeppelin/contracts/access/Ownable.sol",
        "file": "@openzeppelin/contracts/access/Ownable.sol",
        "id": 71,
        "nodeType": "ImportDirective",
        "scope": 497,
        "sourceUnit": 668,
        "src": "153:52:3",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "abstract": false,
        "baseContracts": [
          {
            "baseName": {
              "id": 72,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 667,
              "src": "230:7:3",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$667",
                "typeString": "contract Ownable"
              }
            },
            "id": 73,
            "nodeType": "InheritanceSpecifier",
            "src": "230:7:3"
          }
        ],
        "contractDependencies": [
          557,
          667,
          2546
        ],
        "contractKind": "contract",
        "fullyImplemented": true,
        "id": 496,
        "linearizedBaseContracts": [
          496,
          667,
          2546
        ],
        "name": "Recovery",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "Recovery.RecoveryState",
            "id": 78,
            "members": [
              {
                "id": 74,
                "name": "Created",
                "nodeType": "EnumValue",
                "src": "265:7:3"
              },
              {
                "id": 75,
                "name": "Normal",
                "nodeType": "EnumValue",
                "src": "274:6:3"
              },
              {
                "id": 76,
                "name": "InRecovery",
                "nodeType": "EnumValue",
                "src": "282:10:3"
              },
              {
                "id": 77,
                "name": "Death",
                "nodeType": "EnumValue",
                "src": "294:5:3"
              }
            ],
            "name": "RecoveryState",
            "nodeType": "EnumDefinition",
            "src": "245:55:3"
          },
          {
            "constant": false,
            "functionSelector": "8eb4285a",
            "id": 82,
            "mutability": "mutable",
            "name": "shardHolders",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "413:44:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 81,
              "keyType": {
                "id": 79,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "421:7:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "413:24:3",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 80,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "432:4:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_bool",
                  "typeString": "bool"
                }
              }
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "functionSelector": "dbac26e9",
            "id": 86,
            "mutability": "mutable",
            "name": "blacklisted",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "464:43:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 85,
              "keyType": {
                "id": 83,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "472:7:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "464:24:3",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 84,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "483:4:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_bool",
                  "typeString": "bool"
                }
              }
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "functionSelector": "a9d99795",
            "id": 90,
            "mutability": "mutable",
            "name": "confirmed",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "514:41:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 89,
              "keyType": {
                "id": 87,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "522:7:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "514:24:3",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 88,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "533:4:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_bool",
                  "typeString": "bool"
                }
              }
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "functionSelector": "238a6acb",
            "id": 94,
            "mutability": "mutable",
            "name": "confirmedBlockNo",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "676:51:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
              "typeString": "mapping(address => uint256)"
            },
            "typeName": {
              "id": 93,
              "keyType": {
                "id": 91,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "684:7:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "676:27:3",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                "typeString": "mapping(address => uint256)"
              },
              "valueType": {
                "id": 92,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "695:7:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              }
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "functionSelector": "83f3138b",
            "id": 96,
            "mutability": "mutable",
            "name": "currentChange",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "832:28:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 95,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "832:7:3",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "functionSelector": "717d63a4",
            "id": 99,
            "mutability": "mutable",
            "name": "trustees",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "955:25:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 97,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "955:7:3",
                "stateMutability": "nonpayable",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 98,
              "nodeType": "ArrayTypeName",
              "src": "955:9:3",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 102,
            "mutability": "mutable",
            "name": "recoveryThreshold",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "987:27:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 100,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "987:5:3",
              "typeDescriptions": {
                "typeIdentifier": "t_uint8",
                "typeString": "uint8"
              }
            },
            "value": {
              "hexValue": "30",
              "id": 101,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1013:1:3",
              "typeDescriptions": {
                "typeIdentifier": "t_rational_0_by_1",
                "typeString": "int_const 0"
              },
              "value": "0"
            },
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 104,
            "mutability": "mutable",
            "name": "recoveryState",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "1122:27:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_enum$_RecoveryState_$78",
              "typeString": "enum Recovery.RecoveryState"
            },
            "typeName": {
              "id": 103,
              "name": "RecoveryState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 78,
              "src": "1122:13:3",
              "typeDescriptions": {
                "typeIdentifier": "t_enum$_RecoveryState_$78",
                "typeString": "enum Recovery.RecoveryState"
              }
            },
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 106,
            "mutability": "mutable",
            "name": "trusteeTriggeredRecovery",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "1212:32:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 105,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1212:7:3",
              "stateMutability": "nonpayable",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 108,
            "mutability": "mutable",
            "name": "parentContract",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "1251:28:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_IShardManager_$52",
              "typeString": "contract IShardManager"
            },
            "typeName": {
              "id": 107,
              "name": "IShardManager",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 52,
              "src": "1251:13:3",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IShardManager_$52",
                "typeString": "contract IShardManager"
              }
            },
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 110,
            "mutability": "mutable",
            "name": "nftContract",
            "nodeType": "VariableDeclaration",
            "scope": 496,
            "src": "1286:20:3",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_ShardNFT_$557",
              "typeString": "contract ShardNFT"
            },
            "typeName": {
              "id": 109,
              "name": "ShardNFT",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 557,
              "src": "1286:8:3",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ShardNFT_$557",
                "typeString": "contract ShardNFT"
              }
            },
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "id": 120,
            "name": "TrusteeVerified",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 119,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 112,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "account",
                  "nodeType": "VariableDeclaration",
                  "scope": 120,
                  "src": "1347:23:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 111,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1347:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 114,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 120,
                  "src": "1381:13:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 113,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 116,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "previousChange",
                  "nodeType": "VariableDeclaration",
                  "scope": 120,
                  "src": "1405:22:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 115,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1405:7:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 118,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "currentBlock",
                  "nodeType": "VariableDeclaration",
                  "scope": 120,
                  "src": "1438:20:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 117,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1438:7:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1336:129:3"
            },
            "src": "1315:151:3"
          },
          {
            "anonymous": false,
            "id": 128,
            "name": "TrusteeAdded",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 127,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 122,
                  "indexed": true,
                  "mutability": "mutable",
                  "name": "account",
                  "nodeType": "VariableDeclaration",
                  "scope": 128,
                  "src": "1503:23:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 121,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1503:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 124,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 128,
                  "src": "1537:13:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 123,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1537:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 126,
                  "indexed": false,
                  "mutability": "mutable",
                  "name": "previousChange",
                  "nodeType": "VariableDeclaration",
                  "scope": 128,
                  "src": "1561:22:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 125,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1561:7:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1492:98:3"
            },
            "src": "1474:117:3"
          },
          {
            "body": {
              "id": 157,
              "nodeType": "Block",
              "src": "1738:190:3",
              "statements": [
                {
                  "expression": {
                    "id": 141,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "id": 137,
                      "name": "parentContract",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 108,
                      "src": "1749:14:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IShardManager_$52",
                        "typeString": "contract IShardManager"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "arguments": [
                        {
                          "id": 139,
                          "name": "_parentContract",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 130,
                          "src": "1780:15:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "id": 138,
                        "name": "IShardManager",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 52,
                        "src": "1766:13:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_IShardManager_$52_$",
                          "typeString": "type(contract IShardManager)"
                        }
                      },
                      "id": 140,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1766:30:3",
                      "tryCall": false,
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IShardManager_$52",
                        "typeString": "contract IShardManager"
                      }
                    },
                    "src": "1749:47:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IShardManager_$52",
                      "typeString": "contract IShardManager"
                    }
                  },
                  "id": 142,
                  "nodeType": "ExpressionStatement",
                  "src": "1749:47:3"
                },
                {
                  "expression": {
                    "id": 147,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "id": 143,
                      "name": "nftContract",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 110,
                      "src": "1807:11:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ShardNFT_$557",
                        "typeString": "contract ShardNFT"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "arguments": [],
                      "expression": {
                        "argumentTypes": [],
                        "id": 145,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "1821:12:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_creation_nonpayable$__$returns$_t_contract$_ShardNFT_$557_$",
                          "typeString": "function () returns (contract ShardNFT)"
                        },
                        "typeName": {
                          "id": 144,
                          "name": "ShardNFT",
                          "nodeType": "UserDefinedTypeName",
                          "referencedDeclaration": 557,
                          "src": "1825:8:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_contract$_ShardNFT_$557",
                            "typeString": "contract ShardNFT"
                          }
                        }
                      },
                      "id": 146,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1821:14:3",
                      "tryCall": false,
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ShardNFT_$557",
                        "typeString": "contract ShardNFT"
                      }
                    },
                    "src": "1807:28:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_ShardNFT_$557",
                      "typeString": "contract ShardNFT"
                    }
                  },
                  "id": 148,
                  "nodeType": "ExpressionStatement",
                  "src": "1807:28:3"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "id": 150,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 132,
                        "src": "1864:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 149,
                      "name": "transferOwnership",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 666,
                      "src": "1846:17:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$returns$__$",
                        "typeString": "function (address)"
                      }
                    },
                    "id": 151,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1846:25:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 152,
                  "nodeType": "ExpressionStatement",
                  "src": "1846:25:3"
                },
                {
                  "expression": {
                    "id": 155,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "id": 153,
                      "name": "recoveryThreshold",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 102,
                      "src": "1882:17:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "id": 154,
                      "name": "_recoveryThreshold",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 134,
                      "src": "1902:18:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "src": "1882:38:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "id": 156,
                  "nodeType": "ExpressionStatement",
                  "src": "1882:38:3"
                }
              ]
            },
            "id": 158,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 135,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 130,
                  "mutability": "mutable",
                  "name": "_parentContract",
                  "nodeType": "VariableDeclaration",
                  "scope": 158,
                  "src": "1647:23:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 129,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1647:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 132,
                  "mutability": "mutable",
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 158,
                  "src": "1681:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 131,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1681:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 134,
                  "mutability": "mutable",
                  "name": "_recoveryThreshold",
                  "nodeType": "VariableDeclaration",
                  "scope": 158,
                  "src": "1706:24:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 133,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "1706:5:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1636:101:3"
            },
            "returnParameters": {
              "id": 136,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1738:0:3"
            },
            "scope": 496,
            "src": "1625:303:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 170,
              "nodeType": "Block",
              "src": "2001:46:3",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "id": 167,
                        "name": "nftContract",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 110,
                        "src": "2027:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ShardNFT_$557",
                          "typeString": "contract ShardNFT"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_contract$_ShardNFT_$557",
                          "typeString": "contract ShardNFT"
                        }
                      ],
                      "id": 166,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "2019:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": {
                        "id": 165,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2019:7:3",
                        "typeDescriptions": {}
                      }
                    },
                    "id": 168,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2019:20:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 164,
                  "id": 169,
                  "nodeType": "Return",
                  "src": "2012:27:3"
                }
              ]
            },
            "functionSelector": "b9618478",
            "id": 171,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "id": 161,
                "modifierName": {
                  "id": 160,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 616,
                  "src": "1973:9:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1973:9:3"
              }
            ],
            "name": "getNFTAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 159,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1958:2:3"
            },
            "returnParameters": {
              "id": 164,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 163,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 171,
                  "src": "1992:7:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 162,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1992:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "1991:9:3"
            },
            "scope": 496,
            "src": "1936:111:3",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 179,
              "nodeType": "Block",
              "src": "2119:34:3",
              "statements": [
                {
                  "expression": {
                    "id": 177,
                    "name": "trustees",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 99,
                    "src": "2137:8:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 176,
                  "id": 178,
                  "nodeType": "Return",
                  "src": "2130:15:3"
                }
              ]
            },
            "functionSelector": "beffaf09",
            "id": 180,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "getTrustees",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 172,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2075:2:3"
            },
            "returnParameters": {
              "id": 176,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 175,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 180,
                  "src": "2101:16:3",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 173,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2101:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 174,
                    "nodeType": "ArrayTypeName",
                    "src": "2101:9:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2100:18:3"
            },
            "scope": 496,
            "src": "2055:98:3",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "external"
          },
          {
            "body": {
              "id": 190,
              "nodeType": "Block",
              "src": "2227:59:3",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "id": 187,
                        "name": "trusteeTriggeredRecovery",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 106,
                        "src": "2253:24:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 186,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "2245:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": {
                        "id": 185,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2245:7:3",
                        "typeDescriptions": {}
                      }
                    },
                    "id": 188,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2245:33:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 184,
                  "id": 189,
                  "nodeType": "Return",
                  "src": "2238:40:3"
                }
              ]
            },
            "functionSelector": "64cc629b",
            "id": 191,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "viewWhoTriggeredRecovery",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 181,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2194:2:3"
            },
            "returnParameters": {
              "id": 184,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 183,
                  "mutability": "mutable",
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 191,
                  "src": "2218:7:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 182,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2218:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2217:9:3"
            },
            "scope": 496,
            "src": "2161:125:3",
            "stateMutability": "view",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 237,
              "nodeType": "Block",
              "src": "2773:347:3",
              "statements": [
                {
                  "body": {
                    "id": 235,
                    "nodeType": "Block",
                    "src": "2885:228:3",
                    "statements": [
                      {
                        "condition": {
                          "commonType": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          "id": 216,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "baseExpression": {
                              "id": 210,
                              "name": "shardHolders",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 82,
                              "src": "2961:12:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                                "typeString": "mapping(address => bool)"
                              }
                            },
                            "id": 214,
                            "indexExpression": {
                              "baseExpression": {
                                "id": 211,
                                "name": "_toAdd",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 194,
                                "src": "2974:6:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 213,
                              "indexExpression": {
                                "id": 212,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 200,
                                "src": "2981:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint8",
                                  "typeString": "uint8"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "2974:9:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "2961:23:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "!=",
                          "rightExpression": {
                            "hexValue": "74727565",
                            "id": 215,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "bool",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "2988:4:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            },
                            "value": "true"
                          },
                          "src": "2961:31:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "id": 234,
                        "nodeType": "IfStatement",
                        "src": "2957:145:3",
                        "trueBody": {
                          "id": 233,
                          "nodeType": "Block",
                          "src": "2994:108:3",
                          "statements": [
                            {
                              "expression": {
                                "id": 223,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "baseExpression": {
                                    "id": 217,
                                    "name": "shardHolders",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 82,
                                    "src": "3013:12:3",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                                      "typeString": "mapping(address => bool)"
                                    }
                                  },
                                  "id": 221,
                                  "indexExpression": {
                                    "baseExpression": {
                                      "id": 218,
                                      "name": "_toAdd",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 194,
                                      "src": "3026:6:3",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                        "typeString": "address[] calldata"
                                      }
                                    },
                                    "id": 220,
                                    "indexExpression": {
                                      "id": 219,
                                      "name": "i",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 200,
                                      "src": "3033:1:3",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint8",
                                        "typeString": "uint8"
                                      }
                                    },
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "nodeType": "IndexAccess",
                                    "src": "3026:9:3",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  },
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "nodeType": "IndexAccess",
                                  "src": "3013:23:3",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  }
                                },
                                "nodeType": "Assignment",
                                "operator": "=",
                                "rightHandSide": {
                                  "hexValue": "74727565",
                                  "id": 222,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "bool",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3039:4:3",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "value": "true"
                                },
                                "src": "3013:30:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              },
                              "id": 224,
                              "nodeType": "ExpressionStatement",
                              "src": "3013:30:3"
                            },
                            {
                              "expression": {
                                "arguments": [
                                  {
                                    "baseExpression": {
                                      "id": 228,
                                      "name": "_toAdd",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 194,
                                      "src": "3076:6:3",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                        "typeString": "address[] calldata"
                                      }
                                    },
                                    "id": 230,
                                    "indexExpression": {
                                      "id": 229,
                                      "name": "i",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 200,
                                      "src": "3083:1:3",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint8",
                                        "typeString": "uint8"
                                      }
                                    },
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "nodeType": "IndexAccess",
                                    "src": "3076:9:3",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "expression": {
                                    "id": 225,
                                    "name": "trustees",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 99,
                                    "src": "3062:8:3",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 227,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "push",
                                  "nodeType": "MemberAccess",
                                  "src": "3062:13:3",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$__$",
                                    "typeString": "function (address)"
                                  }
                                },
                                "id": 231,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "functionCall",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "3062:24:3",
                                "tryCall": false,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_tuple$__$",
                                  "typeString": "tuple()"
                                }
                              },
                              "id": 232,
                              "nodeType": "ExpressionStatement",
                              "src": "3062:24:3"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "condition": {
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 206,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "id": 203,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 200,
                      "src": "2861:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "expression": {
                        "id": 204,
                        "name": "_toAdd",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 194,
                        "src": "2865:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 205,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "src": "2865:13:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2861:17:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 236,
                  "initializationExpression": {
                    "assignments": [
                      200
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 200,
                        "mutability": "mutable",
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 236,
                        "src": "2848:7:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        },
                        "typeName": {
                          "id": 199,
                          "name": "uint8",
                          "nodeType": "ElementaryTypeName",
                          "src": "2848:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        "visibility": "internal"
                      }
                    ],
                    "id": 202,
                    "initialValue": {
                      "hexValue": "30",
                      "id": 201,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2858:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2848:11:3"
                  },
                  "loopExpression": {
                    "expression": {
                      "id": 208,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2880:3:3",
                      "subExpression": {
                        "id": 207,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 200,
                        "src": "2880:1:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "id": 209,
                    "nodeType": "ExpressionStatement",
                    "src": "2880:3:3"
                  },
                  "nodeType": "ForStatement",
                  "src": "2843:270:3"
                }
              ]
            },
            "functionSelector": "798c20ea",
            "id": 238,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "id": 197,
                "modifierName": {
                  "id": 196,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 616,
                  "src": "2763:9:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2763:9:3"
              }
            ],
            "name": "batchAddShardholder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 195,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 194,
                  "mutability": "mutable",
                  "name": "_toAdd",
                  "nodeType": "VariableDeclaration",
                  "scope": 238,
                  "src": "2729:25:3",
                  "stateVariable": false,
                  "storageLocation": "calldata",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 192,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2729:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 193,
                    "nodeType": "ArrayTypeName",
                    "src": "2729:9:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "2728:27:3"
            },
            "returnParameters": {
              "id": 198,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2773:0:3"
            },
            "scope": 496,
            "src": "2700:420:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 267,
              "nodeType": "Block",
              "src": "3236:187:3",
              "statements": [
                {
                  "body": {
                    "id": 265,
                    "nodeType": "Block",
                    "src": "3354:62:3",
                    "statements": [
                      {
                        "expression": {
                          "id": 263,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "baseExpression": {
                              "id": 257,
                              "name": "blacklisted",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 86,
                              "src": "3369:11:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                                "typeString": "mapping(address => bool)"
                              }
                            },
                            "id": 261,
                            "indexExpression": {
                              "baseExpression": {
                                "id": 258,
                                "name": "_toBlacklist",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 241,
                                "src": "3381:12:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 260,
                              "indexExpression": {
                                "id": 259,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 247,
                                "src": "3394:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint8",
                                  "typeString": "uint8"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3381:15:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "nodeType": "IndexAccess",
                            "src": "3369:28:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "hexValue": "74727565",
                            "id": 262,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "bool",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3400:4:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            },
                            "value": "true"
                          },
                          "src": "3369:35:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "id": 264,
                        "nodeType": "ExpressionStatement",
                        "src": "3369:35:3"
                      }
                    ]
                  },
                  "condition": {
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 253,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "id": 250,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 247,
                      "src": "3324:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "expression": {
                        "id": 251,
                        "name": "_toBlacklist",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 241,
                        "src": "3328:12:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 252,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "src": "3328:19:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3324:23:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 266,
                  "initializationExpression": {
                    "assignments": [
                      247
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 247,
                        "mutability": "mutable",
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 266,
                        "src": "3311:7:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        },
                        "typeName": {
                          "id": 246,
                          "name": "uint8",
                          "nodeType": "ElementaryTypeName",
                          "src": "3311:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        "visibility": "internal"
                      }
                    ],
                    "id": 249,
                    "initialValue": {
                      "hexValue": "30",
                      "id": 248,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3321:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3311:11:3"
                  },
                  "loopExpression": {
                    "expression": {
                      "id": 255,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3349:3:3",
                      "subExpression": {
                        "id": 254,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 247,
                        "src": "3349:1:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "id": 256,
                    "nodeType": "ExpressionStatement",
                    "src": "3349:3:3"
                  },
                  "nodeType": "ForStatement",
                  "src": "3306:110:3"
                }
              ]
            },
            "functionSelector": "f5cd3643",
            "id": 268,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "id": 244,
                "modifierName": {
                  "id": 243,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 616,
                  "src": "3221:9:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3221:9:3"
              }
            ],
            "name": "batchBlacklistShardholder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 242,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 241,
                  "mutability": "mutable",
                  "name": "_toBlacklist",
                  "nodeType": "VariableDeclaration",
                  "scope": 268,
                  "src": "3163:31:3",
                  "stateVariable": false,
                  "storageLocation": "calldata",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 239,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3163:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 240,
                    "nodeType": "ArrayTypeName",
                    "src": "3163:9:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "3162:33:3"
            },
            "returnParameters": {
              "id": 245,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3236:0:3"
            },
            "scope": 496,
            "src": "3128:295:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 297,
              "nodeType": "Block",
              "src": "3545:129:3",
              "statements": [
                {
                  "body": {
                    "id": 295,
                    "nodeType": "Block",
                    "src": "3604:63:3",
                    "statements": [
                      {
                        "expression": {
                          "id": 293,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "baseExpression": {
                              "id": 287,
                              "name": "blacklisted",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 86,
                              "src": "3619:11:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                                "typeString": "mapping(address => bool)"
                              }
                            },
                            "id": 291,
                            "indexExpression": {
                              "baseExpression": {
                                "id": 288,
                                "name": "_toBlacklist",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 271,
                                "src": "3631:12:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 290,
                              "indexExpression": {
                                "id": 289,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 277,
                                "src": "3644:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint8",
                                  "typeString": "uint8"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3631:15:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "nodeType": "IndexAccess",
                            "src": "3619:28:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "hexValue": "66616c7365",
                            "id": 292,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "bool",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3650:5:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            },
                            "value": "false"
                          },
                          "src": "3619:36:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "id": 294,
                        "nodeType": "ExpressionStatement",
                        "src": "3619:36:3"
                      }
                    ]
                  },
                  "condition": {
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 283,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "id": 280,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 277,
                      "src": "3574:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "expression": {
                        "id": 281,
                        "name": "_toBlacklist",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 271,
                        "src": "3578:12:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 282,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "src": "3578:19:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3574:23:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 296,
                  "initializationExpression": {
                    "assignments": [
                      277
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 277,
                        "mutability": "mutable",
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 296,
                        "src": "3561:7:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        },
                        "typeName": {
                          "id": 276,
                          "name": "uint8",
                          "nodeType": "ElementaryTypeName",
                          "src": "3561:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        "visibility": "internal"
                      }
                    ],
                    "id": 279,
                    "initialValue": {
                      "hexValue": "30",
                      "id": 278,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3571:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3561:11:3"
                  },
                  "loopExpression": {
                    "expression": {
                      "id": 285,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3599:3:3",
                      "subExpression": {
                        "id": 284,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 277,
                        "src": "3599:1:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "id": 286,
                    "nodeType": "ExpressionStatement",
                    "src": "3599:3:3"
                  },
                  "nodeType": "ForStatement",
                  "src": "3556:111:3"
                }
              ]
            },
            "functionSelector": "3ccfbde3",
            "id": 298,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "id": 274,
                "modifierName": {
                  "id": 273,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 616,
                  "src": "3530:9:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3530:9:3"
              }
            ],
            "name": "batchRemoveBlacklistShardholder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 272,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 271,
                  "mutability": "mutable",
                  "name": "_toBlacklist",
                  "nodeType": "VariableDeclaration",
                  "scope": 298,
                  "src": "3472:31:3",
                  "stateVariable": false,
                  "storageLocation": "calldata",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 269,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3472:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 270,
                    "nodeType": "ArrayTypeName",
                    "src": "3472:9:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "3471:33:3"
            },
            "returnParameters": {
              "id": 275,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3545:0:3"
            },
            "scope": 496,
            "src": "3431:243:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 341,
              "nodeType": "Block",
              "src": "3749:360:3",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "baseExpression": {
                          "id": 303,
                          "name": "shardHolders",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 82,
                          "src": "3768:12:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 306,
                        "indexExpression": {
                          "expression": {
                            "id": 304,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": -15,
                            "src": "3781:3:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 305,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "src": "3781:10:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3768:24:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "hexValue": "53656e646572206973206e6f7420612074727573746565",
                        "id": 307,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "3794:25:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_ebd44491b842d685605eb070b614cc93e97b582d028b5de713fb267b99d491e4",
                          "typeString": "literal_string \"Sender is not a trustee\""
                        },
                        "value": "Sender is not a trustee"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_ebd44491b842d685605eb070b614cc93e97b582d028b5de713fb267b99d491e4",
                          "typeString": "literal_string \"Sender is not a trustee\""
                        }
                      ],
                      "id": 302,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "3760:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 308,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3760:60:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 309,
                  "nodeType": "ExpressionStatement",
                  "src": "3760:60:3"
                },
                {
                  "expression": {
                    "id": 315,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "baseExpression": {
                        "id": 310,
                        "name": "confirmed",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 90,
                        "src": "3831:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 313,
                      "indexExpression": {
                        "expression": {
                          "id": 311,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "3841:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 312,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "src": "3841:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "3831:21:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "hexValue": "74727565",
                      "id": 314,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3855:4:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "3831:28:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 316,
                  "nodeType": "ExpressionStatement",
                  "src": "3831:28:3"
                },
                {
                  "expression": {
                    "id": 323,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "baseExpression": {
                        "id": 317,
                        "name": "confirmedBlockNo",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 94,
                        "src": "3870:16:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 320,
                      "indexExpression": {
                        "expression": {
                          "id": 318,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "3887:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 319,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "src": "3887:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "3870:28:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "expression": {
                        "id": 321,
                        "name": "block",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": -4,
                        "src": "3901:5:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_block",
                          "typeString": "block"
                        }
                      },
                      "id": 322,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "number",
                      "nodeType": "MemberAccess",
                      "src": "3901:12:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3870:43:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 324,
                  "nodeType": "ExpressionStatement",
                  "src": "3870:43:3"
                },
                {
                  "eventCall": {
                    "arguments": [
                      {
                        "expression": {
                          "id": 326,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -15,
                          "src": "3959:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 327,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "src": "3959:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "expression": {
                            "id": 328,
                            "name": "this",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": -28,
                            "src": "3984:4:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Recovery_$496",
                              "typeString": "contract Recovery"
                            }
                          },
                          "id": 329,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "owner",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 602,
                          "src": "3984:10:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_external_view$__$returns$_t_address_$",
                            "typeString": "function () view external returns (address)"
                          }
                        },
                        "id": 330,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3984:12:3",
                        "tryCall": false,
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "id": 331,
                        "name": "currentChange",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 96,
                        "src": "4011:13:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "expression": {
                          "id": 332,
                          "name": "block",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": -4,
                          "src": "4039:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_block",
                            "typeString": "block"
                          }
                        },
                        "id": 333,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "number",
                        "nodeType": "MemberAccess",
                        "src": "4039:12:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 325,
                      "name": "TrusteeVerified",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 120,
                      "src": "3929:15:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256,uint256)"
                      }
                    },
                    "id": 334,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3929:133:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 335,
                  "nodeType": "EmitStatement",
                  "src": "3924:138:3"
                },
                {
                  "expression": {
                    "id": 339,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "id": 336,
                      "name": "currentChange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 96,
                      "src": "4073:13:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "expression": {
                        "id": 337,
                        "name": "block",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": -4,
                        "src": "4089:5:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_block",
                          "typeString": "block"
                        }
                      },
                      "id": 338,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "number",
                      "nodeType": "MemberAccess",
                      "src": "4089:12:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4073:28:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 340,
                  "nodeType": "ExpressionStatement",
                  "src": "4073:28:3"
                }
              ]
            },
            "documentation": {
              "id": 299,
              "nodeType": "StructuredDocumentation",
              "src": "3682:28:3",
              "text": "Confirm Trustee"
            },
            "functionSelector": "dd70b55c",
            "id": 342,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "confirmTrustee",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 300,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3739:2:3"
            },
            "returnParameters": {
              "id": 301,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3749:0:3"
            },
            "scope": 496,
            "src": "3716:393:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 365,
              "nodeType": "Block",
              "src": "4234:212:3",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "baseExpression": {
                          "id": 352,
                          "name": "shardHolders",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 82,
                          "src": "4327:12:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 354,
                        "indexExpression": {
                          "id": 353,
                          "name": "_shardOwner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 344,
                          "src": "4340:11:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4327:25:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "hexValue": "4e6f7420612076616c69642054727573746565",
                        "id": 355,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4354:21:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_101aeacf41d51be67b6c17151e06445f89226bbd438de22570fc91c9a87ae411",
                          "typeString": "literal_string \"Not a valid Trustee\""
                        },
                        "value": "Not a valid Trustee"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_101aeacf41d51be67b6c17151e06445f89226bbd438de22570fc91c9a87ae411",
                          "typeString": "literal_string \"Not a valid Trustee\""
                        }
                      ],
                      "id": 351,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "4319:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 356,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4319:57:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 357,
                  "nodeType": "ExpressionStatement",
                  "src": "4319:57:3"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "id": 361,
                        "name": "_shardOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 344,
                        "src": "4415:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "id": 362,
                        "name": "_shardURI",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 346,
                        "src": "4428:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      ],
                      "expression": {
                        "id": 358,
                        "name": "nftContract",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 110,
                        "src": "4387:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ShardNFT_$557",
                          "typeString": "contract ShardNFT"
                        }
                      },
                      "id": 360,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "distributeShard",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 556,
                      "src": "4387:27:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_string_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (address,string memory) external returns (uint256)"
                      }
                    },
                    "id": 363,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4387:51:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 364,
                  "nodeType": "ExpressionStatement",
                  "src": "4387:51:3"
                }
              ]
            },
            "functionSelector": "6fa0245d",
            "id": 366,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "id": 349,
                "modifierName": {
                  "id": 348,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 616,
                  "src": "4219:9:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4219:9:3"
              }
            ],
            "name": "sendShardToShardOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 347,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 344,
                  "mutability": "mutable",
                  "name": "_shardOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 366,
                  "src": "4148:19:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 343,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4148:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 346,
                  "mutability": "mutable",
                  "name": "_shardURI",
                  "nodeType": "VariableDeclaration",
                  "scope": 366,
                  "src": "4169:23:3",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 345,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4169:6:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "4147:46:3"
            },
            "returnParameters": {
              "id": 350,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4234:0:3"
            },
            "scope": 496,
            "src": "4117:329:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 427,
              "nodeType": "Block",
              "src": "4731:908:3",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 382,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "baseExpression": {
                            "id": 373,
                            "name": "shardHolders",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 82,
                            "src": "4764:12:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 376,
                          "indexExpression": {
                            "expression": {
                              "id": 374,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": -15,
                              "src": "4777:3:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 375,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "src": "4777:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "4764:24:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "&&",
                        "rightExpression": {
                          "id": 381,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "UnaryOperation",
                          "operator": "!",
                          "prefix": true,
                          "src": "4792:24:3",
                          "subExpression": {
                            "baseExpression": {
                              "id": 377,
                              "name": "blacklisted",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 86,
                              "src": "4793:11:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                                "typeString": "mapping(address => bool)"
                              }
                            },
                            "id": 380,
                            "indexExpression": {
                              "expression": {
                                "id": 378,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": -15,
                                "src": "4805:3:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 379,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "sender",
                              "nodeType": "MemberAccess",
                              "src": "4805:10:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4793:23:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "4764:52:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "hexValue": "4e6f7420612076616c69642054727573746565",
                        "id": 383,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4831:21:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_101aeacf41d51be67b6c17151e06445f89226bbd438de22570fc91c9a87ae411",
                          "typeString": "literal_string \"Not a valid Trustee\""
                        },
                        "value": "Not a valid Trustee"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_101aeacf41d51be67b6c17151e06445f89226bbd438de22570fc91c9a87ae411",
                          "typeString": "literal_string \"Not a valid Trustee\""
                        }
                      ],
                      "id": 372,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "4742:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 384,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4742:121:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 385,
                  "nodeType": "ExpressionStatement",
                  "src": "4742:121:3"
                },
                {
                  "expression": {
                    "id": 389,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "id": 386,
                      "name": "trusteeTriggeredRecovery",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 106,
                      "src": "4874:24:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "expression": {
                        "id": 387,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": -15,
                        "src": "4901:3:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 388,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "src": "4901:10:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "4874:37:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 390,
                  "nodeType": "ExpressionStatement",
                  "src": "4874:37:3"
                },
                {
                  "body": {
                    "id": 425,
                    "nodeType": "Block",
                    "src": "5292:340:3",
                    "statements": [
                      {
                        "condition": {
                          "commonType": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          "id": 413,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "baseExpression": {
                              "id": 402,
                              "name": "shardHolders",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 82,
                              "src": "5395:12:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                                "typeString": "mapping(address => bool)"
                              }
                            },
                            "id": 406,
                            "indexExpression": {
                              "baseExpression": {
                                "id": 403,
                                "name": "trustees",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 99,
                                "src": "5408:8:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                  "typeString": "address[] storage ref"
                                }
                              },
                              "id": 405,
                              "indexExpression": {
                                "id": 404,
                                "name": "j",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 392,
                                "src": "5417:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint8",
                                  "typeString": "uint8"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "5408:11:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "5395:25:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "&&",
                          "rightExpression": {
                            "id": 412,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "UnaryOperation",
                            "operator": "!",
                            "prefix": true,
                            "src": "5424:25:3",
                            "subExpression": {
                              "baseExpression": {
                                "id": 407,
                                "name": "blacklisted",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 86,
                                "src": "5425:11:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                                  "typeString": "mapping(address => bool)"
                                }
                              },
                              "id": 411,
                              "indexExpression": {
                                "baseExpression": {
                                  "id": 408,
                                  "name": "trustees",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 99,
                                  "src": "5437:8:3",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                    "typeString": "address[] storage ref"
                                  }
                                },
                                "id": 410,
                                "indexExpression": {
                                  "id": 409,
                                  "name": "j",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 392,
                                  "src": "5446:1:3",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint8",
                                    "typeString": "uint8"
                                  }
                                },
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "nodeType": "IndexAccess",
                                "src": "5437:11:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "5425:24:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              }
                            },
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "src": "5395:54:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "id": 424,
                        "nodeType": "IfStatement",
                        "src": "5391:230:3",
                        "trueBody": {
                          "id": 423,
                          "nodeType": "Block",
                          "src": "5451:170:3",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [
                                  {
                                    "baseExpression": {
                                      "id": 417,
                                      "name": "trustees",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 99,
                                      "src": "5580:8:3",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                        "typeString": "address[] storage ref"
                                      }
                                    },
                                    "id": 419,
                                    "indexExpression": {
                                      "id": 418,
                                      "name": "j",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 392,
                                      "src": "5589:1:3",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint8",
                                        "typeString": "uint8"
                                      }
                                    },
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "nodeType": "IndexAccess",
                                    "src": "5580:11:3",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  },
                                  {
                                    "id": 420,
                                    "name": "_payloadURI",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 369,
                                    "src": "5593:11:3",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_string_memory_ptr",
                                      "typeString": "string memory"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    },
                                    {
                                      "typeIdentifier": "t_string_memory_ptr",
                                      "typeString": "string memory"
                                    }
                                  ],
                                  "expression": {
                                    "id": 414,
                                    "name": "nftContract",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 110,
                                    "src": "5552:11:3",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_contract$_ShardNFT_$557",
                                      "typeString": "contract ShardNFT"
                                    }
                                  },
                                  "id": 416,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "distributeShard",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 556,
                                  "src": "5552:27:3",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_string_memory_ptr_$returns$_t_uint256_$",
                                    "typeString": "function (address,string memory) external returns (uint256)"
                                  }
                                },
                                "id": 421,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "functionCall",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "5552:53:3",
                                "tryCall": false,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 422,
                              "nodeType": "ExpressionStatement",
                              "src": "5552:53:3"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "condition": {
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 398,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "id": 395,
                      "name": "j",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 392,
                      "src": "5266:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "expression": {
                        "id": 396,
                        "name": "trustees",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 99,
                        "src": "5270:8:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 397,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "src": "5270:15:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "5266:19:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 426,
                  "initializationExpression": {
                    "assignments": [
                      392
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 392,
                        "mutability": "mutable",
                        "name": "j",
                        "nodeType": "VariableDeclaration",
                        "scope": 426,
                        "src": "5253:7:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        },
                        "typeName": {
                          "id": 391,
                          "name": "uint8",
                          "nodeType": "ElementaryTypeName",
                          "src": "5253:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        "visibility": "internal"
                      }
                    ],
                    "id": 394,
                    "initialValue": {
                      "hexValue": "30",
                      "id": 393,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5263:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "5253:11:3"
                  },
                  "loopExpression": {
                    "expression": {
                      "id": 400,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "5287:3:3",
                      "subExpression": {
                        "id": 399,
                        "name": "j",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 392,
                        "src": "5287:1:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint8",
                        "typeString": "uint8"
                      }
                    },
                    "id": 401,
                    "nodeType": "ExpressionStatement",
                    "src": "5287:3:3"
                  },
                  "nodeType": "ForStatement",
                  "src": "5248:384:3"
                }
              ]
            },
            "documentation": {
              "id": 367,
              "nodeType": "StructuredDocumentation",
              "src": "4454:207:3",
              "text": " Trigger Recovery Event\n Triggering the recovery event will send a recovery NFT to the addresses of the token holders\n Any of the shard owners can trigger this event"
            },
            "functionSelector": "21668dd4",
            "id": 428,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "triggerRecoveryEvent",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 370,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 369,
                  "mutability": "mutable",
                  "name": "_payloadURI",
                  "nodeType": "VariableDeclaration",
                  "scope": 428,
                  "src": "4697:25:3",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 368,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "4697:6:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "4696:27:3"
            },
            "returnParameters": {
              "id": 371,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4731:0:3"
            },
            "scope": 496,
            "src": "4667:972:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 464,
              "nodeType": "Block",
              "src": "5721:418:3",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 439,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "id": 434,
                          "name": "trusteeTriggeredRecovery",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 106,
                          "src": "5754:24:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "arguments": [
                            {
                              "hexValue": "30",
                              "id": 437,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "5790:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 436,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "5782:7:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": {
                              "id": 435,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "5782:7:3",
                              "typeDescriptions": {}
                            }
                          },
                          "id": 438,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "5782:10:3",
                          "tryCall": false,
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "5754:38:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "hexValue": "5265636f76657279206e6f742079657420696e697469616c69736564",
                        "id": 440,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "5807:30:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_60e08222d8ff7a8f47e8e3b8a92c80617e4094aea254e2effb7800669f8f2b95",
                          "typeString": "literal_string \"Recovery not yet initialised\""
                        },
                        "value": "Recovery not yet initialised"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_60e08222d8ff7a8f47e8e3b8a92c80617e4094aea254e2effb7800669f8f2b95",
                          "typeString": "literal_string \"Recovery not yet initialised\""
                        }
                      ],
                      "id": 433,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "5732:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 441,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5732:116:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 442,
                  "nodeType": "ExpressionStatement",
                  "src": "5732:116:3"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 453,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "baseExpression": {
                            "id": 444,
                            "name": "shardHolders",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 82,
                            "src": "5881:12:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 447,
                          "indexExpression": {
                            "expression": {
                              "id": 445,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": -15,
                              "src": "5894:3:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 446,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "src": "5894:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "5881:24:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "&&",
                        "rightExpression": {
                          "id": 452,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "UnaryOperation",
                          "operator": "!",
                          "prefix": true,
                          "src": "5909:24:3",
                          "subExpression": {
                            "baseExpression": {
                              "id": 448,
                              "name": "blacklisted",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 86,
                              "src": "5910:11:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                                "typeString": "mapping(address => bool)"
                              }
                            },
                            "id": 451,
                            "indexExpression": {
                              "expression": {
                                "id": 449,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": -15,
                                "src": "5922:3:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 450,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "sender",
                              "nodeType": "MemberAccess",
                              "src": "5922:10:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "5910:23:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            }
                          },
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "5881:52:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "hexValue": "4e6f7420612076616c69642054727573746565",
                        "id": 454,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "5948:21:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_101aeacf41d51be67b6c17151e06445f89226bbd438de22570fc91c9a87ae411",
                          "typeString": "literal_string \"Not a valid Trustee\""
                        },
                        "value": "Not a valid Trustee"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_101aeacf41d51be67b6c17151e06445f89226bbd438de22570fc91c9a87ae411",
                          "typeString": "literal_string \"Not a valid Trustee\""
                        }
                      ],
                      "id": 443,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        -18,
                        -18
                      ],
                      "referencedDeclaration": -18,
                      "src": "5859:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 455,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5859:121:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 456,
                  "nodeType": "ExpressionStatement",
                  "src": "5859:121:3"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "id": 460,
                        "name": "trusteeTriggeredRecovery",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 106,
                        "src": "6093:24:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "id": 461,
                        "name": "_payloadURI",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 430,
                        "src": "6119:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      ],
                      "expression": {
                        "id": 457,
                        "name": "nftContract",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 110,
                        "src": "6065:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ShardNFT_$557",
                          "typeString": "contract ShardNFT"
                        }
                      },
                      "id": 459,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "distributeShard",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 556,
                      "src": "6065:27:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_string_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (address,string memory) external returns (uint256)"
                      }
                    },
                    "id": 462,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6065:66:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 463,
                  "nodeType": "ExpressionStatement",
                  "src": "6065:66:3"
                }
              ]
            },
            "functionSelector": "9bcfb6f9",
            "id": 465,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "sendShardToRecoveryInitialiser",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 431,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 430,
                  "mutability": "mutable",
                  "name": "_payloadURI",
                  "nodeType": "VariableDeclaration",
                  "scope": 465,
                  "src": "5687:25:3",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 429,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "5687:6:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "5686:27:3"
            },
            "returnParameters": {
              "id": 432,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5721:0:3"
            },
            "scope": 496,
            "src": "5647:492:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 471,
              "nodeType": "Block",
              "src": "6245:2:3",
              "statements": []
            },
            "documentation": {
              "id": 466,
              "nodeType": "StructuredDocumentation",
              "src": "6147:43:3",
              "text": " Destroy Shard contract"
            },
            "functionSelector": "c6ea0067",
            "id": 472,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "id": 469,
                "modifierName": {
                  "id": 468,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 616,
                  "src": "6235:9:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "6235:9:3"
              }
            ],
            "name": "destroyShardContract",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 467,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6225:2:3"
            },
            "returnParameters": {
              "id": 470,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6245:0:3"
            },
            "scope": 496,
            "src": "6196:51:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 494,
              "nodeType": "Block",
              "src": "6372:143:3",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "id": 484,
                        "name": "_newOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 474,
                        "src": "6432:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "expression": {
                            "id": 485,
                            "name": "this",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": -28,
                            "src": "6456:4:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Recovery_$496",
                              "typeString": "contract Recovery"
                            }
                          },
                          "id": 486,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "owner",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 602,
                          "src": "6456:10:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_external_view$__$returns$_t_address_$",
                            "typeString": "function () view external returns (address)"
                          }
                        },
                        "id": 487,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6456:12:3",
                        "tryCall": false,
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "arguments": [
                          {
                            "id": 490,
                            "name": "this",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": -28,
                            "src": "6491:4:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Recovery_$496",
                              "typeString": "contract Recovery"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Recovery_$496",
                              "typeString": "contract Recovery"
                            }
                          ],
                          "id": 489,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "6483:7:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": {
                            "id": 488,
                            "name": "address",
                            "nodeType": "ElementaryTypeName",
                            "src": "6483:7:3",
                            "typeDescriptions": {}
                          }
                        },
                        "id": 491,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6483:13:3",
                        "tryCall": false,
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "id": 481,
                        "name": "parentContract",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 108,
                        "src": "6383:14:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IShardManager_$52",
                          "typeString": "contract IShardManager"
                        }
                      },
                      "id": 483,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "setNewContractOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 51,
                      "src": "6383:34:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address,address) external"
                      }
                    },
                    "id": 492,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6383:124:3",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 493,
                  "nodeType": "ExpressionStatement",
                  "src": "6383:124:3"
                }
              ]
            },
            "functionSelector": "5df6849d",
            "id": 495,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "id": 479,
                "modifierName": {
                  "id": 478,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 616,
                  "src": "6357:9:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "6357:9:3"
              }
            ],
            "name": "transferRecoveryOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 477,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 474,
                  "mutability": "mutable",
                  "name": "_newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 495,
                  "src": "6290:17:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 473,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "6290:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 476,
                  "mutability": "mutable",
                  "name": "_currentOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 495,
                  "src": "6309:21:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 475,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "6309:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "6289:42:3"
            },
            "returnParameters": {
              "id": 480,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6372:0:3"
            },
            "scope": 496,
            "src": "6255:260:3",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          }
        ],
        "scope": 497,
        "src": "209:6309:3"
      }
    ],
    "src": "40:6480:3"
  },
  "legacyAST": {
    "attributes": {
      "absolutePath": "/C/Users/schee/Documents/Projects/fresh_fyp/contracts/Recovery.sol",
      "exportedSymbols": {
        "Address": [
          2523
        ],
        "Context": [
          2546
        ],
        "Counters": [
          2596
        ],
        "ERC165": [
          724
        ],
        "ERC721": [
          2035
        ],
        "EnumerableMap": [
          3156
        ],
        "EnumerableSet": [
          3648
        ],
        "IERC165": [
          736
        ],
        "IERC721": [
          2151
        ],
        "IERC721Enumerable": [
          2182
        ],
        "IERC721Metadata": [
          2209
        ],
        "IERC721Receiver": [
          2227
        ],
        "IShardManager": [
          52
        ],
        "IShardNFT": [
          65
        ],
        "Ownable": [
          667
        ],
        "Recovery": [
          496
        ],
        "SafeMath": [
          1091
        ],
        "ShardNFT": [
          557
        ],
        "Strings": [
          3735
        ]
      },
      "license": "UNLICENSED"
    },
    "children": [
      {
        "attributes": {
          "literals": [
            "solidity",
            "^",
            "0.7",
            ".4"
          ]
        },
        "id": 67,
        "name": "PragmaDirective",
        "src": "40:23:3"
      },
      {
        "attributes": {
          "SourceUnit": 53,
          "absolutePath": "/C/Users/schee/Documents/Projects/fresh_fyp/contracts/IShardManager.sol",
          "file": "./IShardManager.sol",
          "scope": 497,
          "symbolAliases": [
            null
          ],
          "unitAlias": ""
        },
        "id": 68,
        "name": "ImportDirective",
        "src": "67:29:3"
      },
      {
        "attributes": {
          "SourceUnit": 558,
          "absolutePath": "/C/Users/schee/Documents/Projects/fresh_fyp/contracts/ShardNFT.sol",
          "file": "./ShardNFT.sol",
          "scope": 497,
          "symbolAliases": [
            null
          ],
          "unitAlias": ""
        },
        "id": 69,
        "name": "ImportDirective",
        "src": "98:24:3"
      },
      {
        "attributes": {
          "SourceUnit": 66,
          "absolutePath": "/C/Users/schee/Documents/Projects/fresh_fyp/contracts/IShardNFT.sol",
          "file": "./IShardNFT.sol",
          "scope": 497,
          "symbolAliases": [
            null
          ],
          "unitAlias": ""
        },
        "id": 70,
        "name": "ImportDirective",
        "src": "124:25:3"
      },
      {
        "attributes": {
          "SourceUnit": 668,
          "absolutePath": "@openzeppelin/contracts/access/Ownable.sol",
          "file": "@openzeppelin/contracts/access/Ownable.sol",
          "scope": 497,
          "symbolAliases": [
            null
          ],
          "unitAlias": ""
        },
        "id": 71,
        "name": "ImportDirective",
        "src": "153:52:3"
      },
      {
        "attributes": {
          "abstract": false,
          "contractDependencies": [
            557,
            667,
            2546
          ],
          "contractKind": "contract",
          "fullyImplemented": true,
          "linearizedBaseContracts": [
            496,
            667,
            2546
          ],
          "name": "Recovery",
          "scope": 497
        },
        "children": [
          {
            "attributes": {},
            "children": [
              {
                "attributes": {
                  "name": "Ownable",
                  "referencedDeclaration": 667,
                  "type": "contract Ownable"
                },
                "id": 72,
                "name": "UserDefinedTypeName",
                "src": "230:7:3"
              }
            ],
            "id": 73,
            "name": "InheritanceSpecifier",
            "src": "230:7:3"
          },
          {
            "attributes": {
              "canonicalName": "Recovery.RecoveryState",
              "name": "RecoveryState"
            },
            "children": [
              {
                "attributes": {
                  "name": "Created"
                },
                "id": 74,
                "name": "EnumValue",
                "src": "265:7:3"
              },
              {
                "attributes": {
                  "name": "Normal"
                },
                "id": 75,
                "name": "EnumValue",
                "src": "274:6:3"
              },
              {
                "attributes": {
                  "name": "InRecovery"
                },
                "id": 76,
                "name": "EnumValue",
                "src": "282:10:3"
              },
              {
                "attributes": {
                  "name": "Death"
                },
                "id": 77,
                "name": "EnumValue",
                "src": "294:5:3"
              }
            ],
            "id": 78,
            "name": "EnumDefinition",
            "src": "245:55:3"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "8eb4285a",
              "mutability": "mutable",
              "name": "shardHolders",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "mapping(address => bool)",
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "type": "mapping(address => bool)"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "address",
                      "type": "address"
                    },
                    "id": 79,
                    "name": "ElementaryTypeName",
                    "src": "421:7:3"
                  },
                  {
                    "attributes": {
                      "name": "bool",
                      "type": "bool"
                    },
                    "id": 80,
                    "name": "ElementaryTypeName",
                    "src": "432:4:3"
                  }
                ],
                "id": 81,
                "name": "Mapping",
                "src": "413:24:3"
              }
            ],
            "id": 82,
            "name": "VariableDeclaration",
            "src": "413:44:3"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "dbac26e9",
              "mutability": "mutable",
              "name": "blacklisted",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "mapping(address => bool)",
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "type": "mapping(address => bool)"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "address",
                      "type": "address"
                    },
                    "id": 83,
                    "name": "ElementaryTypeName",
                    "src": "472:7:3"
                  },
                  {
                    "attributes": {
                      "name": "bool",
                      "type": "bool"
                    },
                    "id": 84,
                    "name": "ElementaryTypeName",
                    "src": "483:4:3"
                  }
                ],
                "id": 85,
                "name": "Mapping",
                "src": "464:24:3"
              }
            ],
            "id": 86,
            "name": "VariableDeclaration",
            "src": "464:43:3"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "a9d99795",
              "mutability": "mutable",
              "name": "confirmed",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "mapping(address => bool)",
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "type": "mapping(address => bool)"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "address",
                      "type": "address"
                    },
                    "id": 87,
                    "name": "ElementaryTypeName",
                    "src": "522:7:3"
                  },
                  {
                    "attributes": {
                      "name": "bool",
                      "type": "bool"
                    },
                    "id": 88,
                    "name": "ElementaryTypeName",
                    "src": "533:4:3"
                  }
                ],
                "id": 89,
                "name": "Mapping",
                "src": "514:24:3"
              }
            ],
            "id": 90,
            "name": "VariableDeclaration",
            "src": "514:41:3"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "238a6acb",
              "mutability": "mutable",
              "name": "confirmedBlockNo",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "mapping(address => uint256)",
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "type": "mapping(address => uint256)"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "address",
                      "type": "address"
                    },
                    "id": 91,
                    "name": "ElementaryTypeName",
                    "src": "684:7:3"
                  },
                  {
                    "attributes": {
                      "name": "uint256",
                      "type": "uint256"
                    },
                    "id": 92,
                    "name": "ElementaryTypeName",
                    "src": "695:7:3"
                  }
                ],
                "id": 93,
                "name": "Mapping",
                "src": "676:27:3"
              }
            ],
            "id": 94,
            "name": "VariableDeclaration",
            "src": "676:51:3"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "83f3138b",
              "mutability": "mutable",
              "name": "currentChange",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "uint256",
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "name": "uint256",
                  "type": "uint256"
                },
                "id": 95,
                "name": "ElementaryTypeName",
                "src": "832:7:3"
              }
            ],
            "id": 96,
            "name": "VariableDeclaration",
            "src": "832:28:3"
          },
          {
            "attributes": {
              "constant": false,
              "functionSelector": "717d63a4",
              "mutability": "mutable",
              "name": "trustees",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "address[]",
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "type": "address[]"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "address",
                      "stateMutability": "nonpayable",
                      "type": "address"
                    },
                    "id": 97,
                    "name": "ElementaryTypeName",
                    "src": "955:7:3"
                  }
                ],
                "id": 98,
                "name": "ArrayTypeName",
                "src": "955:9:3"
              }
            ],
            "id": 99,
            "name": "VariableDeclaration",
            "src": "955:25:3"
          },
          {
            "attributes": {
              "constant": false,
              "mutability": "mutable",
              "name": "recoveryThreshold",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "uint8",
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "name": "uint8",
                  "type": "uint8"
                },
                "id": 100,
                "name": "ElementaryTypeName",
                "src": "987:5:3"
              },
              {
                "attributes": {
                  "hexvalue": "30",
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "lValueRequested": false,
                  "token": "number",
                  "type": "int_const 0",
                  "value": "0"
                },
                "id": 101,
                "name": "Literal",
                "src": "1013:1:3"
              }
            ],
            "id": 102,
            "name": "VariableDeclaration",
            "src": "987:27:3"
          },
          {
            "attributes": {
              "constant": false,
              "mutability": "mutable",
              "name": "recoveryState",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "enum Recovery.RecoveryState",
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "name": "RecoveryState",
                  "referencedDeclaration": 78,
                  "type": "enum Recovery.RecoveryState"
                },
                "id": 103,
                "name": "UserDefinedTypeName",
                "src": "1122:13:3"
              }
            ],
            "id": 104,
            "name": "VariableDeclaration",
            "src": "1122:27:3"
          },
          {
            "attributes": {
              "constant": false,
              "mutability": "mutable",
              "name": "trusteeTriggeredRecovery",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "address",
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "name": "address",
                  "stateMutability": "nonpayable",
                  "type": "address"
                },
                "id": 105,
                "name": "ElementaryTypeName",
                "src": "1212:7:3"
              }
            ],
            "id": 106,
            "name": "VariableDeclaration",
            "src": "1212:32:3"
          },
          {
            "attributes": {
              "constant": false,
              "mutability": "mutable",
              "name": "parentContract",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "contract IShardManager",
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "name": "IShardManager",
                  "referencedDeclaration": 52,
                  "type": "contract IShardManager"
                },
                "id": 107,
                "name": "UserDefinedTypeName",
                "src": "1251:13:3"
              }
            ],
            "id": 108,
            "name": "VariableDeclaration",
            "src": "1251:28:3"
          },
          {
            "attributes": {
              "constant": false,
              "mutability": "mutable",
              "name": "nftContract",
              "scope": 496,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "contract ShardNFT",
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "name": "ShardNFT",
                  "referencedDeclaration": 557,
                  "type": "contract ShardNFT"
                },
                "id": 109,
                "name": "UserDefinedTypeName",
                "src": "1286:8:3"
              }
            ],
            "id": 110,
            "name": "VariableDeclaration",
            "src": "1286:20:3"
          },
          {
            "attributes": {
              "anonymous": false,
              "name": "TrusteeVerified"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "account",
                      "scope": 120,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 111,
                        "name": "ElementaryTypeName",
                        "src": "1347:7:3"
                      }
                    ],
                    "id": 112,
                    "name": "VariableDeclaration",
                    "src": "1347:23:3"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "mutability": "mutable",
                      "name": "owner",
                      "scope": 120,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 113,
                        "name": "ElementaryTypeName",
                        "src": "1381:7:3"
                      }
                    ],
                    "id": 114,
                    "name": "VariableDeclaration",
                    "src": "1381:13:3"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "mutability": "mutable",
                      "name": "previousChange",
                      "scope": 120,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 115,
                        "name": "ElementaryTypeName",
                        "src": "1405:7:3"
                      }
                    ],
                    "id": 116,
                    "name": "VariableDeclaration",
                    "src": "1405:22:3"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "mutability": "mutable",
                      "name": "currentBlock",
                      "scope": 120,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 117,
                        "name": "ElementaryTypeName",
                        "src": "1438:7:3"
                      }
                    ],
                    "id": 118,
                    "name": "VariableDeclaration",
                    "src": "1438:20:3"
                  }
                ],
                "id": 119,
                "name": "ParameterList",
                "src": "1336:129:3"
              }
            ],
            "id": 120,
            "name": "EventDefinition",
            "src": "1315:151:3"
          },
          {
            "attributes": {
              "anonymous": false,
              "name": "TrusteeAdded"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "mutability": "mutable",
                      "name": "account",
                      "scope": 128,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 121,
                        "name": "ElementaryTypeName",
                        "src": "1503:7:3"
                      }
                    ],
                    "id": 122,
                    "name": "VariableDeclaration",
                    "src": "1503:23:3"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "mutability": "mutable",
                      "name": "owner",
                      "scope": 128,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 123,
                        "name": "ElementaryTypeName",
                        "src": "1537:7:3"
                      }
                    ],
                    "id": 124,
                    "name": "VariableDeclaration",
                    "src": "1537:13:3"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "mutability": "mutable",
                      "name": "previousChange",
                      "scope": 128,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 125,
                        "name": "ElementaryTypeName",
                        "src": "1561:7:3"
                      }
                    ],
                    "id": 126,
                    "name": "VariableDeclaration",
                    "src": "1561:22:3"
                  }
                ],
                "id": 127,
                "name": "ParameterList",
                "src": "1492:98:3"
              }
            ],
            "id": 128,
            "name": "EventDefinition",
            "src": "1474:117:3"
          },
          {
            "attributes": {
              "implemented": true,
              "isConstructor": true,
              "kind": "constructor",
              "modifiers": [
                null
              ],
              "name": "",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_parentContract",
                      "scope": 158,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 129,
                        "name": "ElementaryTypeName",
                        "src": "1647:7:3"
                      }
                    ],
                    "id": 130,
                    "name": "VariableDeclaration",
                    "src": "1647:23:3"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_owner",
                      "scope": 158,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 131,
                        "name": "ElementaryTypeName",
                        "src": "1681:7:3"
                      }
                    ],
                    "id": 132,
                    "name": "VariableDeclaration",
                    "src": "1681:14:3"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_recoveryThreshold",
                      "scope": 158,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint8",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint8",
                          "type": "uint8"
                        },
                        "id": 133,
                        "name": "ElementaryTypeName",
                        "src": "1706:5:3"
                      }
                    ],
                    "id": 134,
                    "name": "VariableDeclaration",
                    "src": "1706:24:3"
                  }
                ],
                "id": 135,
                "name": "ParameterList",
                "src": "1636:101:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 136,
                "name": "ParameterList",
                "src": "1738:0:3"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "contract IShardManager"
                        },
                        "children": [
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 108,
                              "type": "contract IShardManager",
                              "value": "parentContract"
                            },
                            "id": 137,
                            "name": "Identifier",
                            "src": "1749:14:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "tryCall": false,
                              "type": "contract IShardManager",
                              "type_conversion": true
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 52,
                                  "type": "type(contract IShardManager)",
                                  "value": "IShardManager"
                                },
                                "id": 138,
                                "name": "Identifier",
                                "src": "1766:13:3"
                              },
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 130,
                                  "type": "address",
                                  "value": "_parentContract"
                                },
                                "id": 139,
                                "name": "Identifier",
                                "src": "1780:15:3"
                              }
                            ],
                            "id": 140,
                            "name": "FunctionCall",
                            "src": "1766:30:3"
                          }
                        ],
                        "id": 141,
                        "name": "Assignment",
                        "src": "1749:47:3"
                      }
                    ],
                    "id": 142,
                    "name": "ExpressionStatement",
                    "src": "1749:47:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "contract ShardNFT"
                        },
                        "children": [
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 110,
                              "type": "contract ShardNFT",
                              "value": "nftContract"
                            },
                            "id": 143,
                            "name": "Identifier",
                            "src": "1807:11:3"
                          },
                          {
                            "attributes": {
                              "arguments": [
                                null
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "tryCall": false,
                              "type": "contract ShardNFT",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    null
                                  ],
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "function () returns (contract ShardNFT)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "name": "ShardNFT",
                                      "referencedDeclaration": 557,
                                      "type": "contract ShardNFT"
                                    },
                                    "id": 144,
                                    "name": "UserDefinedTypeName",
                                    "src": "1825:8:3"
                                  }
                                ],
                                "id": 145,
                                "name": "NewExpression",
                                "src": "1821:12:3"
                              }
                            ],
                            "id": 146,
                            "name": "FunctionCall",
                            "src": "1821:14:3"
                          }
                        ],
                        "id": 147,
                        "name": "Assignment",
                        "src": "1807:28:3"
                      }
                    ],
                    "id": 148,
                    "name": "ExpressionStatement",
                    "src": "1807:28:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 666,
                              "type": "function (address)",
                              "value": "transferOwnership"
                            },
                            "id": 149,
                            "name": "Identifier",
                            "src": "1846:17:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 132,
                              "type": "address",
                              "value": "_owner"
                            },
                            "id": 150,
                            "name": "Identifier",
                            "src": "1864:6:3"
                          }
                        ],
                        "id": 151,
                        "name": "FunctionCall",
                        "src": "1846:25:3"
                      }
                    ],
                    "id": 152,
                    "name": "ExpressionStatement",
                    "src": "1846:25:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint8"
                        },
                        "children": [
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 102,
                              "type": "uint8",
                              "value": "recoveryThreshold"
                            },
                            "id": 153,
                            "name": "Identifier",
                            "src": "1882:17:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 134,
                              "type": "uint8",
                              "value": "_recoveryThreshold"
                            },
                            "id": 154,
                            "name": "Identifier",
                            "src": "1902:18:3"
                          }
                        ],
                        "id": 155,
                        "name": "Assignment",
                        "src": "1882:38:3"
                      }
                    ],
                    "id": 156,
                    "name": "ExpressionStatement",
                    "src": "1882:38:3"
                  }
                ],
                "id": 157,
                "name": "Block",
                "src": "1738:190:3"
              }
            ],
            "id": 158,
            "name": "FunctionDefinition",
            "src": "1625:303:3"
          },
          {
            "attributes": {
              "functionSelector": "b9618478",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "name": "getNFTAddress",
              "scope": 496,
              "stateMutability": "view",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 159,
                "name": "ParameterList",
                "src": "1958:2:3"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "scope": 171,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 162,
                        "name": "ElementaryTypeName",
                        "src": "1992:7:3"
                      }
                    ],
                    "id": 163,
                    "name": "VariableDeclaration",
                    "src": "1992:7:3"
                  }
                ],
                "id": 164,
                "name": "ParameterList",
                "src": "1991:9:3"
              },
              {
                "attributes": {},
                "children": [
                  {
                    "attributes": {
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 616,
                      "type": "modifier ()",
                      "value": "onlyOwner"
                    },
                    "id": 160,
                    "name": "Identifier",
                    "src": "1973:9:3"
                  }
                ],
                "id": 161,
                "name": "ModifierInvocation",
                "src": "1973:9:3"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 164
                    },
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "address",
                          "type_conversion": true
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_contract$_ShardNFT_$557",
                                  "typeString": "contract ShardNFT"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "type": "type(address)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "name": "address"
                                },
                                "id": 165,
                                "name": "ElementaryTypeName",
                                "src": "2019:7:3"
                              }
                            ],
                            "id": 166,
                            "name": "ElementaryTypeNameExpression",
                            "src": "2019:7:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 110,
                              "type": "contract ShardNFT",
                              "value": "nftContract"
                            },
                            "id": 167,
                            "name": "Identifier",
                            "src": "2027:11:3"
                          }
                        ],
                        "id": 168,
                        "name": "FunctionCall",
                        "src": "2019:20:3"
                      }
                    ],
                    "id": 169,
                    "name": "Return",
                    "src": "2012:27:3"
                  }
                ],
                "id": 170,
                "name": "Block",
                "src": "2001:46:3"
              }
            ],
            "id": 171,
            "name": "FunctionDefinition",
            "src": "1936:111:3"
          },
          {
            "attributes": {
              "functionSelector": "beffaf09",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "getTrustees",
              "scope": 496,
              "stateMutability": "view",
              "virtual": false,
              "visibility": "external"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 172,
                "name": "ParameterList",
                "src": "2075:2:3"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "scope": 180,
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "type": "address[]",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "type": "address[]"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "stateMutability": "nonpayable",
                              "type": "address"
                            },
                            "id": 173,
                            "name": "ElementaryTypeName",
                            "src": "2101:7:3"
                          }
                        ],
                        "id": 174,
                        "name": "ArrayTypeName",
                        "src": "2101:9:3"
                      }
                    ],
                    "id": 175,
                    "name": "VariableDeclaration",
                    "src": "2101:16:3"
                  }
                ],
                "id": 176,
                "name": "ParameterList",
                "src": "2100:18:3"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 176
                    },
                    "children": [
                      {
                        "attributes": {
                          "overloadedDeclarations": [
                            null
                          ],
                          "referencedDeclaration": 99,
                          "type": "address[] storage ref",
                          "value": "trustees"
                        },
                        "id": 177,
                        "name": "Identifier",
                        "src": "2137:8:3"
                      }
                    ],
                    "id": 178,
                    "name": "Return",
                    "src": "2130:15:3"
                  }
                ],
                "id": 179,
                "name": "Block",
                "src": "2119:34:3"
              }
            ],
            "id": 180,
            "name": "FunctionDefinition",
            "src": "2055:98:3"
          },
          {
            "attributes": {
              "functionSelector": "64cc629b",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "viewWhoTriggeredRecovery",
              "scope": 496,
              "stateMutability": "view",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 181,
                "name": "ParameterList",
                "src": "2194:2:3"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "",
                      "scope": 191,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 182,
                        "name": "ElementaryTypeName",
                        "src": "2218:7:3"
                      }
                    ],
                    "id": 183,
                    "name": "VariableDeclaration",
                    "src": "2218:7:3"
                  }
                ],
                "id": 184,
                "name": "ParameterList",
                "src": "2217:9:3"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 184
                    },
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "address",
                          "type_conversion": true
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "type": "type(address)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "name": "address"
                                },
                                "id": 185,
                                "name": "ElementaryTypeName",
                                "src": "2245:7:3"
                              }
                            ],
                            "id": 186,
                            "name": "ElementaryTypeNameExpression",
                            "src": "2245:7:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 106,
                              "type": "address",
                              "value": "trusteeTriggeredRecovery"
                            },
                            "id": 187,
                            "name": "Identifier",
                            "src": "2253:24:3"
                          }
                        ],
                        "id": 188,
                        "name": "FunctionCall",
                        "src": "2245:33:3"
                      }
                    ],
                    "id": 189,
                    "name": "Return",
                    "src": "2238:40:3"
                  }
                ],
                "id": 190,
                "name": "Block",
                "src": "2227:59:3"
              }
            ],
            "id": 191,
            "name": "FunctionDefinition",
            "src": "2161:125:3"
          },
          {
            "attributes": {
              "functionSelector": "798c20ea",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "name": "batchAddShardholder",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_toAdd",
                      "scope": 238,
                      "stateVariable": false,
                      "storageLocation": "calldata",
                      "type": "address[]",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "type": "address[]"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "stateMutability": "nonpayable",
                              "type": "address"
                            },
                            "id": 192,
                            "name": "ElementaryTypeName",
                            "src": "2729:7:3"
                          }
                        ],
                        "id": 193,
                        "name": "ArrayTypeName",
                        "src": "2729:9:3"
                      }
                    ],
                    "id": 194,
                    "name": "VariableDeclaration",
                    "src": "2729:25:3"
                  }
                ],
                "id": 195,
                "name": "ParameterList",
                "src": "2728:27:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 198,
                "name": "ParameterList",
                "src": "2773:0:3"
              },
              {
                "attributes": {},
                "children": [
                  {
                    "attributes": {
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 616,
                      "type": "modifier ()",
                      "value": "onlyOwner"
                    },
                    "id": 196,
                    "name": "Identifier",
                    "src": "2763:9:3"
                  }
                ],
                "id": 197,
                "name": "ModifierInvocation",
                "src": "2763:9:3"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "assignments": [
                            200
                          ]
                        },
                        "children": [
                          {
                            "attributes": {
                              "constant": false,
                              "mutability": "mutable",
                              "name": "i",
                              "scope": 236,
                              "stateVariable": false,
                              "storageLocation": "default",
                              "type": "uint8",
                              "visibility": "internal"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "name": "uint8",
                                  "type": "uint8"
                                },
                                "id": 199,
                                "name": "ElementaryTypeName",
                                "src": "2848:5:3"
                              }
                            ],
                            "id": 200,
                            "name": "VariableDeclaration",
                            "src": "2848:7:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "30",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "number",
                              "type": "int_const 0",
                              "value": "0"
                            },
                            "id": 201,
                            "name": "Literal",
                            "src": "2858:1:3"
                          }
                        ],
                        "id": 202,
                        "name": "VariableDeclarationStatement",
                        "src": "2848:11:3"
                      },
                      {
                        "attributes": {
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "<",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 200,
                              "type": "uint8",
                              "value": "i"
                            },
                            "id": 203,
                            "name": "Identifier",
                            "src": "2861:1:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "length",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 194,
                                  "type": "address[] calldata",
                                  "value": "_toAdd"
                                },
                                "id": 204,
                                "name": "Identifier",
                                "src": "2865:6:3"
                              }
                            ],
                            "id": 205,
                            "name": "MemberAccess",
                            "src": "2865:13:3"
                          }
                        ],
                        "id": 206,
                        "name": "BinaryOperation",
                        "src": "2861:17:3"
                      },
                      {
                        "children": [
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "++",
                              "prefix": false,
                              "type": "uint8"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 200,
                                  "type": "uint8",
                                  "value": "i"
                                },
                                "id": 207,
                                "name": "Identifier",
                                "src": "2880:1:3"
                              }
                            ],
                            "id": 208,
                            "name": "UnaryOperation",
                            "src": "2880:3:3"
                          }
                        ],
                        "id": 209,
                        "name": "ExpressionStatement",
                        "src": "2880:3:3"
                      },
                      {
                        "children": [
                          {
                            "attributes": {},
                            "children": [
                              {
                                "attributes": {
                                  "commonType": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "operator": "!=",
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "type": "bool"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 82,
                                          "type": "mapping(address => bool)",
                                          "value": "shardHolders"
                                        },
                                        "id": 210,
                                        "name": "Identifier",
                                        "src": "2961:12:3"
                                      },
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "lValueRequested": false,
                                          "type": "address"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 194,
                                              "type": "address[] calldata",
                                              "value": "_toAdd"
                                            },
                                            "id": 211,
                                            "name": "Identifier",
                                            "src": "2974:6:3"
                                          },
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 200,
                                              "type": "uint8",
                                              "value": "i"
                                            },
                                            "id": 212,
                                            "name": "Identifier",
                                            "src": "2981:1:3"
                                          }
                                        ],
                                        "id": 213,
                                        "name": "IndexAccess",
                                        "src": "2974:9:3"
                                      }
                                    ],
                                    "id": 214,
                                    "name": "IndexAccess",
                                    "src": "2961:23:3"
                                  },
                                  {
                                    "attributes": {
                                      "hexvalue": "74727565",
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "token": "bool",
                                      "type": "bool",
                                      "value": "true"
                                    },
                                    "id": 215,
                                    "name": "Literal",
                                    "src": "2988:4:3"
                                  }
                                ],
                                "id": 216,
                                "name": "BinaryOperation",
                                "src": "2961:31:3"
                              },
                              {
                                "children": [
                                  {
                                    "children": [
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "lValueRequested": false,
                                          "operator": "=",
                                          "type": "bool"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "isConstant": false,
                                              "isLValue": true,
                                              "isPure": false,
                                              "lValueRequested": true,
                                              "type": "bool"
                                            },
                                            "children": [
                                              {
                                                "attributes": {
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 82,
                                                  "type": "mapping(address => bool)",
                                                  "value": "shardHolders"
                                                },
                                                "id": 217,
                                                "name": "Identifier",
                                                "src": "3013:12:3"
                                              },
                                              {
                                                "attributes": {
                                                  "isConstant": false,
                                                  "isLValue": false,
                                                  "isPure": false,
                                                  "lValueRequested": false,
                                                  "type": "address"
                                                },
                                                "children": [
                                                  {
                                                    "attributes": {
                                                      "overloadedDeclarations": [
                                                        null
                                                      ],
                                                      "referencedDeclaration": 194,
                                                      "type": "address[] calldata",
                                                      "value": "_toAdd"
                                                    },
                                                    "id": 218,
                                                    "name": "Identifier",
                                                    "src": "3026:6:3"
                                                  },
                                                  {
                                                    "attributes": {
                                                      "overloadedDeclarations": [
                                                        null
                                                      ],
                                                      "referencedDeclaration": 200,
                                                      "type": "uint8",
                                                      "value": "i"
                                                    },
                                                    "id": 219,
                                                    "name": "Identifier",
                                                    "src": "3033:1:3"
                                                  }
                                                ],
                                                "id": 220,
                                                "name": "IndexAccess",
                                                "src": "3026:9:3"
                                              }
                                            ],
                                            "id": 221,
                                            "name": "IndexAccess",
                                            "src": "3013:23:3"
                                          },
                                          {
                                            "attributes": {
                                              "hexvalue": "74727565",
                                              "isConstant": false,
                                              "isLValue": false,
                                              "isPure": true,
                                              "lValueRequested": false,
                                              "token": "bool",
                                              "type": "bool",
                                              "value": "true"
                                            },
                                            "id": 222,
                                            "name": "Literal",
                                            "src": "3039:4:3"
                                          }
                                        ],
                                        "id": 223,
                                        "name": "Assignment",
                                        "src": "3013:30:3"
                                      }
                                    ],
                                    "id": 224,
                                    "name": "ExpressionStatement",
                                    "src": "3013:30:3"
                                  },
                                  {
                                    "children": [
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "isStructConstructorCall": false,
                                          "lValueRequested": false,
                                          "names": [
                                            null
                                          ],
                                          "tryCall": false,
                                          "type": "tuple()",
                                          "type_conversion": false
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "argumentTypes": [
                                                {
                                                  "typeIdentifier": "t_address",
                                                  "typeString": "address"
                                                }
                                              ],
                                              "isConstant": false,
                                              "isLValue": false,
                                              "isPure": false,
                                              "lValueRequested": false,
                                              "member_name": "push",
                                              "type": "function (address)"
                                            },
                                            "children": [
                                              {
                                                "attributes": {
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 99,
                                                  "type": "address[] storage ref",
                                                  "value": "trustees"
                                                },
                                                "id": 225,
                                                "name": "Identifier",
                                                "src": "3062:8:3"
                                              }
                                            ],
                                            "id": 227,
                                            "name": "MemberAccess",
                                            "src": "3062:13:3"
                                          },
                                          {
                                            "attributes": {
                                              "isConstant": false,
                                              "isLValue": false,
                                              "isPure": false,
                                              "lValueRequested": false,
                                              "type": "address"
                                            },
                                            "children": [
                                              {
                                                "attributes": {
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 194,
                                                  "type": "address[] calldata",
                                                  "value": "_toAdd"
                                                },
                                                "id": 228,
                                                "name": "Identifier",
                                                "src": "3076:6:3"
                                              },
                                              {
                                                "attributes": {
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 200,
                                                  "type": "uint8",
                                                  "value": "i"
                                                },
                                                "id": 229,
                                                "name": "Identifier",
                                                "src": "3083:1:3"
                                              }
                                            ],
                                            "id": 230,
                                            "name": "IndexAccess",
                                            "src": "3076:9:3"
                                          }
                                        ],
                                        "id": 231,
                                        "name": "FunctionCall",
                                        "src": "3062:24:3"
                                      }
                                    ],
                                    "id": 232,
                                    "name": "ExpressionStatement",
                                    "src": "3062:24:3"
                                  }
                                ],
                                "id": 233,
                                "name": "Block",
                                "src": "2994:108:3"
                              }
                            ],
                            "id": 234,
                            "name": "IfStatement",
                            "src": "2957:145:3"
                          }
                        ],
                        "id": 235,
                        "name": "Block",
                        "src": "2885:228:3"
                      }
                    ],
                    "id": 236,
                    "name": "ForStatement",
                    "src": "2843:270:3"
                  }
                ],
                "id": 237,
                "name": "Block",
                "src": "2773:347:3"
              }
            ],
            "id": 238,
            "name": "FunctionDefinition",
            "src": "2700:420:3"
          },
          {
            "attributes": {
              "functionSelector": "f5cd3643",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "name": "batchBlacklistShardholder",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_toBlacklist",
                      "scope": 268,
                      "stateVariable": false,
                      "storageLocation": "calldata",
                      "type": "address[]",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "type": "address[]"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "stateMutability": "nonpayable",
                              "type": "address"
                            },
                            "id": 239,
                            "name": "ElementaryTypeName",
                            "src": "3163:7:3"
                          }
                        ],
                        "id": 240,
                        "name": "ArrayTypeName",
                        "src": "3163:9:3"
                      }
                    ],
                    "id": 241,
                    "name": "VariableDeclaration",
                    "src": "3163:31:3"
                  }
                ],
                "id": 242,
                "name": "ParameterList",
                "src": "3162:33:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 245,
                "name": "ParameterList",
                "src": "3236:0:3"
              },
              {
                "attributes": {},
                "children": [
                  {
                    "attributes": {
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 616,
                      "type": "modifier ()",
                      "value": "onlyOwner"
                    },
                    "id": 243,
                    "name": "Identifier",
                    "src": "3221:9:3"
                  }
                ],
                "id": 244,
                "name": "ModifierInvocation",
                "src": "3221:9:3"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "assignments": [
                            247
                          ]
                        },
                        "children": [
                          {
                            "attributes": {
                              "constant": false,
                              "mutability": "mutable",
                              "name": "i",
                              "scope": 266,
                              "stateVariable": false,
                              "storageLocation": "default",
                              "type": "uint8",
                              "visibility": "internal"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "name": "uint8",
                                  "type": "uint8"
                                },
                                "id": 246,
                                "name": "ElementaryTypeName",
                                "src": "3311:5:3"
                              }
                            ],
                            "id": 247,
                            "name": "VariableDeclaration",
                            "src": "3311:7:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "30",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "number",
                              "type": "int_const 0",
                              "value": "0"
                            },
                            "id": 248,
                            "name": "Literal",
                            "src": "3321:1:3"
                          }
                        ],
                        "id": 249,
                        "name": "VariableDeclarationStatement",
                        "src": "3311:11:3"
                      },
                      {
                        "attributes": {
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "<",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 247,
                              "type": "uint8",
                              "value": "i"
                            },
                            "id": 250,
                            "name": "Identifier",
                            "src": "3324:1:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "length",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 241,
                                  "type": "address[] calldata",
                                  "value": "_toBlacklist"
                                },
                                "id": 251,
                                "name": "Identifier",
                                "src": "3328:12:3"
                              }
                            ],
                            "id": 252,
                            "name": "MemberAccess",
                            "src": "3328:19:3"
                          }
                        ],
                        "id": 253,
                        "name": "BinaryOperation",
                        "src": "3324:23:3"
                      },
                      {
                        "children": [
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "++",
                              "prefix": false,
                              "type": "uint8"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 247,
                                  "type": "uint8",
                                  "value": "i"
                                },
                                "id": 254,
                                "name": "Identifier",
                                "src": "3349:1:3"
                              }
                            ],
                            "id": 255,
                            "name": "UnaryOperation",
                            "src": "3349:3:3"
                          }
                        ],
                        "id": 256,
                        "name": "ExpressionStatement",
                        "src": "3349:3:3"
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "operator": "=",
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": true,
                                      "type": "bool"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 86,
                                          "type": "mapping(address => bool)",
                                          "value": "blacklisted"
                                        },
                                        "id": 257,
                                        "name": "Identifier",
                                        "src": "3369:11:3"
                                      },
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "lValueRequested": false,
                                          "type": "address"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 241,
                                              "type": "address[] calldata",
                                              "value": "_toBlacklist"
                                            },
                                            "id": 258,
                                            "name": "Identifier",
                                            "src": "3381:12:3"
                                          },
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 247,
                                              "type": "uint8",
                                              "value": "i"
                                            },
                                            "id": 259,
                                            "name": "Identifier",
                                            "src": "3394:1:3"
                                          }
                                        ],
                                        "id": 260,
                                        "name": "IndexAccess",
                                        "src": "3381:15:3"
                                      }
                                    ],
                                    "id": 261,
                                    "name": "IndexAccess",
                                    "src": "3369:28:3"
                                  },
                                  {
                                    "attributes": {
                                      "hexvalue": "74727565",
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "token": "bool",
                                      "type": "bool",
                                      "value": "true"
                                    },
                                    "id": 262,
                                    "name": "Literal",
                                    "src": "3400:4:3"
                                  }
                                ],
                                "id": 263,
                                "name": "Assignment",
                                "src": "3369:35:3"
                              }
                            ],
                            "id": 264,
                            "name": "ExpressionStatement",
                            "src": "3369:35:3"
                          }
                        ],
                        "id": 265,
                        "name": "Block",
                        "src": "3354:62:3"
                      }
                    ],
                    "id": 266,
                    "name": "ForStatement",
                    "src": "3306:110:3"
                  }
                ],
                "id": 267,
                "name": "Block",
                "src": "3236:187:3"
              }
            ],
            "id": 268,
            "name": "FunctionDefinition",
            "src": "3128:295:3"
          },
          {
            "attributes": {
              "functionSelector": "3ccfbde3",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "name": "batchRemoveBlacklistShardholder",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_toBlacklist",
                      "scope": 298,
                      "stateVariable": false,
                      "storageLocation": "calldata",
                      "type": "address[]",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "type": "address[]"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "stateMutability": "nonpayable",
                              "type": "address"
                            },
                            "id": 269,
                            "name": "ElementaryTypeName",
                            "src": "3472:7:3"
                          }
                        ],
                        "id": 270,
                        "name": "ArrayTypeName",
                        "src": "3472:9:3"
                      }
                    ],
                    "id": 271,
                    "name": "VariableDeclaration",
                    "src": "3472:31:3"
                  }
                ],
                "id": 272,
                "name": "ParameterList",
                "src": "3471:33:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 275,
                "name": "ParameterList",
                "src": "3545:0:3"
              },
              {
                "attributes": {},
                "children": [
                  {
                    "attributes": {
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 616,
                      "type": "modifier ()",
                      "value": "onlyOwner"
                    },
                    "id": 273,
                    "name": "Identifier",
                    "src": "3530:9:3"
                  }
                ],
                "id": 274,
                "name": "ModifierInvocation",
                "src": "3530:9:3"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "assignments": [
                            277
                          ]
                        },
                        "children": [
                          {
                            "attributes": {
                              "constant": false,
                              "mutability": "mutable",
                              "name": "i",
                              "scope": 296,
                              "stateVariable": false,
                              "storageLocation": "default",
                              "type": "uint8",
                              "visibility": "internal"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "name": "uint8",
                                  "type": "uint8"
                                },
                                "id": 276,
                                "name": "ElementaryTypeName",
                                "src": "3561:5:3"
                              }
                            ],
                            "id": 277,
                            "name": "VariableDeclaration",
                            "src": "3561:7:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "30",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "number",
                              "type": "int_const 0",
                              "value": "0"
                            },
                            "id": 278,
                            "name": "Literal",
                            "src": "3571:1:3"
                          }
                        ],
                        "id": 279,
                        "name": "VariableDeclarationStatement",
                        "src": "3561:11:3"
                      },
                      {
                        "attributes": {
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "<",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 277,
                              "type": "uint8",
                              "value": "i"
                            },
                            "id": 280,
                            "name": "Identifier",
                            "src": "3574:1:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "length",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 271,
                                  "type": "address[] calldata",
                                  "value": "_toBlacklist"
                                },
                                "id": 281,
                                "name": "Identifier",
                                "src": "3578:12:3"
                              }
                            ],
                            "id": 282,
                            "name": "MemberAccess",
                            "src": "3578:19:3"
                          }
                        ],
                        "id": 283,
                        "name": "BinaryOperation",
                        "src": "3574:23:3"
                      },
                      {
                        "children": [
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "++",
                              "prefix": false,
                              "type": "uint8"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 277,
                                  "type": "uint8",
                                  "value": "i"
                                },
                                "id": 284,
                                "name": "Identifier",
                                "src": "3599:1:3"
                              }
                            ],
                            "id": 285,
                            "name": "UnaryOperation",
                            "src": "3599:3:3"
                          }
                        ],
                        "id": 286,
                        "name": "ExpressionStatement",
                        "src": "3599:3:3"
                      },
                      {
                        "children": [
                          {
                            "children": [
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "operator": "=",
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": true,
                                      "type": "bool"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 86,
                                          "type": "mapping(address => bool)",
                                          "value": "blacklisted"
                                        },
                                        "id": 287,
                                        "name": "Identifier",
                                        "src": "3619:11:3"
                                      },
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "lValueRequested": false,
                                          "type": "address"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 271,
                                              "type": "address[] calldata",
                                              "value": "_toBlacklist"
                                            },
                                            "id": 288,
                                            "name": "Identifier",
                                            "src": "3631:12:3"
                                          },
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 277,
                                              "type": "uint8",
                                              "value": "i"
                                            },
                                            "id": 289,
                                            "name": "Identifier",
                                            "src": "3644:1:3"
                                          }
                                        ],
                                        "id": 290,
                                        "name": "IndexAccess",
                                        "src": "3631:15:3"
                                      }
                                    ],
                                    "id": 291,
                                    "name": "IndexAccess",
                                    "src": "3619:28:3"
                                  },
                                  {
                                    "attributes": {
                                      "hexvalue": "66616c7365",
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "token": "bool",
                                      "type": "bool",
                                      "value": "false"
                                    },
                                    "id": 292,
                                    "name": "Literal",
                                    "src": "3650:5:3"
                                  }
                                ],
                                "id": 293,
                                "name": "Assignment",
                                "src": "3619:36:3"
                              }
                            ],
                            "id": 294,
                            "name": "ExpressionStatement",
                            "src": "3619:36:3"
                          }
                        ],
                        "id": 295,
                        "name": "Block",
                        "src": "3604:63:3"
                      }
                    ],
                    "id": 296,
                    "name": "ForStatement",
                    "src": "3556:111:3"
                  }
                ],
                "id": 297,
                "name": "Block",
                "src": "3545:129:3"
              }
            ],
            "id": 298,
            "name": "FunctionDefinition",
            "src": "3431:243:3"
          },
          {
            "attributes": {
              "functionSelector": "dd70b55c",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "confirmTrustee",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "text": "Confirm Trustee"
                },
                "id": 299,
                "name": "StructuredDocumentation",
                "src": "3682:28:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 300,
                "name": "ParameterList",
                "src": "3739:2:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 301,
                "name": "ParameterList",
                "src": "3749:0:3"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_ebd44491b842d685605eb070b614cc93e97b582d028b5de713fb267b99d491e4",
                                  "typeString": "literal_string \"Sender is not a trustee\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 302,
                            "name": "Identifier",
                            "src": "3760:7:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 82,
                                  "type": "mapping(address => bool)",
                                  "value": "shardHolders"
                                },
                                "id": 303,
                                "name": "Identifier",
                                "src": "3768:12:3"
                              },
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "sender",
                                  "type": "address payable"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -15,
                                      "type": "msg",
                                      "value": "msg"
                                    },
                                    "id": 304,
                                    "name": "Identifier",
                                    "src": "3781:3:3"
                                  }
                                ],
                                "id": 305,
                                "name": "MemberAccess",
                                "src": "3781:10:3"
                              }
                            ],
                            "id": 306,
                            "name": "IndexAccess",
                            "src": "3768:24:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "53656e646572206973206e6f7420612074727573746565",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "string",
                              "type": "literal_string \"Sender is not a trustee\"",
                              "value": "Sender is not a trustee"
                            },
                            "id": 307,
                            "name": "Literal",
                            "src": "3794:25:3"
                          }
                        ],
                        "id": 308,
                        "name": "FunctionCall",
                        "src": "3760:60:3"
                      }
                    ],
                    "id": 309,
                    "name": "ExpressionStatement",
                    "src": "3760:60:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 90,
                                  "type": "mapping(address => bool)",
                                  "value": "confirmed"
                                },
                                "id": 310,
                                "name": "Identifier",
                                "src": "3831:9:3"
                              },
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "sender",
                                  "type": "address payable"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -15,
                                      "type": "msg",
                                      "value": "msg"
                                    },
                                    "id": 311,
                                    "name": "Identifier",
                                    "src": "3841:3:3"
                                  }
                                ],
                                "id": 312,
                                "name": "MemberAccess",
                                "src": "3841:10:3"
                              }
                            ],
                            "id": 313,
                            "name": "IndexAccess",
                            "src": "3831:21:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "74727565",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "bool",
                              "type": "bool",
                              "value": "true"
                            },
                            "id": 314,
                            "name": "Literal",
                            "src": "3855:4:3"
                          }
                        ],
                        "id": 315,
                        "name": "Assignment",
                        "src": "3831:28:3"
                      }
                    ],
                    "id": 316,
                    "name": "ExpressionStatement",
                    "src": "3831:28:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 94,
                                  "type": "mapping(address => uint256)",
                                  "value": "confirmedBlockNo"
                                },
                                "id": 317,
                                "name": "Identifier",
                                "src": "3870:16:3"
                              },
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "sender",
                                  "type": "address payable"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -15,
                                      "type": "msg",
                                      "value": "msg"
                                    },
                                    "id": 318,
                                    "name": "Identifier",
                                    "src": "3887:3:3"
                                  }
                                ],
                                "id": 319,
                                "name": "MemberAccess",
                                "src": "3887:10:3"
                              }
                            ],
                            "id": 320,
                            "name": "IndexAccess",
                            "src": "3870:28:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "number",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -4,
                                  "type": "block",
                                  "value": "block"
                                },
                                "id": 321,
                                "name": "Identifier",
                                "src": "3901:5:3"
                              }
                            ],
                            "id": 322,
                            "name": "MemberAccess",
                            "src": "3901:12:3"
                          }
                        ],
                        "id": 323,
                        "name": "Assignment",
                        "src": "3870:43:3"
                      }
                    ],
                    "id": 324,
                    "name": "ExpressionStatement",
                    "src": "3870:43:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address_payable",
                                  "typeString": "address payable"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                },
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 120,
                              "type": "function (address,address,uint256,uint256)",
                              "value": "TrusteeVerified"
                            },
                            "id": 325,
                            "name": "Identifier",
                            "src": "3929:15:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 326,
                                "name": "Identifier",
                                "src": "3959:3:3"
                              }
                            ],
                            "id": 327,
                            "name": "MemberAccess",
                            "src": "3959:10:3"
                          },
                          {
                            "attributes": {
                              "arguments": [
                                null
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "tryCall": false,
                              "type": "address",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    null
                                  ],
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "owner",
                                  "referencedDeclaration": 602,
                                  "type": "function () view external returns (address)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -28,
                                      "type": "contract Recovery",
                                      "value": "this"
                                    },
                                    "id": 328,
                                    "name": "Identifier",
                                    "src": "3984:4:3"
                                  }
                                ],
                                "id": 329,
                                "name": "MemberAccess",
                                "src": "3984:10:3"
                              }
                            ],
                            "id": 330,
                            "name": "FunctionCall",
                            "src": "3984:12:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 96,
                              "type": "uint256",
                              "value": "currentChange"
                            },
                            "id": 331,
                            "name": "Identifier",
                            "src": "4011:13:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "number",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -4,
                                  "type": "block",
                                  "value": "block"
                                },
                                "id": 332,
                                "name": "Identifier",
                                "src": "4039:5:3"
                              }
                            ],
                            "id": 333,
                            "name": "MemberAccess",
                            "src": "4039:12:3"
                          }
                        ],
                        "id": 334,
                        "name": "FunctionCall",
                        "src": "3929:133:3"
                      }
                    ],
                    "id": 335,
                    "name": "EmitStatement",
                    "src": "3924:138:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 96,
                              "type": "uint256",
                              "value": "currentChange"
                            },
                            "id": 336,
                            "name": "Identifier",
                            "src": "4073:13:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "number",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -4,
                                  "type": "block",
                                  "value": "block"
                                },
                                "id": 337,
                                "name": "Identifier",
                                "src": "4089:5:3"
                              }
                            ],
                            "id": 338,
                            "name": "MemberAccess",
                            "src": "4089:12:3"
                          }
                        ],
                        "id": 339,
                        "name": "Assignment",
                        "src": "4073:28:3"
                      }
                    ],
                    "id": 340,
                    "name": "ExpressionStatement",
                    "src": "4073:28:3"
                  }
                ],
                "id": 341,
                "name": "Block",
                "src": "3749:360:3"
              }
            ],
            "id": 342,
            "name": "FunctionDefinition",
            "src": "3716:393:3"
          },
          {
            "attributes": {
              "functionSelector": "6fa0245d",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "name": "sendShardToShardOwner",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_shardOwner",
                      "scope": 366,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 343,
                        "name": "ElementaryTypeName",
                        "src": "4148:7:3"
                      }
                    ],
                    "id": 344,
                    "name": "VariableDeclaration",
                    "src": "4148:19:3"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_shardURI",
                      "scope": 366,
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "type": "string",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string"
                        },
                        "id": 345,
                        "name": "ElementaryTypeName",
                        "src": "4169:6:3"
                      }
                    ],
                    "id": 346,
                    "name": "VariableDeclaration",
                    "src": "4169:23:3"
                  }
                ],
                "id": 347,
                "name": "ParameterList",
                "src": "4147:46:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 350,
                "name": "ParameterList",
                "src": "4234:0:3"
              },
              {
                "attributes": {},
                "children": [
                  {
                    "attributes": {
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 616,
                      "type": "modifier ()",
                      "value": "onlyOwner"
                    },
                    "id": 348,
                    "name": "Identifier",
                    "src": "4219:9:3"
                  }
                ],
                "id": 349,
                "name": "ModifierInvocation",
                "src": "4219:9:3"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_101aeacf41d51be67b6c17151e06445f89226bbd438de22570fc91c9a87ae411",
                                  "typeString": "literal_string \"Not a valid Trustee\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 351,
                            "name": "Identifier",
                            "src": "4319:7:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 82,
                                  "type": "mapping(address => bool)",
                                  "value": "shardHolders"
                                },
                                "id": 352,
                                "name": "Identifier",
                                "src": "4327:12:3"
                              },
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 344,
                                  "type": "address",
                                  "value": "_shardOwner"
                                },
                                "id": 353,
                                "name": "Identifier",
                                "src": "4340:11:3"
                              }
                            ],
                            "id": 354,
                            "name": "IndexAccess",
                            "src": "4327:25:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "4e6f7420612076616c69642054727573746565",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "string",
                              "type": "literal_string \"Not a valid Trustee\"",
                              "value": "Not a valid Trustee"
                            },
                            "id": 355,
                            "name": "Literal",
                            "src": "4354:21:3"
                          }
                        ],
                        "id": 356,
                        "name": "FunctionCall",
                        "src": "4319:57:3"
                      }
                    ],
                    "id": 357,
                    "name": "ExpressionStatement",
                    "src": "4319:57:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "uint256",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "distributeShard",
                              "referencedDeclaration": 556,
                              "type": "function (address,string memory) external returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 110,
                                  "type": "contract ShardNFT",
                                  "value": "nftContract"
                                },
                                "id": 358,
                                "name": "Identifier",
                                "src": "4387:11:3"
                              }
                            ],
                            "id": 360,
                            "name": "MemberAccess",
                            "src": "4387:27:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 344,
                              "type": "address",
                              "value": "_shardOwner"
                            },
                            "id": 361,
                            "name": "Identifier",
                            "src": "4415:11:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 346,
                              "type": "string memory",
                              "value": "_shardURI"
                            },
                            "id": 362,
                            "name": "Identifier",
                            "src": "4428:9:3"
                          }
                        ],
                        "id": 363,
                        "name": "FunctionCall",
                        "src": "4387:51:3"
                      }
                    ],
                    "id": 364,
                    "name": "ExpressionStatement",
                    "src": "4387:51:3"
                  }
                ],
                "id": 365,
                "name": "Block",
                "src": "4234:212:3"
              }
            ],
            "id": 366,
            "name": "FunctionDefinition",
            "src": "4117:329:3"
          },
          {
            "attributes": {
              "functionSelector": "21668dd4",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "triggerRecoveryEvent",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "text": " Trigger Recovery Event\n Triggering the recovery event will send a recovery NFT to the addresses of the token holders\n Any of the shard owners can trigger this event"
                },
                "id": 367,
                "name": "StructuredDocumentation",
                "src": "4454:207:3"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_payloadURI",
                      "scope": 428,
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "type": "string",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string"
                        },
                        "id": 368,
                        "name": "ElementaryTypeName",
                        "src": "4697:6:3"
                      }
                    ],
                    "id": 369,
                    "name": "VariableDeclaration",
                    "src": "4697:25:3"
                  }
                ],
                "id": 370,
                "name": "ParameterList",
                "src": "4696:27:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 371,
                "name": "ParameterList",
                "src": "4731:0:3"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_101aeacf41d51be67b6c17151e06445f89226bbd438de22570fc91c9a87ae411",
                                  "typeString": "literal_string \"Not a valid Trustee\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 372,
                            "name": "Identifier",
                            "src": "4742:7:3"
                          },
                          {
                            "attributes": {
                              "commonType": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "&&",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 82,
                                      "type": "mapping(address => bool)",
                                      "value": "shardHolders"
                                    },
                                    "id": 373,
                                    "name": "Identifier",
                                    "src": "4764:12:3"
                                  },
                                  {
                                    "attributes": {
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "sender",
                                      "type": "address payable"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": -15,
                                          "type": "msg",
                                          "value": "msg"
                                        },
                                        "id": 374,
                                        "name": "Identifier",
                                        "src": "4777:3:3"
                                      }
                                    ],
                                    "id": 375,
                                    "name": "MemberAccess",
                                    "src": "4777:10:3"
                                  }
                                ],
                                "id": 376,
                                "name": "IndexAccess",
                                "src": "4764:24:3"
                              },
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "operator": "!",
                                  "prefix": true,
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "type": "bool"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 86,
                                          "type": "mapping(address => bool)",
                                          "value": "blacklisted"
                                        },
                                        "id": 377,
                                        "name": "Identifier",
                                        "src": "4793:11:3"
                                      },
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "lValueRequested": false,
                                          "member_name": "sender",
                                          "type": "address payable"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": -15,
                                              "type": "msg",
                                              "value": "msg"
                                            },
                                            "id": 378,
                                            "name": "Identifier",
                                            "src": "4805:3:3"
                                          }
                                        ],
                                        "id": 379,
                                        "name": "MemberAccess",
                                        "src": "4805:10:3"
                                      }
                                    ],
                                    "id": 380,
                                    "name": "IndexAccess",
                                    "src": "4793:23:3"
                                  }
                                ],
                                "id": 381,
                                "name": "UnaryOperation",
                                "src": "4792:24:3"
                              }
                            ],
                            "id": 382,
                            "name": "BinaryOperation",
                            "src": "4764:52:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "4e6f7420612076616c69642054727573746565",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "string",
                              "type": "literal_string \"Not a valid Trustee\"",
                              "value": "Not a valid Trustee"
                            },
                            "id": 383,
                            "name": "Literal",
                            "src": "4831:21:3"
                          }
                        ],
                        "id": 384,
                        "name": "FunctionCall",
                        "src": "4742:121:3"
                      }
                    ],
                    "id": 385,
                    "name": "ExpressionStatement",
                    "src": "4742:121:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "address"
                        },
                        "children": [
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 106,
                              "type": "address",
                              "value": "trusteeTriggeredRecovery"
                            },
                            "id": 386,
                            "name": "Identifier",
                            "src": "4874:24:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "sender",
                              "type": "address payable"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -15,
                                  "type": "msg",
                                  "value": "msg"
                                },
                                "id": 387,
                                "name": "Identifier",
                                "src": "4901:3:3"
                              }
                            ],
                            "id": 388,
                            "name": "MemberAccess",
                            "src": "4901:10:3"
                          }
                        ],
                        "id": 389,
                        "name": "Assignment",
                        "src": "4874:37:3"
                      }
                    ],
                    "id": 390,
                    "name": "ExpressionStatement",
                    "src": "4874:37:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "assignments": [
                            392
                          ]
                        },
                        "children": [
                          {
                            "attributes": {
                              "constant": false,
                              "mutability": "mutable",
                              "name": "j",
                              "scope": 426,
                              "stateVariable": false,
                              "storageLocation": "default",
                              "type": "uint8",
                              "visibility": "internal"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "name": "uint8",
                                  "type": "uint8"
                                },
                                "id": 391,
                                "name": "ElementaryTypeName",
                                "src": "5253:5:3"
                              }
                            ],
                            "id": 392,
                            "name": "VariableDeclaration",
                            "src": "5253:7:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "30",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "number",
                              "type": "int_const 0",
                              "value": "0"
                            },
                            "id": 393,
                            "name": "Literal",
                            "src": "5263:1:3"
                          }
                        ],
                        "id": 394,
                        "name": "VariableDeclarationStatement",
                        "src": "5253:11:3"
                      },
                      {
                        "attributes": {
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "<",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 392,
                              "type": "uint8",
                              "value": "j"
                            },
                            "id": 395,
                            "name": "Identifier",
                            "src": "5266:1:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "length",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 99,
                                  "type": "address[] storage ref",
                                  "value": "trustees"
                                },
                                "id": 396,
                                "name": "Identifier",
                                "src": "5270:8:3"
                              }
                            ],
                            "id": 397,
                            "name": "MemberAccess",
                            "src": "5270:15:3"
                          }
                        ],
                        "id": 398,
                        "name": "BinaryOperation",
                        "src": "5266:19:3"
                      },
                      {
                        "children": [
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "++",
                              "prefix": false,
                              "type": "uint8"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 392,
                                  "type": "uint8",
                                  "value": "j"
                                },
                                "id": 399,
                                "name": "Identifier",
                                "src": "5287:1:3"
                              }
                            ],
                            "id": 400,
                            "name": "UnaryOperation",
                            "src": "5287:3:3"
                          }
                        ],
                        "id": 401,
                        "name": "ExpressionStatement",
                        "src": "5287:3:3"
                      },
                      {
                        "children": [
                          {
                            "attributes": {},
                            "children": [
                              {
                                "attributes": {
                                  "commonType": {
                                    "typeIdentifier": "t_bool",
                                    "typeString": "bool"
                                  },
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "operator": "&&",
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "type": "bool"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 82,
                                          "type": "mapping(address => bool)",
                                          "value": "shardHolders"
                                        },
                                        "id": 402,
                                        "name": "Identifier",
                                        "src": "5395:12:3"
                                      },
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": true,
                                          "isPure": false,
                                          "lValueRequested": false,
                                          "type": "address"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 99,
                                              "type": "address[] storage ref",
                                              "value": "trustees"
                                            },
                                            "id": 403,
                                            "name": "Identifier",
                                            "src": "5408:8:3"
                                          },
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 392,
                                              "type": "uint8",
                                              "value": "j"
                                            },
                                            "id": 404,
                                            "name": "Identifier",
                                            "src": "5417:1:3"
                                          }
                                        ],
                                        "id": 405,
                                        "name": "IndexAccess",
                                        "src": "5408:11:3"
                                      }
                                    ],
                                    "id": 406,
                                    "name": "IndexAccess",
                                    "src": "5395:25:3"
                                  },
                                  {
                                    "attributes": {
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "operator": "!",
                                      "prefix": true,
                                      "type": "bool"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": true,
                                          "isPure": false,
                                          "lValueRequested": false,
                                          "type": "bool"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 86,
                                              "type": "mapping(address => bool)",
                                              "value": "blacklisted"
                                            },
                                            "id": 407,
                                            "name": "Identifier",
                                            "src": "5425:11:3"
                                          },
                                          {
                                            "attributes": {
                                              "isConstant": false,
                                              "isLValue": true,
                                              "isPure": false,
                                              "lValueRequested": false,
                                              "type": "address"
                                            },
                                            "children": [
                                              {
                                                "attributes": {
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 99,
                                                  "type": "address[] storage ref",
                                                  "value": "trustees"
                                                },
                                                "id": 408,
                                                "name": "Identifier",
                                                "src": "5437:8:3"
                                              },
                                              {
                                                "attributes": {
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 392,
                                                  "type": "uint8",
                                                  "value": "j"
                                                },
                                                "id": 409,
                                                "name": "Identifier",
                                                "src": "5446:1:3"
                                              }
                                            ],
                                            "id": 410,
                                            "name": "IndexAccess",
                                            "src": "5437:11:3"
                                          }
                                        ],
                                        "id": 411,
                                        "name": "IndexAccess",
                                        "src": "5425:24:3"
                                      }
                                    ],
                                    "id": 412,
                                    "name": "UnaryOperation",
                                    "src": "5424:25:3"
                                  }
                                ],
                                "id": 413,
                                "name": "BinaryOperation",
                                "src": "5395:54:3"
                              },
                              {
                                "children": [
                                  {
                                    "children": [
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "isStructConstructorCall": false,
                                          "lValueRequested": false,
                                          "names": [
                                            null
                                          ],
                                          "tryCall": false,
                                          "type": "uint256",
                                          "type_conversion": false
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "argumentTypes": [
                                                {
                                                  "typeIdentifier": "t_address",
                                                  "typeString": "address"
                                                },
                                                {
                                                  "typeIdentifier": "t_string_memory_ptr",
                                                  "typeString": "string memory"
                                                }
                                              ],
                                              "isConstant": false,
                                              "isLValue": false,
                                              "isPure": false,
                                              "lValueRequested": false,
                                              "member_name": "distributeShard",
                                              "referencedDeclaration": 556,
                                              "type": "function (address,string memory) external returns (uint256)"
                                            },
                                            "children": [
                                              {
                                                "attributes": {
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 110,
                                                  "type": "contract ShardNFT",
                                                  "value": "nftContract"
                                                },
                                                "id": 414,
                                                "name": "Identifier",
                                                "src": "5552:11:3"
                                              }
                                            ],
                                            "id": 416,
                                            "name": "MemberAccess",
                                            "src": "5552:27:3"
                                          },
                                          {
                                            "attributes": {
                                              "isConstant": false,
                                              "isLValue": true,
                                              "isPure": false,
                                              "lValueRequested": false,
                                              "type": "address"
                                            },
                                            "children": [
                                              {
                                                "attributes": {
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 99,
                                                  "type": "address[] storage ref",
                                                  "value": "trustees"
                                                },
                                                "id": 417,
                                                "name": "Identifier",
                                                "src": "5580:8:3"
                                              },
                                              {
                                                "attributes": {
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 392,
                                                  "type": "uint8",
                                                  "value": "j"
                                                },
                                                "id": 418,
                                                "name": "Identifier",
                                                "src": "5589:1:3"
                                              }
                                            ],
                                            "id": 419,
                                            "name": "IndexAccess",
                                            "src": "5580:11:3"
                                          },
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 369,
                                              "type": "string memory",
                                              "value": "_payloadURI"
                                            },
                                            "id": 420,
                                            "name": "Identifier",
                                            "src": "5593:11:3"
                                          }
                                        ],
                                        "id": 421,
                                        "name": "FunctionCall",
                                        "src": "5552:53:3"
                                      }
                                    ],
                                    "id": 422,
                                    "name": "ExpressionStatement",
                                    "src": "5552:53:3"
                                  }
                                ],
                                "id": 423,
                                "name": "Block",
                                "src": "5451:170:3"
                              }
                            ],
                            "id": 424,
                            "name": "IfStatement",
                            "src": "5391:230:3"
                          }
                        ],
                        "id": 425,
                        "name": "Block",
                        "src": "5292:340:3"
                      }
                    ],
                    "id": 426,
                    "name": "ForStatement",
                    "src": "5248:384:3"
                  }
                ],
                "id": 427,
                "name": "Block",
                "src": "4731:908:3"
              }
            ],
            "id": 428,
            "name": "FunctionDefinition",
            "src": "4667:972:3"
          },
          {
            "attributes": {
              "functionSelector": "9bcfb6f9",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "modifiers": [
                null
              ],
              "name": "sendShardToRecoveryInitialiser",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_payloadURI",
                      "scope": 465,
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "type": "string",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string"
                        },
                        "id": 429,
                        "name": "ElementaryTypeName",
                        "src": "5687:6:3"
                      }
                    ],
                    "id": 430,
                    "name": "VariableDeclaration",
                    "src": "5687:25:3"
                  }
                ],
                "id": 431,
                "name": "ParameterList",
                "src": "5686:27:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 432,
                "name": "ParameterList",
                "src": "5721:0:3"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_60e08222d8ff7a8f47e8e3b8a92c80617e4094aea254e2effb7800669f8f2b95",
                                  "typeString": "literal_string \"Recovery not yet initialised\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 433,
                            "name": "Identifier",
                            "src": "5732:7:3"
                          },
                          {
                            "attributes": {
                              "commonType": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "!=",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 106,
                                  "type": "address",
                                  "value": "trusteeTriggeredRecovery"
                                },
                                "id": 434,
                                "name": "Identifier",
                                "src": "5754:24:3"
                              },
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "isStructConstructorCall": false,
                                  "lValueRequested": false,
                                  "names": [
                                    null
                                  ],
                                  "tryCall": false,
                                  "type": "address payable",
                                  "type_conversion": true
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": [
                                        {
                                          "typeIdentifier": "t_rational_0_by_1",
                                          "typeString": "int_const 0"
                                        }
                                      ],
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "type": "type(address)"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "name": "address"
                                        },
                                        "id": 435,
                                        "name": "ElementaryTypeName",
                                        "src": "5782:7:3"
                                      }
                                    ],
                                    "id": 436,
                                    "name": "ElementaryTypeNameExpression",
                                    "src": "5782:7:3"
                                  },
                                  {
                                    "attributes": {
                                      "hexvalue": "30",
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "token": "number",
                                      "type": "int_const 0",
                                      "value": "0"
                                    },
                                    "id": 437,
                                    "name": "Literal",
                                    "src": "5790:1:3"
                                  }
                                ],
                                "id": 438,
                                "name": "FunctionCall",
                                "src": "5782:10:3"
                              }
                            ],
                            "id": 439,
                            "name": "BinaryOperation",
                            "src": "5754:38:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "5265636f76657279206e6f742079657420696e697469616c69736564",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "string",
                              "type": "literal_string \"Recovery not yet initialised\"",
                              "value": "Recovery not yet initialised"
                            },
                            "id": 440,
                            "name": "Literal",
                            "src": "5807:30:3"
                          }
                        ],
                        "id": 441,
                        "name": "FunctionCall",
                        "src": "5732:116:3"
                      }
                    ],
                    "id": 442,
                    "name": "ExpressionStatement",
                    "src": "5732:116:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                },
                                {
                                  "typeIdentifier": "t_stringliteral_101aeacf41d51be67b6c17151e06445f89226bbd438de22570fc91c9a87ae411",
                                  "typeString": "literal_string \"Not a valid Trustee\""
                                }
                              ],
                              "overloadedDeclarations": [
                                -18,
                                -18
                              ],
                              "referencedDeclaration": -18,
                              "type": "function (bool,string memory) pure",
                              "value": "require"
                            },
                            "id": 443,
                            "name": "Identifier",
                            "src": "5859:7:3"
                          },
                          {
                            "attributes": {
                              "commonType": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "&&",
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 82,
                                      "type": "mapping(address => bool)",
                                      "value": "shardHolders"
                                    },
                                    "id": 444,
                                    "name": "Identifier",
                                    "src": "5881:12:3"
                                  },
                                  {
                                    "attributes": {
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "sender",
                                      "type": "address payable"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": -15,
                                          "type": "msg",
                                          "value": "msg"
                                        },
                                        "id": 445,
                                        "name": "Identifier",
                                        "src": "5894:3:3"
                                      }
                                    ],
                                    "id": 446,
                                    "name": "MemberAccess",
                                    "src": "5894:10:3"
                                  }
                                ],
                                "id": 447,
                                "name": "IndexAccess",
                                "src": "5881:24:3"
                              },
                              {
                                "attributes": {
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "operator": "!",
                                  "prefix": true,
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "type": "bool"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 86,
                                          "type": "mapping(address => bool)",
                                          "value": "blacklisted"
                                        },
                                        "id": 448,
                                        "name": "Identifier",
                                        "src": "5910:11:3"
                                      },
                                      {
                                        "attributes": {
                                          "isConstant": false,
                                          "isLValue": false,
                                          "isPure": false,
                                          "lValueRequested": false,
                                          "member_name": "sender",
                                          "type": "address payable"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": -15,
                                              "type": "msg",
                                              "value": "msg"
                                            },
                                            "id": 449,
                                            "name": "Identifier",
                                            "src": "5922:3:3"
                                          }
                                        ],
                                        "id": 450,
                                        "name": "MemberAccess",
                                        "src": "5922:10:3"
                                      }
                                    ],
                                    "id": 451,
                                    "name": "IndexAccess",
                                    "src": "5910:23:3"
                                  }
                                ],
                                "id": 452,
                                "name": "UnaryOperation",
                                "src": "5909:24:3"
                              }
                            ],
                            "id": 453,
                            "name": "BinaryOperation",
                            "src": "5881:52:3"
                          },
                          {
                            "attributes": {
                              "hexvalue": "4e6f7420612076616c69642054727573746565",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "token": "string",
                              "type": "literal_string \"Not a valid Trustee\"",
                              "value": "Not a valid Trustee"
                            },
                            "id": 454,
                            "name": "Literal",
                            "src": "5948:21:3"
                          }
                        ],
                        "id": 455,
                        "name": "FunctionCall",
                        "src": "5859:121:3"
                      }
                    ],
                    "id": 456,
                    "name": "ExpressionStatement",
                    "src": "5859:121:3"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "uint256",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "distributeShard",
                              "referencedDeclaration": 556,
                              "type": "function (address,string memory) external returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 110,
                                  "type": "contract ShardNFT",
                                  "value": "nftContract"
                                },
                                "id": 457,
                                "name": "Identifier",
                                "src": "6065:11:3"
                              }
                            ],
                            "id": 459,
                            "name": "MemberAccess",
                            "src": "6065:27:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 106,
                              "type": "address",
                              "value": "trusteeTriggeredRecovery"
                            },
                            "id": 460,
                            "name": "Identifier",
                            "src": "6093:24:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 430,
                              "type": "string memory",
                              "value": "_payloadURI"
                            },
                            "id": 461,
                            "name": "Identifier",
                            "src": "6119:11:3"
                          }
                        ],
                        "id": 462,
                        "name": "FunctionCall",
                        "src": "6065:66:3"
                      }
                    ],
                    "id": 463,
                    "name": "ExpressionStatement",
                    "src": "6065:66:3"
                  }
                ],
                "id": 464,
                "name": "Block",
                "src": "5721:418:3"
              }
            ],
            "id": 465,
            "name": "FunctionDefinition",
            "src": "5647:492:3"
          },
          {
            "attributes": {
              "functionSelector": "c6ea0067",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "name": "destroyShardContract",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "text": " Destroy Shard contract"
                },
                "id": 466,
                "name": "StructuredDocumentation",
                "src": "6147:43:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 467,
                "name": "ParameterList",
                "src": "6225:2:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 470,
                "name": "ParameterList",
                "src": "6245:0:3"
              },
              {
                "attributes": {},
                "children": [
                  {
                    "attributes": {
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 616,
                      "type": "modifier ()",
                      "value": "onlyOwner"
                    },
                    "id": 468,
                    "name": "Identifier",
                    "src": "6235:9:3"
                  }
                ],
                "id": 469,
                "name": "ModifierInvocation",
                "src": "6235:9:3"
              },
              {
                "attributes": {
                  "statements": [
                    null
                  ]
                },
                "children": [],
                "id": 471,
                "name": "Block",
                "src": "6245:2:3"
              }
            ],
            "id": 472,
            "name": "FunctionDefinition",
            "src": "6196:51:3"
          },
          {
            "attributes": {
              "functionSelector": "5df6849d",
              "implemented": true,
              "isConstructor": false,
              "kind": "function",
              "name": "transferRecoveryOwnership",
              "scope": 496,
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_newOwner",
                      "scope": 495,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 473,
                        "name": "ElementaryTypeName",
                        "src": "6290:7:3"
                      }
                    ],
                    "id": 474,
                    "name": "VariableDeclaration",
                    "src": "6290:17:3"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "mutability": "mutable",
                      "name": "_currentOwner",
                      "scope": 495,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "stateMutability": "nonpayable",
                          "type": "address"
                        },
                        "id": 475,
                        "name": "ElementaryTypeName",
                        "src": "6309:7:3"
                      }
                    ],
                    "id": 476,
                    "name": "VariableDeclaration",
                    "src": "6309:21:3"
                  }
                ],
                "id": 477,
                "name": "ParameterList",
                "src": "6289:42:3"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 480,
                "name": "ParameterList",
                "src": "6372:0:3"
              },
              {
                "attributes": {},
                "children": [
                  {
                    "attributes": {
                      "overloadedDeclarations": [
                        null
                      ],
                      "referencedDeclaration": 616,
                      "type": "modifier ()",
                      "value": "onlyOwner"
                    },
                    "id": 478,
                    "name": "Identifier",
                    "src": "6357:9:3"
                  }
                ],
                "id": 479,
                "name": "ModifierInvocation",
                "src": "6357:9:3"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "tryCall": false,
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "setNewContractOwner",
                              "referencedDeclaration": 51,
                              "type": "function (address,address,address) external"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 108,
                                  "type": "contract IShardManager",
                                  "value": "parentContract"
                                },
                                "id": 481,
                                "name": "Identifier",
                                "src": "6383:14:3"
                              }
                            ],
                            "id": 483,
                            "name": "MemberAccess",
                            "src": "6383:34:3"
                          },
                          {
                            "attributes": {
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 474,
                              "type": "address",
                              "value": "_newOwner"
                            },
                            "id": 484,
                            "name": "Identifier",
                            "src": "6432:9:3"
                          },
                          {
                            "attributes": {
                              "arguments": [
                                null
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "tryCall": false,
                              "type": "address",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    null
                                  ],
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "owner",
                                  "referencedDeclaration": 602,
                                  "type": "function () view external returns (address)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": -28,
                                      "type": "contract Recovery",
                                      "value": "this"
                                    },
                                    "id": 485,
                                    "name": "Identifier",
                                    "src": "6456:4:3"
                                  }
                                ],
                                "id": 486,
                                "name": "MemberAccess",
                                "src": "6456:10:3"
                              }
                            ],
                            "id": 487,
                            "name": "FunctionCall",
                            "src": "6456:12:3"
                          },
                          {
                            "attributes": {
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "tryCall": false,
                              "type": "address",
                              "type_conversion": true
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_contract$_Recovery_$496",
                                      "typeString": "contract Recovery"
                                    }
                                  ],
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "type": "type(address)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "name": "address"
                                    },
                                    "id": 488,
                                    "name": "ElementaryTypeName",
                                    "src": "6483:7:3"
                                  }
                                ],
                                "id": 489,
                                "name": "ElementaryTypeNameExpression",
                                "src": "6483:7:3"
                              },
                              {
                                "attributes": {
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": -28,
                                  "type": "contract Recovery",
                                  "value": "this"
                                },
                                "id": 490,
                                "name": "Identifier",
                                "src": "6491:4:3"
                              }
                            ],
                            "id": 491,
                            "name": "FunctionCall",
                            "src": "6483:13:3"
                          }
                        ],
                        "id": 492,
                        "name": "FunctionCall",
                        "src": "6383:124:3"
                      }
                    ],
                    "id": 493,
                    "name": "ExpressionStatement",
                    "src": "6383:124:3"
                  }
                ],
                "id": 494,
                "name": "Block",
                "src": "6372:143:3"
              }
            ],
            "id": 495,
            "name": "FunctionDefinition",
            "src": "6255:260:3"
          }
        ],
        "id": 496,
        "name": "ContractDefinition",
        "src": "209:6309:3"
      }
    ],
    "id": 497,
    "name": "SourceUnit",
    "src": "40:6480:3"
  },
  "compiler": {
    "name": "solc",
    "version": "0.7.4+commit.3f05b770.Emscripten.clang"
  },
  "networks": {
    "5777": {
      "events": {
        "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        "0x85e4d3364d0d7f8e8f6d87d34c760edf85ccaae91cf3ca04c60c9924f3463cb9": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "previousChange",
              "type": "uint256"
            }
          ],
          "name": "TrusteeAdded",
          "type": "event"
        },
        "0x19a67108cdc6ba4d7a3b8dbbb34ff36b3def77fcf222e93968c6e60e41565a31": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "previousChange",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "currentBlock",
              "type": "uint256"
            }
          ],
          "name": "TrusteeVerified",
          "type": "event"
        }
      },
      "links": {},
      "address": "0xF73CBBa1a8619A81B900eA734DE0496487b29a49",
      "transactionHash": "0x68ff47b4e06495e81aab528c818961b069524ed0cd8e1c102f5a09949396d71f"
    }
  },
  "schemaVersion": "3.3.4",
  "updatedAt": "2021-03-15T12:10:29.712Z",
  "devdoc": {
    "kind": "dev",
    "methods": {
      "owner()": {
        "details": "Returns the address of the current owner."
      },
      "renounceOwnership()": {
        "details": "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."
      },
      "transferOwnership(address)": {
        "details": "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."
      }
    },
    "version": 1
  },
  "userdoc": {
    "kind": "user",
    "methods": {
      "confirmTrustee()": {
        "notice": "Confirm Trustee"
      },
      "destroyShardContract()": {
        "notice": "Destroy Shard contract"
      },
      "triggerRecoveryEvent(string)": {
        "notice": "Trigger Recovery Event Triggering the recovery event will send a recovery NFT to the addresses of the token holders Any of the shard owners can trigger this event"
      }
    },
    "version": 1
  }
}

async function test(){
  try{
    var count = await web3.eth.getTransactionCount(addressFrom);
    var contractAddress = recoveryContractAddress;
    var contract = new web3.eth.Contract(abi.abi, contractAddress);
    var method = contract.methods.sendShardToShardOwner(addressTo, "QmbSo373odJ8HosMNYgsFGw5bfkKrG5GhkZwJX9KYNL4zu").encodeABI();

    // web3 encode function call
    var functionCall = web3.eth.abi.encodeFunctionCall({
      name:"sendShardToShardOwner",
      type:"function",
      inputs:[
        {
          type:"address",
          name:"_shardOwner"
        },
        {
          type:"string",
          name:"_shardURI"
        }
      ]
    },
      [addressTo, "QmbSo373odJ8HosMNYgsFGw5bfkKrG5GhkZwJX9KYNL4zu"]
    );
    console.log(functionCall);
    console.log(functionCall === method);

   

    console.log(method);

    const common = new Common.default.forCustomChain(
      "mainnet",
      {
          name:"custom",
          networkId: "0x1691",
          chainId: "0x539",
      },
      "petersburg"
  );

    var tx = new Tx.Transaction({
      nonce: count,
      gasPrice: "0x20",
      gasLimit: "0x100000",
      to: recoveryContractAddress,
      value: "0x0",
      data: method,
    }, {common});
    let privKeyBuff = Buffer.from(privateKey, "hex")
    tx.sign(privKeyBuff)

    var raw = "0x" + tx.serialize().toString("hex")
    console.log(raw)
    web3.eth.sendSignedTransaction(raw, function(err, transactionHash){
      if (err){
        console.log(err); return;
      } else{
        console.log("TransactionHash" + transactionHash);
      }
    })
  } catch (e){
    console.log(e)
  }
    // create and sign the transaction manually from here!

    // contract.methods.sendShardToShardOwner("QmbSo373odJ8HosMNYgsFGw5bfkKrG5GhkZwJX9KYNL4zu", addressTo).send({from:addressFrom, gas: 10000000}, function(error, txHash){
    //     console.log(txHash);

    //     if(error){
    //         console.log(error)
    //     }
    // });
}

test();


