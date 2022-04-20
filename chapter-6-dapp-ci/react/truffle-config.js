const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider'); 
require('dotenv').config(); 

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "1337",       // Any network (default: none)
     },
  },
  mocha: {
  },
  compilers: {
    solc: {
      version: "0.8.13",
    }
  },
};
