// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import "forge-std/Test.sol";
// import "../src/Factory.sol";
// import "../src/Account.sol";
// import "../src/Certificate.sol";

// contract AccountTest is Test {
//     AccountFactory public factory;
//     UserAccount public account;
//     Certificate public certificate;
   
//     address owner = 0x9B69F998b2a2b20FF54a575Bd5fB90A5D71656C1;
//     address accountholder1 = mkaddr('holder1');
//     address accountholder2 = mkaddr('holder2');
//     address accountholder3 = mkaddr('holder3');

//     function setUp() public {
//         // Forked Sepolia Testnet to test Signature Validity
//         // uint sepolia = vm.createFork("https://celo-alfajores-testnet.rpc.thirdweb.com", 20734644);
//         // vm.selectFork(sepolia);
//         vm.startPrank(owner);
//         factory = new AccountFactory();   
//         account = new UserAccount("futa", msg.sender, 4);
//         certificate = new Certificate(address(account), '');
//         vm.stopPrank();   
//     }

//     function testAccountCreation() public {
//         vm.startPrank(accountholder1);
//         factory.CreateAccount("Harvard", 4);
//         vm.stopPrank();   
//         vm.startPrank(accountholder2);
//         factory.CreateAccount("OAU", 4);
//         vm.stopPrank();   
//         factory.AllAccounts(); 
//     }

//     function testAccountOperations() public {
//         vm.startPrank(owner);
//         account.InitializeAccount(address(certificate));
//         account.AccountStatus();
//         account.Institution();
//         account.generatedigest(owner, 1722787680, 1);
//         // bytes memory sig = hex"03fb8dba6da89d2c522796648656dbd7aa95d71590ded6df75725f8a73cb3a6670b4cbc60ce4e80fc89f509c97f090690d388f759ceed97559c2c014ff3983101c";
//         // account.AppendSignature(sig, accountholder1, 1722787680, 1);
//         vm.stopPrank();  
//         // vm.startPrank(accountholder2);
//         // account.VerifySignature(accountholder1);
//         // vm.stopPrank();
//         // vm.startPrank(owner);
//         // account.RevokeCertificate(accountholder1);
//         // vm.stopPrank();
//     }
    
//     function mkaddr(string memory name) public returns (address) {
//         address addr = address(
//             uint160(uint256(keccak256(abi.encodePacked(name))))
//         );
//         vm.label(addr, name);
//         return addr;
//     }
// }

// // bytes memory sig = hex"20b4afa99ab5a6a1ab22c439cf50540ca1e15842796af65c24a9feda68214921308464a8a7d3e6534da2e20c7830b621d9db973dc0ecda723ffdb369d3a045bd1b";
