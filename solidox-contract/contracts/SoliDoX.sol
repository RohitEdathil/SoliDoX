// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/* 

SoliDoX is a contract for non-fungible documents.
Each document is represented by a unique ID.

Format of the data:
- With URI: SHA256_HASH-FILE_URL-EXPIRATION_TIMESTAMP
- Without URI: SHA256_HASH-EXPIRATION_TIMESTAMP

*/
contract SoliDoX is ERC721URIStorage {
    // Generate unique token IDs
    using Counters for Counters.Counter;
    Counters.Counter private _documentIdCounter;

    constructor() ERC721("SoliDoX", "SDX") {}

    function issueDocument(string memory data) public returns (uint256) {
        // Fetches the current value
        uint256 documentId = _documentIdCounter.current();

        // Issues the new document
        _safeMint(msg.sender, documentId);
        _setTokenURI(documentId, data);

        // Increments the counter
        _documentIdCounter.increment();

        return documentId;
    }

    function revokeDocument(uint256 documentId) public returns (uint256) {
        // Checks if the document exists
        require(_exists(documentId), "Document does not exist");

        // Checks if the document is owned by the caller
        require(ownerOf(documentId) == msg.sender, "Caller is not the issuer");

        // Revokes the document
        _burn(documentId);

        return documentId;
    }

    function getDocumentData(
        uint256 documentId
    ) public view returns (string memory) {
        // Checks if the document exists
        require(_exists(documentId), "Document does not exist");

        // Returns the document data
        return tokenURI(documentId);
    }

    function getIssuer(uint256 documentId) public view returns (address) {
        // Checks if the document exists
        require(_exists(documentId), "Document does not exist");

        // Returns the document issuer
        return ownerOf(documentId);
    }
}
