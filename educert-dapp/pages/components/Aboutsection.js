import Image from "next/image"
import groupIcon from '../../assets/groupicon.png';
import man from '../../assets/man.png';

const Aboutsection = () => {
  return (
    <div>
        <Image src={groupIcon} alt='sponsor' className="mt-[80px] sm:w-[347px] xsm:w-[330px]"/>
        <div className="flex sm:hidden justify-between space-x-10 xxl:w-[1200px] xl:mx-auto xxl:mx-auto mt-[50px]">
            <Image src={man} alt='man' className="sm:hidden"/>
            <div>
                <h1 id="Aboutus" className="font-[900] sm:text-center text-[30px] w-[324px]  satoshi text-[#EEEEF0]">About Edu<span className="text-[#B21888]">Cert</span></h1>
                <p className="w-[593px] sm:w-[340px] xsm:w-[330px] sm:text-center font-[400] text-[24px] sm:text-[20px] text-[#EEEEF0]">Welcome to Edu<span className="text-[#B21888]">Cert</span>, where we are revolutionizing the way certificates and credentials are issued, managed, and trusted.</p> 
                <p className="w-[593px] sm:w-[340px] xsm:w-[330px] sm:text-center font-[400] text-[24px] sm:text-[20px] text-[#EEEEF0] mt-[10px]">In a world driven by continuous learning and professional growth, we recognized the need for a secure and decentralized solution that ensures the integrity of individuals' accomplishments.</p>
            </div>
        </div>

        <div  className="xxl:hidden xl:hidden sm:w-[455px] sm:mx-auto sm:mt-[30px]  ">
                <h1 id="Aboutus" className="font-[900] sm:text-center text-[30px] w-[324px]  satoshi text-[#EEEEF0]">About Edu<span className="text-[#B21888]">Cert</span></h1>
                <p className="w-[593px] sm:w-[340px] sm:text-center font-[400] text-[24px] sm:text-[20px] text-[#EEEEF0]">Welcome to Edu<span className="text-[#B21888]">Cert</span>, where we are revolutionizing the way certificates and credentials are issued, managed, and trusted.</p> 
                <p className="w-[593px] sm:w-[340px] sm:text-center font-[400] text-[24px] sm:text-[20px] text-[#EEEEF0] mt-[10px]">In a world driven by continuous learning and professional growth, we recognized the need for a secure and decentralized solution that ensures the integrity of individuals' accomplishments.</p>
            </div>
    </div>
  )
}

export default Aboutsection