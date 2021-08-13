require("dotenv").config();
const { utils } = require("ethers");
const fs = require("fs");
const chalk = require("chalk");

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");

module.exports = { solidity: "0.8.7" };

const { ETHERSCAN_API_KEY, INFURA_API_KEY, PRIVATE_KEY } = process.env;

const defaultNetwork = "localhost";

module.exports = {
  defaultNetwork,
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    matic: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
