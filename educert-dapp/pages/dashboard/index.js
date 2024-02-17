import { Input, Button, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react';
import { AiOutlineInfoCircle} from 'react-icons/ai';
import Layout from '@/components/Layout';
import factoryabi from '../../pages/utils/factory.json'
import childAbi from '../../pages/utils/childAccount.json'
import { useEffect } from 'react'
import { useContractRead, useAccount,useContractWrite, usePrepareContractWrite, } from 'wagmi'
const ethUtil = require('ethereumjs-util');
const abi = require('ethereumjs-abi');
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);
import TransferModal from '../components/TransferModal'
import RevokeModal from '../components/RevokeModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';





export const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isOpentwo, onOpen: onOpentwo, onClose:Onclosetwo } = useDisclosure()
    const [loadingState, setLoadingState] = useState(false);
    const [isSign, setIsSign] = useState(true);
    const [isMint, setIsMint] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [childContractAddr, setChildContractAddr] = useState('');
    const [signature, setSignature] = useState('');
    const {address} = useAccount()

    const handleNext = () =>{
        setIsSign(false);
        setIsMint(true);
    }
   
    const handleWalletInput = (e) =>{
        setWalletAddress(e.target.value);
    }
    
    const { config: MintConfig } = usePrepareContractWrite({
        address: childContractAddr,
        abi: childAbi,
        functionName: 'AppendSignature',
        args : [signature, walletAddress, 1722787680],
      })
      const { data, isLoading, isSuccess, write : callMint } = useContractWrite(MintConfig)
  
      const handleMint = () =>{
        if(walletAddress != ''){
            setLoadingState(true);
            callMint?.();
        }else{
            toast.error('Input Wallet Address')
        }
    }
    const { data: childAddress, isError, isLoading: isChildLoading, isFetched } = useContractRead({
        address: '0x504195e2a73A2Cd0f3c691e49ADC93E509cFdA79',
        abi: factoryabi,
        functionName: 'SingleAccount',
        args: [address],
      })
    
      const { data: childContractData, isError : childerror, isLoading: childLoading, isFetched: childFetched } = useContractRead({
        address: childContractAddr,
        abi: childAbi,
        functionName: 'Institution',
      })

      const { data: childContractID , isError : nonceerror, isLoading: nonceLoading, isFetched: NonceFetched } = useContractRead({
        address: childContractAddr,
        abi: childAbi,
        functionName: 'id',
      })

      const { data: childContractNonce, isError : IDerror, isLoading: IDLoading, isFetched: IDFetched } = useContractRead({
        address: childContractAddr,
        abi: childAbi,
        functionName: 'nonce',
      })
      

    useEffect(() => {
        if(isFetched){
            setChildContractAddr(childAddress);
        }
        if(childFetched){
            console.log(childContractData)
        }
        if(NonceFetched){
            console.log(childContractNonce);
        }
        if(IDFetched){
            console.log(childContractID)
        }
        if(!address){
            window.location.href = '/';
        }
        if(isSuccess){
            toast.info('Mint successful')
            setLoadingState(false)
          }
        
      }, [childAddress, childContractData, childContractNonce, childContractID, address, isSuccess])



      const typedData = {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
            MintCert: [
                { name: 'owner', type: 'address' },
                { name: 'recipient', type: 'address' },
                { name: 'certificateID', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
            ],
        },
        primaryType: 'MintCert',
        domain: {
            name: 'Educational Certificate',
            version: '1',
            chainId: 44787,
            verifyingContract: childContractAddr,
        },
        message: {
            owner : address,
            recipient : walletAddress,
            certificateID : Number(childContractID),
            nonce : Number(childContractNonce), 
            deadline : 1722787680,
        },
    };
    
    const types = typedData.types;
    
    // Recursively finds all the dependencies of a type
    function dependencies(primaryType, found = []) {
        if (found.includes(primaryType)) {
            return found;
        }
        if (types[primaryType] === undefined) {
            return found;
        }
        found.push(primaryType);
        for (let field of types[primaryType]) {
            for (let dep of dependencies(field.type, found)) {
                if (!found.includes(dep)) {
                    found.push(dep);
                }
            }
        }
        return found;
    }
    
    function encodeType(primaryType) {
        // Get dependencies primary first, then alphabetical
        let deps = dependencies(primaryType);
        deps = deps.filter(t => t != primaryType);
        deps = [primaryType].concat(deps.sort());
    
        // Format as a string with fields
        let result = '';
        for (let type of deps) {
            result += `${type}(${types[type].map(({ name, type }) => `${type} ${name}`).join(',')})`;
        }
        return result;
    }
    
    function typeHash(primaryType) {
        return ethUtil.keccakFromString(encodeType(primaryType), 256);
    }
    
    function encodeData(primaryType, data) {
        let encTypes = [];
        let encValues = [];
    
        // Add typehash
        encTypes.push('bytes32');
        encValues.push(typeHash(primaryType));
    
        // Add field contents
        for (let field of types[primaryType]) {
            let value = data[field.name];
            if (field.type == 'string' || field.type == 'bytes') {
                encTypes.push('bytes32');
                value = ethUtil.keccakFromString(value, 256);
                encValues.push(value);
            } else if (types[field.type] !== undefined) {
                encTypes.push('bytes32');
                value = ethUtil.keccak256(encodeData(field.type, value));
                encValues.push(value);
            } else if (field.type.lastIndexOf(']') === field.type.length - 1) {
                throw 'TODO: Arrays currently unimplemented in encodeData';
            } else {
                encTypes.push(field.type);
                encValues.push(value);
            }
        }
    
        return abi.rawEncode(encTypes, encValues);
    }
    
    function structHash(primaryType, data) {
        return ethUtil.keccak256(encodeData(primaryType, data));
    }
    
    function signHash() {
        return ethUtil.keccak256(
            Buffer.concat([
                Buffer.from('1901', 'hex'),
                structHash('EIP712Domain', typedData.domain),
                structHash(typedData.primaryType, typedData.message),
            ]),
        );

    }
    const handleSign = async () => {
        if (window.ethereum && walletAddress != '') {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const senderAddress = accounts[0];
    
                // Construct the EIP-712 message hash
                const messageHash = signHash();
                // Request the signature using eth_signTypedData_v4
                const signature = await ethereum.request({
                    method: 'eth_signTypedData_v4',
                    params: [senderAddress, typedData],
                });
                setSignature(signature);
                console.log("Signature:", signature);
                handleNext();
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error("MetaMask not detected");
        }
        if(walletAddress == ''){
            toast.error('Input Wallet Address');
        }
    };
    
    

  return (<> 
 
    <Layout status={false} clicked={onOpen} secondClick={onOpentwo}>
    {loadingState && <Loading />}
    <div>
            <div className='w-[1114px] h-[38px] rounded-[10px] bg-[#FFFEFF70] mx-auto flex justify-between px-[100px] py-[5px]'>
                        <div className='flex space-x-2'>
                            <h1 className='text-[16px] font-[500] satoshi w-[167px] text-[#FFFFFF]'>Institution Name</h1>
                            <p className='text-[16px] font-[400] satoshi w-[167px] text-[#FFFFFF9E]'>{childContractData?._name}</p>
                        </div>
                        <div className='flex space-x-2'>
                            <h1 className='text-[16px] font-[500] satoshi w-[167px] text-[#FFFFFF]'>Certificates Issued</h1>
                            <p className='text-[16px] font-[400] satoshi w-[150px] text-[#FFFFFF9E]'>{Number(childContractData?.certMinted)}</p>
                        </div>
            </div>
            <div className='w-[1109px] h-[520px] rounded-[14px] bg-[#FFFFFF] mx-auto mt-[20px] px-[30px] py-[30px] relative'>
                    <div className='flex justify-between'>
                        <div className='text-[18px] text-center text-[#717171] font-[400] w-[518px]' style={{borderBottom: isSign ? '6px solid #4C32C3' : 'none'}}>Sign Certificate</div>
                        <div className='text-[18px] text-center text-[#717171] font-[400] w-[518px]' style={{borderBottom: isMint ? '6px solid #4C32C3' : 'none'}}>Mint Certificate</div>
                    </div>
                    
                    <TransferModal open={isOpen} close={onClose} address={childContractAddr} />
                    <RevokeModal open={isOpentwo} close={Onclosetwo} address={childContractAddr}/>
          {isSign && <div className='space-y-6 mt-[70px] w-[1050px] text-center' >
            <Input type='text' id='walletInput' placeholder='Wallet address' style={{ width: '724px', height: '56px', borderRadius: '12px'}} className='bg-[#D4D4D43B] satoshi mx-auto  text-[18px] xl:text-[14px] text-black px-[20px]' value={walletAddress} onChange={handleWalletInput} />
            <Input type='number' id='expiry' placeholder='Expiry period : 1722787680' style={{ width: '724px', height: '56px', borderRadius: '12px'}} className='bg-[#D4D4D43B] satoshi mx-auto text-[18px] xl:text-[14px] text-black px-[20px]' value='1722787680' />
            <div className='flex space-x-3 text-[#13042585] text-[14px] w-[724px] justify-start mt-[10px] mx-auto'>
                <AiOutlineInfoCircle className='w-[18px] h-[18px]' />
                <p>Please note: The expiry period applies only before mint</p>
            </div>

            <div className='w-[1050px] flex justify-end px-[30px] mt-[150px]'>
            <Button style={{background: '#130425', color: '#EEEEF0'}} className='xxl:w-[259px] xl:w-[200px] text-[18px] xxl:h-[39px] rounded-[8px]  px-[24px] py-[16px] xl:text-[14px]' onClick={handleSign}>Sign</Button>
            </div>
            </div>}

            {isMint && <div className='space-y-6 mt-[70px] w-[1050px] text-center' >
            <div className='flex space-x-3 text-[#4C32C3] text-[14px] w-[724px] justify-start mt-[10px] mx-auto'>
                <AiOutlineInfoCircle className='w-[18px] h-[18px]' />
                <p>Please note: the wallet address and Expiry period credentials must match the previous screen</p>
            </div>
            <Input type='text' id='walletInput' placeholder='Wallet address' style={{ width: '724px', height: '56px', borderRadius: '12px'}} className='bg-[#D4D4D43B] satoshi mx-auto  text-[18px] xl:text-[14px] text-black px-[20px]'  value={walletAddress} onChange={handleWalletInput} />
            <Input type='text' id='expiry' placeholder='Expiry period : 1722787680' style={{ width: '724px', height: '56px', borderRadius: '12px'}} className='bg-[#D4D4D43B] satoshi mx-auto  text-[18px] xl:text-[14px] text-black px-[20px]' value='1722787680'  />

            <div className='w-[1050px] flex justify-end px-[30px] mt-[250px]'>
            <Button style={{background: '#130425', color: '#EEEEF0'}} className='xxl:w-[259px] xl:w-[200px] text-[18px] xxl:h-[39px] rounded-[8px]  px-[24px] py-[16px] xl:text-[14px]' onClick={handleMint}>Mint certificate</Button>
            </div>
            </div>}
            </div>

    </div>
    <ToastContainer  position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"/>
    </Layout>
  </>
  )
}
export default Dashboard