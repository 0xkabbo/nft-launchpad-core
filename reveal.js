const hre = require("hardhat");

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_ADDRESS_HERE";
const NEW_URI = "ipfs://QmNewRevealedHash/";

async function main() {
  const nft = await hre.ethers.getContractAt("NFTCollection", CONTRACT_ADDRESS);
  
  console.log("Updating Base URI...");
  const tx = await nft.setBaseURI(NEW_URI);
  await tx.wait();
  
  console.log("Collection revealed! New URI set.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
