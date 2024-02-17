import Image from "next/image"
import star from '../../assets/star.png';
import Link from "next/link";

const Card = (prop) => {
  return (
    <div className="w-[377px] sm:w-[347px] h-[251px] border border-[#EEEEF06B] rounded-[10px] bg-[#130425] mt-[20px] py-[25px] px-[15px]">
            <div className="flex space-x-6">
            <Image src={prop.src} alt='img' />
            <Image src={star} alt='star' className="h-[20px] mt-[2px]" />
            </div>
            <h1 className="mt-[20px] text-[#EEEEF0] text-[14px] font-[500] satoshi w-[265px] ">Coursera Cyber Security Updated 2023</h1>
            <div className=" mt-[10px] flex justify-between">
            <h1 className=" text-[#EEEEF0] text-[14px] font-[400] satoshi w-[265px]">4 days ago</h1>
            <Link  href='#verify'>
                <p className="text-[#B21888] text-[14px] font-[900] satoshi  w-[100px]">Verify Course</p>
            </Link>

            </div>

    </div>
  )
}

export default Card