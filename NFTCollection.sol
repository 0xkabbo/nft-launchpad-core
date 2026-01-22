// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, Ownable {
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant MINT_PRICE = 0.05 ether;
    uint256 public totalSupply;
    string public baseTokenURI;

    constructor(string memory _baseURI) ERC721("CryptoArt", "CART") Ownable(msg.sender) {
        baseTokenURI = _baseURI;
    }

    function mint(uint256 _quantity) public payable {
        require(totalSupply + _quantity <= MAX_SUPPLY, "Max supply exceeded");
        require(msg.value >= MINT_PRICE * _quantity, "Insufficient ETH sent");
        
        for (uint256 i = 0; i < _quantity; i++) {
            uint256 tokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, tokenId);
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseTokenURI = _newBaseURI;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }
}
