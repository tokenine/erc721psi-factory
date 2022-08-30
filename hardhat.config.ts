import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'dotenv/config';

const networkName = process.env.HARDHAT_NETWORK || process.argv[process.argv.indexOf("--network") + 1] || "";
const EXPLORER_API_KEYS: any = JSON.parse(process.env.EXPLORER_API_KEYS || "{}");

console.log("EXPLORER_API_KEYS[networkName]", networkName, EXPLORER_API_KEYS[networkName])

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ],
    
  },
  networks: {
    "bsc-testnet": {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts:
        process.env.SERVICE_PRIVATE_KEY !== undefined ? [process.env.SERVICE_PRIVATE_KEY] : [],
    },
    "polygon-testnet-mumbai": {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts:
        process.env.SERVICE_PRIVATE_KEY !== undefined ? [process.env.SERVICE_PRIVATE_KEY] : [],
    }
  },
  etherscan: {
    apiKey: 
      EXPLORER_API_KEYS[networkName]
    // { polygonMumbai: "RKS9JJSB1395ABZH37AXVEZJR1QYC5GBXM" }
  },
};

export default config;
