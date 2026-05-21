// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { ReceiptRegistry } from "../src/ReceiptRegistry.sol";

interface Vm {
    function envUint(string calldata key) external returns (uint256 value);
    function startBroadcast() external;
    function startBroadcast(uint256 privateKey) external;
    function stopBroadcast() external;
}

contract DeployReceiptRegistry {
    Vm private constant vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));

    function run() external returns (ReceiptRegistry registry) {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        registry = new ReceiptRegistry();
        vm.stopBroadcast();
    }
}
