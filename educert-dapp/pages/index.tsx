import Title from './components/Title';
import InputTab from './components/InputTab';
import world from '../assets/world.png';
import Image from "next/image";
import Creataccount from './components/Createaccount';
import Aboutsection from './components/Aboutsection';
import Herosecton from './components/Herosection'
import Community from './components/Community';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { Spinner, Center, Box } from '@chakra-ui/react';



export default function Home() {
  return (
    <Layout status={true} clicked='' secondClick=''>
    <div className='relative'>
      <div className='sm:hidden'>
        <Title />
      </div>
      <div  className=" xxl:hidden sm:w-[330px] sm:mx-[20px] sm:text-center xl:hidden">
          <h1 className="sm:text-[30px] sm:font-[900] satoshi sm:w-[330px] text-[#EEEEF0]">Verify <span className='text-[#B21888]'>Certifications</span>  in seconds</h1>
          <p className="sm:w-[330px] sm:font-[400] satoshi text-[#EEEEF0]">Decentralized and secure solution for issuing verifiable certificates to learners and professionals.</p>
        </div>
        <div className="xxl:hidden xl:hidden moving-div satoshi sm:mt-[20px]">For full functionality, please use a desktop browser with Metamask installed</div>

        <div className='relative z-50'>
        <InputTab />
        </div>
        <div className='absolute top-[-2%] left-[4%] w-full right-20 sm:hidden'>
            <Image src={world} alt='world' className='w-full' />
          </div>
          <div className='sm:hidden absolute top-[10%]'>
          <Box
              w="100px"
              h="100px"
              style={{background : "conic-gradient(from 180deg at 50% 50%, #C729B9 -28.32deg, #B52BBA 4.67deg, #A12CBC 23.65deg, #8C2EBE 44.86deg, #792FBF 72.46deg, #6C30C0 82.5deg, #4B32C3 127.99deg, #5831C2 160.97deg, #6330C1 178.46deg, #742FC0 189.48deg, #8D2DBE 202.95deg, #A62CBC 230.66deg, #B92ABA 251.35deg, #D029B8 276.44deg, #EC27B6 306.45deg, #C729B9 331.68deg, #B52BBA 364.67deg)", boxShadow:"0px 0px 60px 0px #EC27B699"}}
              borderRadius="50%"
              animation="bounce 2s infinite"
              ml="1060px"
            />
          </div>
          <div className='sm:hidden absolute top-[10%]'>
          <Box
              w="100px"
              h="100px"
              style={{background : "conic-gradient(from 180deg at 50% 50%, #C729B9 -28.32deg, #B52BBA 4.67deg, #A12CBC 23.65deg, #8C2EBE 44.86deg, #792FBF 72.46deg, #6C30C0 82.5deg, #4B32C3 127.99deg, #5831C2 160.97deg, #6330C1 178.46deg, #742FC0 189.48deg, #8D2DBE 202.95deg, #A62CBC 230.66deg, #B92ABA 251.35deg, #D029B8 276.44deg, #EC27B6 306.45deg, #C729B9 331.68deg, #B52BBA 364.67deg)", boxShadow:"0px 0px 60px 0px #EC27B699"}}
              borderRadius="50%"
              animation="bounce 2s infinite"
              ml="150px"
            />
          </div>
         <Creataccount/>
         <Aboutsection />
         <Herosecton />
         <Community />
    </div>
    </Layout>
  )
}

