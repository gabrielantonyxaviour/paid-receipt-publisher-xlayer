// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { ReceiptRegistry } from "../src/ReceiptRegistry.sol";

contract ReceiptRegistryTest {
    ReceiptRegistry private registry;

    function setUp() public {
        registry = new ReceiptRegistry();
    }

    function testPublishFirstReceipt() public {
        bytes32 receiptHash = keccak256("receipt-1");

        registry.publishReceipt(
            receiptHash, bytes32(0), ReceiptRegistry.ReceiptKind.Payment, "ipfs://receipt-1"
        );

        (address publisher, bytes32 previousHash,, ReceiptRegistry.ReceiptKind kind,, bool revoked) =
            registry.receipts(receiptHash);

        require(publisher == address(this), "publisher mismatch");
        require(previousHash == bytes32(0), "previous hash mismatch");
        require(kind == ReceiptRegistry.ReceiptKind.Payment, "kind mismatch");
        require(!revoked, "receipt should not be revoked");
        require(registry.latestHashByPublisher(address(this)) == receiptHash, "latest hash mismatch");
    }

    function testRejectsBrokenHashChain() public {
        bytes32 firstHash = keccak256("receipt-1");
        bytes32 secondHash = keccak256("receipt-2");
        bytes32 wrongPreviousHash = keccak256("wrong-previous");

        registry.publishReceipt(
            firstHash, bytes32(0), ReceiptRegistry.ReceiptKind.Payment, "ipfs://receipt-1"
        );

        try registry.publishReceipt(
            secondHash, wrongPreviousHash, ReceiptRegistry.ReceiptKind.ServiceResult, "ipfs://receipt-2"
        ) {
            revert("expected chain mismatch");
        } catch {}
    }

    function testRevokesPublishedReceipt() public {
        bytes32 receiptHash = keccak256("receipt-1");

        registry.publishReceipt(
            receiptHash, bytes32(0), ReceiptRegistry.ReceiptKind.Denial, "ipfs://receipt-1"
        );
        registry.revokeReceipt(receiptHash, "bad metadata");

        (,,,,, bool revoked) = registry.receipts(receiptHash);
        require(revoked, "receipt should be revoked");
    }
}
