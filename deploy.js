const hre = require("hardhat");

async function main() {
  // Initial IPFS URL (hidden metadata)
  const initialURI = "ipfs://QmYourHashHere/";
  
  const nft = await hre.ethers.deployContract("NFTCollection", [initialURI]);
  await nft.waitForDeployment();

  console.log("NFT Collection deployed to:", nft.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
