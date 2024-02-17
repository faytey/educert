// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
interface Ifactory {
    function AccountcontractState() external view returns(bool);
}
contract Certificate is ERC1155 {
    address factoryAddress;
    address owner;

    constructor(string memory _uri) ERC1155(_uri){
        owner = msg.sender;
    }

    function Mintcert(address to, uint id, uint amount) external{
        bool result = Ifactory(factoryAddress).AccountcontractState();
        require(result == true, 'non_user');
        require(to != address(0), 'non-zero');
        _mint(to, id, amount, '');
    }

    function Burn(address from, uint id, uint amount) external {
         bool result = Ifactory(factoryAddress).AccountcontractState();
        require(result == true, 'non_user');
        _burn(from, id, amount);
    }
    
    //over-rides
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        revert('non-transferable');
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public override {
       revert('non-transferable');
    }

    function initializeFactory(address _factoryAddress) external {
        require(msg.sender == owner, 'not authorized');
        factoryAddress = _factoryAddress;
    }
}