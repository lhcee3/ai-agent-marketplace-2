// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./AiAgentNFT.sol";

contract AIAgentMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;

    address payable public owner;
    uint256 public listingFee = 0.00001 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct AgentListing {
        uint256 listingId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable buyer;
        uint256 price;
        bool sold;
        bool canceled;
    }

    Counters.Counter private _listingIds;
    Counters.Counter private _itemsSold;

    mapping(uint256 => AgentListing) public listings;

    event AgentListed(
        uint256 listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    event AgentSold(
        uint256 listingId,
        address buyer,
        uint256 price
    );

    event AgentListingCanceled(uint256 listingId);

    function setListingFee(uint256 fee) external {
        require(msg.sender == owner, "Only owner can set listing fee");
        listingFee = fee;
    }

    function listAgent(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external payable nonReentrant {
        require(price > 0, "Price must be > 0");
        require(msg.value == listingFee, "Must pay listing fee");

        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        listings[listingId] = AgentListing(
            listingId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false,
            false
        );

        emit AgentListed(listingId, nftContract, tokenId, msg.sender, price);
    }

    function buyAgent(uint256 listingId) external payable nonReentrant {
        AgentListing storage listing = listings[listingId];
        require(!listing.sold, "Already sold");
        require(!listing.canceled, "Listing canceled");
        require(msg.value == listing.price, "Wrong price");

        listing.buyer = payable(msg.sender);
        listing.sold = true;
        _itemsSold.increment();

        // Transfer funds to seller
        listing.seller.transfer(msg.value);

        // Transfer NFT to buyer
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        // Transfer listing fee to marketplace owner
        owner.transfer(listingFee);

        emit AgentSold(listingId, msg.sender, listing.price);
    }

    function cancelListing(uint256 listingId) external nonReentrant {
        AgentListing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Only seller can cancel");
        require(!listing.sold, "Already sold");

        listing.canceled = true;

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit AgentListingCanceled(listingId);
    }

    function fetchAvailableListings() external view returns (AgentListing[] memory) {
        uint256 total = _listingIds.current();
        uint256 unsoldCount = total - _itemsSold.current();
        AgentListing[] memory items = new AgentListing[](unsoldCount);

        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= total; i++) {
            if (!listings[i].sold && !listings[i].canceled) {
                items[currentIndex] = listings[i];
                currentIndex++;
            }
        }

        return items;
    }

    function fetchUserListings(address user) external view returns (AgentListing[] memory) {
        uint256 total = _listingIds.current();
        uint256 count = 0;

        for (uint256 i = 1; i <= total; i++) {
            if (listings[i].seller == user) {
                count++;
            }
        }

        AgentListing[] memory items = new AgentListing[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= total; i++) {
            if (listings[i].seller == user) {
                items[index] = listings[i];
                index++;
            }
        }

        return items;
    }
}
