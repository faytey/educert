import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import Image from 'next/image'
import padlock from '../../assets/padlock.png'
import { MdCancel, MdLockOutline} from 'react-icons/md';


  
  const ErrorDialog = (props) => {

    
    return (
      <div>
        <Modal isOpen={props.open} onClose={props.close} size='xl' isCentered >
        <ModalOverlay />
        <ModalContent  height='250px' >
          <ModalCloseButton />
          <ModalBody mt={8}>
             <div className='flex space-x-3 w-[250px] mx-auto'>
                    <MdLockOutline className='w-[18px] h-[23px] text-[#F92D00E5]' />
                    <h1 className='w-[220px] mx-auto text-[#F92D00E5]'>No Certification Issued</h1>
                </div>
                <div className='w-[400px] mx-auto'>
                     <MdCancel className='w-[100px] h-[100px] mx-auto mt-[30px] text-[#F92D00E5]' />   
                </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      </div>
    )
  }
  
  export default ErrorDialog