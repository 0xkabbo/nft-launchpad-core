const hre = require("hardhat");

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_ADDRESS_HERE";

async function main() {
  const nft = await hre.ethers.getContractAt("NFTCollection", CONTRACT_ADDRESS);
  
  // Mint 1 NFT
  const price = hre.ethers.parseEther("0.05");
  console.log("Minting 1 NFT...");
  
  const tx = await nft.mint(1, { value: price });
  await tx.wait();
  
  console.log("Mint successful! Transaction Hash:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
