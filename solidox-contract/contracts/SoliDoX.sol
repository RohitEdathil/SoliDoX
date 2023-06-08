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
    constructor() ERC721("SoliDoX", "SDX") {}

    function issueDocument(string memory data, uint256 documentId) public {
        // Issues the new document
        _safeMint(msg.sender, documentId);
        _setTokenURI(documentId, data);
    }

    function issueMultiple(
        string[] memory data,
        uint256[] memory documentIds
    ) public {
        for (uint256 i = 0; i < data.length; i++) {
            // Fetches the current value
            uint256 documentId = documentIds[i];
            // Issues the new document
            _safeMint(msg.sender, documentId);
            _setTokenURI(documentId, data[i]);
        }
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
