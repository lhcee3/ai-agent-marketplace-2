// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AIAgentNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct AgentMetadata {
        string name;
        string version;
        string description;
    }

    mapping(uint256 => AgentMetadata) public agentMetadata;

    constructor() ERC721("AIAgent", "AIA") Ownable(msg.sender) {}

    function mintAgent(
        address to,
        string memory name,
        string memory version,
        string memory description
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(to, newTokenId);

        agentMetadata[newTokenId] = AgentMetadata(name, version, description);

        return newTokenId;
    }

    function getAgentMetadata(uint256 tokenId) public view returns (AgentMetadata memory) {
        require(ownerOf(tokenId) != address(0), "Agent does not exist");
        return agentMetadata[tokenId];
    }
}
