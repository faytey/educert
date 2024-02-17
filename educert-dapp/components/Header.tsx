import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import logo from '../assets/logo.png';
import topleft from '../assets/topleft.png'
import leftcorner from '../assets/leftcorner.png';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useContractRead, useAccount } from 'wagmi'
import factoryabi from '../pages/utils/factory.json';
import profile from '../assets/profile.png';
import { useRouter } from 'next/router';
import Loading from '../pages/components/Loading'


export default function Header(prop : any) {
  const [isExist, setIsExist] = useState(false);
  const [popOpen, setPopOpen] = useState(false);
  const router = useRouter();
  const [isPageLoading, setIsLoading] = useState(router.isFallback);

  const {address} = useAccount()
  const { data: creationStatData, isError, isLoading, isFetched } = useContractRead({
    address: '0x504195e2a73A2Cd0f3c691e49ADC93E509cFdA79',
    abi: factoryabi,
    functionName: 'CreationStatus',
    args: [address],
  })

  const handlepop = () =>{
    setPopOpen(!popOpen);
  }

  useEffect(() => {
    if(isFetched){
      //@ts-ignore
      setIsExist(creationStatData)
    }
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
    
  }, [creationStatData, isFetched])
  
  if (isPageLoading) {
    return <Loading />
  }
  const handleownershipDialog = () =>{
    prop.dialog();
    setPopOpen(false);
  }
  const handlerevokeDialog = () =>{
    prop.dialog2();
    setPopOpen(false);
  }
  
    return (
      <Disclosure as="nav" className="border-none mt-[20px]">
        {({ open }) => (
          <>
            <div className="mx-auto xl:w-[1100px] xxl:w-[1380px] md:w-[500px] px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  {/* <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button> */}
                </div>
                <div className="absolute xxl:h-[100px] xxl:w-[754px]">
                  <Image src={topleft} alt="topleft" className=" opacity-10 z-0" id='verify'/>
                </div>
                <div className="absolute top-28 xxl:h-[100px] xxl:w-[754px]">
                  <Image src={leftcorner} alt="topleft" className=" opacity-10 z-0 "/>
                </div>
              
                <div className="flex flex-1 items-center sm:items-stretch sm:justify-start space-x-8 relative z-10">
                  <div className="flex flex-shrink-0 items-center space-x-2">
                    <Image className="block sm:block lg:block" src={logo} width="45" alt="educert Logo" />
                    <h1 className="text-[30px] font-[700] text-[#FFFFFF] satoshi">Edu<span className="text-[#EC27B6]">Cert</span></h1>
                  </div>
                  {!prop.status && <Link href='/'><h1 className="text-[#FFFFFF] satoshi">Home</h1></Link>}
                 
                </div>
                <div className="absolute xl:space-x-6 xxl:space-x-10 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                 {prop.status && <>
                  <Link href={isExist ? '/dashboard' : '#createAccount'} >
                  <h1 className="sm:hidden relative z-10 text-[14px] xxl:text-[18px] xxl:w-[350] font-[400] h-[20px] xl:w-[120px] text-[#EEEEF0] satoshi">{isExist ? "Dashboard":"Create Account"}</h1>
                  </Link>
                  <Link href="#Aboutus"><h1 className=" sm:hidden relative z-10 text-[14px] xxl:text-[18px] xxl:w-[350] font-[400] h-[20px] xl:w-[89px] text-[#EEEEF0] satoshi">About Us</h1></Link>
                  </>}
                {!prop.status && <Image src={profile} alt='profile' onClick={handlepop} className="relative z-10 cursor-pointer" />}
                <div className="relative z-10">
                <ConnectButton chainStatus="none"  showBalance={{smallScreen: true, largeScreen: false}}/>
                </div>
                </div>
               {popOpen && <div className='w-[245px] h-[104px] bg-[#A9A9A970] rounded-[8px] border-[1px] mr-[150px] mt-[70px] text-center'> 
                    <h1  className='w-[167px] my-[20px] h-[22px] satoshi font-[400] text-[16px] text-[#EEEEF06B] border-b-[2px] mx-auto cursor-pointer' onClick={handleownershipDialog} >Transfer Ownership</h1>             
                    <h1  className='w-[167px] my-[20px] h-[22px] satoshi font-[400] text-[16px] text-[#EEEEF06B] border-b-[2px] mx-auto cursor-pointer' onClick={handlerevokeDialog}>Revoke Certificate</h1>             
                </div>}
              </div>
            </div>
  
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
                >
                  Home
                </Disclosure.Button>
                {/* Add here your custom menu elements */}
              </div>
            </Disclosure.Panel>
          </>
        )}

      </Disclosure>
    )
  }



  
              
       