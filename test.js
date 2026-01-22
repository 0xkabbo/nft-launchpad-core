const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTCollection", function () {
  it("Should mint NFTs correctly", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFTCollection");
    const nft = await NFT.deploy("ipfs://test/");

    // Mint 2 NFTs
    const price = ethers.parseEther("0.1"); // 0.05 * 2
    await nft.connect(addr1).mint(2, { value: price });

    expect(await nft.balanceOf(addr1.address)).to.equal(2);
    expect(await nft.totalSupply()).to.equal(2);
  });
});
