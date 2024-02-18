import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  // networks: {
  //   hardhat: {},
  //   fuji: {
  //     url: "https://api.avax-test.network/ext/bc/C/rpc",
  //     //@ts-ignore
  //     accounts: [process.env.PRIVATEKEY],
  //   },
  // },
  // etherscan: {
  //   apiKey: {
  //     fuji: "avascan", // apiKey is not required, just set a placeholder
  //   },
  //   customChains: [
  //     {
  //       network: "fuji",
  //       chainId: 43113,
  //       urls: {
  //         apiURL:
  //           "https://api.avascan.info/v2/network/testnet/evm/43113/etherscan",
  //         browserURL: "https://testnet.avascan.info/blockchain/c",
  //       },
  //     },
  //   ],
  // },
};

export default config;
