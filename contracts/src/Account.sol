// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol";

interface ICert {
    function Mintcert(address to, uint id, uint amount) external;
    function Burn(address from, uint id, uint amount) external;
    function balanceOf(address account, uint256 id) external view returns (uint256);
}
contract UserAccount is EIP712 {
    struct institution{
        string _name;
        address _propietor;
        uint _courseDuration;
        uint certMinted;
    }
    struct receipientDetails {
        uint deadline;
        uint certificateID;
        bytes signature;
        bool issueStatus;
        bytes32 _digest;
    }
    address owner;
    address NFTaddress;
    mapping(address => institution)institutionProperties;
    mapping(address => receipientDetails) private Evidence;
    mapping(address => uint) private Nonces;
    bool accountstatus;
    uint CertificateID;

    event Mint (address to, uint id);
    event Revoke(address from, uint id);

    modifier onlyOwner(){
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(string memory name_, address propietor_, uint _duration, uint certificateID, address _nftAddress, address _owner) EIP712('Educational Certificate', '1'){
        require(propietor_ != address(0), 'non-zero');
        owner = _owner;
        institutionProperties[owner] = institution(name_,propietor_,_duration, 0);
        Nonces[msg.sender] = 0;
        CertificateID = certificateID;
         NFTaddress = _nftAddress;
    }
  
    //Offchain Signing.
    function AppendSignature(bytes memory signature, address account, uint deadline) external onlyOwner{
        require(accountstatus == true, 'Initialize Account');
        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
            keccak256("MintCert(address owner,address recipient,uint256 certificateID,uint256 nonce,uint256 deadline)"),
            owner,
            account,
            CertificateID,
            Nonces[owner],
            deadline
        )));
        address signer = ECDSA.recover(digest, signature);
        require(signer == owner, "AppendSig: invalid signature");
        require(signer != address(0), "ECDSA: invalid signature");
        require(block.timestamp < deadline, "Deadline: signed transaction expired");

        Nonces[owner]++;
        ICert(NFTaddress).Mintcert(account,CertificateID, 1);
        Evidence[account] = receipientDetails(deadline,CertificateID,signature, true, digest);
        emit Mint(account, CertificateID);
    }
    function VerifySignature(address account)external view returns (bool) {
        receipientDetails memory evidence = Evidence[account];
        require(ICert(NFTaddress).balanceOf(account, evidence.certificateID) > 0, 'No certificate');
        require(evidence.issueStatus == true, 'Not issuer');
        bytes memory signature = evidence.signature;
        bytes32 digest = evidence._digest;   
        address signer = ECDSA.recover(digest, signature);
        require(signer == owner, "AppendSig: invalid signer");
        require(signer != address(0), "ECDSA: invalid signature");
        return true;
    }
    function RevokeCertificate(address account) external onlyOwner returns (bool){
        ICert(NFTaddress).Burn(account, Evidence[account].certificateID, 1);
        Evidence[account] = receipientDetails(0,0,'0x0',false,0);
        emit Revoke(account, Evidence[account].certificateID);
        return true;
    }
    function TransferOwnership(address _newOwner) external onlyOwner{
        require(accountstatus == true, 'Initialize Account');
        owner = _newOwner;
    }

    function AccountStatus() public view returns (bool){
        return accountstatus;
    }
    function Institution() view public returns(institution memory) {
        return institutionProperties[owner];
    }
    function id() external view returns(uint){
        return CertificateID;
    }
    function nonce() external view returns(uint){
        return Nonces[owner];
    }
}


// forge create --rpc-url https://avalanche-fuji.infura.io/v3/45bddcf9861343ebbe5f481824e2e8ef --private-key ddfe6d47cff0a18aa845a6e04813cc46f932d16f1d57e4cad71d5ca2ecded362 src/Factory.sol:MyContract
// forge create --rpc-url https://avalanche-fuji.infura.io/v3/45bddcf9861343ebbe5f481824e2e8ef --constructor-args "uri" --private-key ddfe6d47cff0a18aa845a6e04813cc46f932d16f1d57e4cad71d5ca2ecded362 src/Certificate.sol:Certificate --etherscan-api-key 1234 --verify