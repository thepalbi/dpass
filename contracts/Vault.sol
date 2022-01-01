//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Vault {
    mapping (string => string) private _store;

    constructor() {
        console.log("Deploying a Vault whose owner is:", msg.sender);
    }

    function store(string memory key, string memory value) public {
        _store[key] = value;
    }

    function retrieve(string memory key) public view returns (string memory) {
        return _store[key];
    }
}
