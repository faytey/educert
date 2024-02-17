import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input
  } from '@chakra-ui/react'
  import { useRef, useState } from "react";
  import profile from '../../assets/profile.png'
  import Image from "next/image";
  import { useAccount,useContractWrite, usePrepareContractWrite, } from 'wagmi'
  import childAbi from '../utils/childAccount.json'



const TransferModal = (props) => {
    const {address} = useAccount();
    const [walletAddress, SetWalletAddress] = useState('');
    const cancelRef = useRef()

    const handleWalletInput = (e) => {
        SetWalletAddress(e.target.value)
    }

    const { config: transferConfig } = usePrepareContractWrite({
        address: props.address,
        abi: childAbi,
        functionName: 'TransferOwnership',
        args : [walletAddress],
      })
      const { data, isLoading, isSuccess, write : callTransfer } = useContractWrite(transferConfig)
const handleTransfer = () =>{
    callTransfer?.();
}
  return (
    <>

      <Modal isOpen={props.open} onClose={props.close} size='xl' isCentered >
        <ModalOverlay />
        <ModalContent  height='250px' >
          <ModalHeader>
                <div className='flex space-x-4'>
                    <Image src={profile} alt='profile'/>
                    <h1 className='my-[5px]'>{address?.slice(0, 16)}...</h1>
                </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mt={4}>
          <Input type='text' id='walletInput' placeholder='Wallet address' className='bg-[#D4D4D43B] satoshi mx-auto xxl:h-[56px] xl:h-[50px] xxl:w-[724px] xl:w-[600px] rounded-[12px] text-[18px] xl:text-[14px] text-black px-[20px]'  value={walletAddress} onChange={handleWalletInput} />

          </ModalBody>

          <ModalFooter >
            <Button mx='auto' size='lg' className='w-[259px]' style={{background: '#130425', color: '#EEEEF0'}} onClick={handleTransfer}>Transfer Ownership</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TransferModal