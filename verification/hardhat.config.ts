import '@nomicfoundation/hardhat-chai-matchers';
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import '@nomiclabs/hardhat-truffle5';
import '@typechain/hardhat';
import "dotenv/config";
import { HardhatUserConfig, task } from "hardhat/config";
const intercept = require('intercept-stdout');
const { PRIVATE_KEY, FLARESCAN_API_KEY, FLARE_EXPLORER_API_KEY, FLARE_RPC_API_KEY } = process.env;


import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';

// Override solc compile task and filter out useless warnings
task(TASK_COMPILE)
  .setAction(async (args, hre, runSuper) => {
    intercept((text: any) => {
      if (/MockContract.sol/.test(text) && text.match(/Warning: SPDX license identifier not provided in source file/)) return '';
      if (/MockContract.sol/.test(text) &&
        /Warning: This contract has a payable fallback function, but no receive ether function/.test(text)) return '';
      return text;
    });
    await runSuper(args);
  });


const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          evmVersion: "london",
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
    overrides: {
      "contracts/Imports060.sol": {
        version: "0.6.6",
        settings: {
        }
      },
      "@gnosis.pm/mock-contract/contracts/MockContract.sol": {
        version: "0.6.6",
        settings: {
        }
      },
    }
  },
  networks: {
    
    coston2: {
      url: "https://coston2-api.flare.network/ext/C/rpc" + (FLARE_RPC_API_KEY ? `?x-apikey=${FLARE_RPC_API_KEY}` : ""),
      accounts: [`${PRIVATE_KEY}`],
      chainId: 114,
      gas: 1000000,
    },
  },
  etherscan: {
    apiKey: {
      "coston2": `${FLARESCAN_API_KEY}`,
    },
    customChains: [
      {
        network: "coston2",
        chainId: 114,
        urls: {
          // faucet: https://coston2-faucet.towolabs.com/
          apiURL: "https://coston2-explorer.flare.network/api" + (FLARE_EXPLORER_API_KEY ? `?x-apikey=${FLARE_EXPLORER_API_KEY}` : ""), // Must not have / endpoint
          browserURL: "https://coston2-explorer.flare.network"
        }
      },
    ]
  },
  paths: {
    sources: "./contracts/",
    tests: "./test/",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  typechain: {
    target: 'truffle-v5',
  },
};

export default config;