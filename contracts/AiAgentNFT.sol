// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AIAgentNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct AgentMetadata {
        string name;
        string image;
        string description;
        string systemPrompt;
    }

    mapping(uint256 => AgentMetadata) public agentMetadata;

    constructor() ERC721("AIAgent", "AIA") {}

    function mintAgent(
        string memory name,
        string memory image,
        string memory description,
        string memory systemPrompt,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        agentMetadata[newTokenId] = AgentMetadata(name, image, description, systemPrompt);

        return newTokenId;
    }

    function getAgentMetadata(uint256 tokenId) public view returns (AgentMetadata memory) {
        require(_isValidToken(tokenId), "Agent does not exist");
        return agentMetadata[tokenId];
    }

    function _isValidToken(uint256 tokenId) internal view returns (bool) {
        try this.ownerOf(tokenId) returns (address) {
            return true;
        } catch {
            return false;
        }
    }

    
    function exists(uint256 tokenId) public view returns (bool) {
        return _isValidToken(tokenId);
    }
}