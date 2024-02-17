import logo from '../../assets/logo.png'
import Image from 'next/image';
import { Button } from '@chakra-ui/react'

const Community = () => {
  return (
    <div className="w-[1128px] sm:w-[370px] xsm:w-[330px] h-[426px] border-t rounded-t-[32px]  xxl:mx-auto xl:mx-auto mt-[120px] sm:mt-[100px] " style={{background : "linear-gradient(180deg, #2B243C 0%, #0B031E 100%)", borderRightColor: "linear-gradient(180deg, #EEEEF0 0%, rgba(238, 238, 240, 0) 100%)"}}>
        <div>
                  <div className="flex items-center space-x-2 w-[133px] mx-auto mt-4">
                    <Image className="" src={logo} width="33" alt="educert Logo" />
                    <h1 className="text-[21px] font-[700] text-[#FFFFFF] satoshi">Edu<span className="text-[#EC27B6]">Cert</span></h1>
                  </div>

                    <div className='w-[705px] sm:w-[300px] sm:h-[100px] h-[188px] mx-auto sm:mx-auto text-center'>
                        <h1 className='satoshi font-[900] sm:font-[200] sm:text-[25px] text-[56px] text-[#EEEEF0]'>Join the Community Now!</h1>
                        <p className='w-[691px] sm:w-[320px] xsm:w-[310px] sm:font-[200] satoshi font-[400] text-[24px] mt-[20px] text-[#EEEEF0]'>Our mission is to empower learners and professionals by providing them with an unalterable and tamper-proof record of their achievements</p>
                        <Button className='xxl:w-[240px] text-[#EEEEF0] xl:w-[220px] text-[18px] xxl:h-[56px] rounded-[99px]  px-[24px] py-[16px] xl:text-[14px] mt-10' style={{color: '#EEEEF0', height: '66px', borderRadius: '99px', background : "conic-gradient(from 180deg at 50% 50%, #C729B9 -28.32deg, #B52BBA 4.67deg, #A12CBC 23.65deg, #8C2EBE 44.86deg, #792FBF 72.46deg, #6C30C0 82.5deg, #4B32C3 127.99deg, #5831C2 160.97deg, #6330C1 178.46deg, #742FC0 189.48deg, #8D2DBE 202.95deg, #A62CBC 230.66deg, #B92ABA 251.35deg, #D029B8 276.44deg, #EC27B6 306.45deg, #C729B9 331.68deg, #B52BBA 364.67deg)", boxShadow:"0px 0px 60px 0px #EC27B699"}}>Join Waiting List Now</Button>
                    </div>

        </div>
    </div>
  )
}

export default Community





