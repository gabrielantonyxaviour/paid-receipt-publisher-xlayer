// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ReceiptRegistry {
    enum ReceiptKind {
        Payment,
        Swap,
        Denial,
        Refund,
        ServiceResult
    }

    struct ReceiptAnchor {
        address publisher;
        bytes32 previousHash;
        string uri;
        ReceiptKind kind;
        uint64 publishedAt;
        bool revoked;
    }

    mapping(bytes32 => ReceiptAnchor) public receipts;
    mapping(address => bytes32) public latestHashByPublisher;

    event ReceiptPublished(
        address indexed publisher,
        bytes32 indexed receiptHash,
        bytes32 indexed previousHash,
        ReceiptKind kind,
        string uri
    );
    event ReceiptRevoked(address indexed publisher, bytes32 indexed receiptHash, string reason);

    error EmptyReceiptHash();
    error AlreadyPublished();
    error ChainMismatch(bytes32 expectedPreviousHash, bytes32 providedPreviousHash);
    error UnknownReceipt();
    error NotPublisher();
    error AlreadyRevoked();

    function publishReceipt(bytes32 receiptHash, bytes32 previousHash, ReceiptKind kind, string calldata uri)
        external
    {
        if (receiptHash == bytes32(0)) revert EmptyReceiptHash();
        if (receipts[receiptHash].publisher != address(0)) revert AlreadyPublished();

        bytes32 expectedPreviousHash = latestHashByPublisher[msg.sender];
        if (expectedPreviousHash != previousHash) {
            revert ChainMismatch(expectedPreviousHash, previousHash);
        }

        receipts[receiptHash] = ReceiptAnchor({
            publisher: msg.sender,
            previousHash: previousHash,
            uri: uri,
            kind: kind,
            publishedAt: uint64(block.timestamp),
            revoked: false
        });
        latestHashByPublisher[msg.sender] = receiptHash;

        emit ReceiptPublished(msg.sender, receiptHash, previousHash, kind, uri);
    }

    function revokeReceipt(bytes32 receiptHash, string calldata reason) external {
        ReceiptAnchor storage anchor = receipts[receiptHash];
        if (anchor.publisher == address(0)) revert UnknownReceipt();
        if (anchor.publisher != msg.sender) revert NotPublisher();
        if (anchor.revoked) revert AlreadyRevoked();

        anchor.revoked = true;
        emit ReceiptRevoked(msg.sender, receiptHash, reason);
    }
}
