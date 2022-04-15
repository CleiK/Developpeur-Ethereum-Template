var Web3 = require('web3');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

provider = new HDWalletProvider(`${process.env.MNEMONIC}`, `http://127.0.0.1:8545`)

web3 = new Web3(provider);


var abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_data",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "dataStored",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
var addr = "0x9B0fe440b9AE3848Be3C74963478f1deb8A17EB8";
var Contract = new web3.eth.Contract(abi, addr);


Contract.methods.get().call().then(console.log);

Contract.methods.set(5).send({ from: "0x351F66f17e1E3f95335fc07E8A328175C0f8C19c" }).then(() => {
    Contract.methods.get().call().then(console.log);
});

