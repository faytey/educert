// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface Ifactory {
    function AccountcontractState(address contractAccount) external view returns(bool);
}