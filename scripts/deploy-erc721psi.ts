import { ethers } from "hardhat";

async function main() {
  const NFT = await ethers.getContractFactory("ERC721Psi");
  const ctNFT = await NFT.deploy();

  await ctNFT.deployed();

  console.log(`New Event NFT contract has deployed to ${ctNFT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
