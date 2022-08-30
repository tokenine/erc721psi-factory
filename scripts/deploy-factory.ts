import { ethers, run } from "hardhat";

import * as fs from "fs";
import * as path from "path";
import Axios from "axios";


interface ContractComponents {
  address: string,
  abi: any,
  bytecode?: string
}

async function main() {
  const contractFilename = "Factory-721PSI-v1.sol";
  const contractName = "EventNFT";
  const contractFactory = await ethers.getContractFactory(contractName);
  const { bytecode } = contractFactory;
  const abi = await loadContractABIfromArtifact(contractFilename, contractName);
  let address;

  try {    
    const contract = await contractFactory.deploy();
    address = contract.address;
    await contract.deployed();

  } catch (e: any) {
    return;
  }

  try {
    console.log(`New Event NFT contract has deployed to ${address}`);
  
    const verify = await run("verify:verify", {
      address,
      constructorArguments: [],
    });

    console.log(`Verified contract`, address);
  } catch (e: any) {
    console.error(e);
  }

  try {
    await commitContractComponentsToStore({ address, abi, bytecode });
  } catch (e: any) {
    console.log("Storing error")
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function commitContractComponentsToStore(contractComponents: ContractComponents) {
  try {

    console.log(
      `Commiting Contract Components of ${contractComponents.address} to Contract Store`
    )
  
    const CONTRACT_STORE_API_URI = "https://contract-store.tokenine-dev.workers.dev";
    return await Axios.post(CONTRACT_STORE_API_URI + "/contract/id/tokenine_vfun_erc721_factory_1", {
      ...contractComponents
    });
  } catch (e: any) {
    console.error(e);
  }
}

async function readFile(path: string): Promise<string> {
  try {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err, data) => {
        if (err) return reject("");
        resolve(data);
      });
    });
  } catch (e: any) {
    return "";
  }
}

async function loadContractABIfromArtifact(contractFilename: string, artifactName: string) {
  try {
    const _path = path.resolve(
      __dirname,
      `../artifacts/contracts/${contractFilename}/${artifactName}.json`
    );

    const data = JSON.parse(await readFile(_path));
    return data?.abi;

  } catch (e) {
    console.log(`e`, e)
  }
}