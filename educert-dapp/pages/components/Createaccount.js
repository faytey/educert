import { Input, Button } from "@chakra-ui/react";
import Image from "next/image";
import metallic from "../../assets/metallic.png";
import mark from "../../assets/mark.png";
import ellipse1 from "../../assets/Ellipse1.png";
import ellipse2 from "../../assets/Ellipse2.png";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import factoryabi from "../utils/factory.json";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

const Createaccount = (prop) => {
  const [institutionName, setinstitution] = useState("");
  const [duration, setDuration] = useState("");
  const [isExist, setIsExist] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  const handleName = (e) => {
    setinstitution(e.target.value);
  };
  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  const { address } = useAccount();
  const {
    data: creationStatData,
    isError,
    isLoading: createStatLoading,
    isFetched,
  } = useReadContract({
    address: "0xd6a356Bc384B8CBc2ce29e52AAa55e245a0672Ed",
    abi: factoryabi,
    functionName: "CreationStatus",
    args: [address],
  });

  const {
    data,
    isLoading,
    isError: createError,
    isSuccess,
    writeContract: callCreate,
  } = useWriteContract();

  const handleCreateButton = () => {
    if (
      creationStatData == false &&
      address &&
      institutionName != "" &&
      duration != ""
    ) {
      // setLoadingState(true);
      callCreate?.({
        factoryabi,
        address: "0xd6a356Bc384B8CBc2ce29e52AAa55e245a0672Ed",
        abi: factoryabi,
        functionName: "CreateAccount",
        args: [institutionName, duration],
      });
      console.log('CREATE CLICKED')
    }
    if (!address) {
      toast.info("Please Connect Wallet");
    }
    if (institutionName == "" || duration == "") {
      toast.error("Input field cannot be empty");
    }
  };

  useEffect(() => {
    if (isFetched) {
      setIsExist(creationStatData);
    }
    if (isSuccess) {
      toast.info("Account Created, proceed to dashboard");
      setLoadingState(false);
    }
    if (createError) {
      toast.error("Account Creation failed");
      setLoadingState(false);
    }
  }, [creationStatData, isFetched, isSuccess, createError]);

  return (
    <div className="xxl:mt-[705px] xl:mt-[600px] sm:mt-[10px]">
      {loadingState && <Loading />}
      <div className="text-left">
        <h1
          id="createAccount"
          className="xxl:w-[366px] xl:w-[300] xxl:h-[66px] xxl:font-[900] xl:font-[800] sm:text-[30px] sm:font-[900] text-[48.62px] satoshi text-[#D129B8]"
        >
          Create <span className="text-[#EEEEF0]">Account</span>
        </h1>
        <p className="font-[400] sm:w-[340px] sm:text-[20px] text-[24px] xxl:w-[690px] xl:w-[600px] mt-[10px] sm:mt-[5px] satoshi xxl:h-[108px] text-[#EEEEF0]">
          Seamlessly interact with cutting-edge blockchain technology to create
          an account, seamlessly manage certificate signing, and effortlessly
          verify credentials.
        </p>
      </div>

      <div className="flex mt-[50px] justify-between ">
        <div className="xxl:w-[422px] sm:w-[365px] xsm:w-[330px] xl:w-[400px] xxl:h-[396px] xl:h-[350px] bg-[#D9D9D93D] rounded-[12px] px-[30px] py-[30px]  xxl:space-y-[20px] sm:space-y-[20px] xl:space-y-[20px] ">
          <h1 className="xxl:w-[347px] xl:w-[320px] xl:h-[50px] xxl:h-[56px] satoshi font-[400] text-[18px] text-[#EEEEF06B] ">
            <span className="text-[#B21888]">Creating</span> and managing your
            courses has never been Simpler
          </h1>
          <Input
            type="text"
            id="create"
            placeholder="Institution Name"
            style={{
              width: "100%",
              maxWidth: "347px",
              height: "56px",
              background: "#130425",
              borderColor: "#D9D9D93D",
              borderRadius: "12px",
              "@media(min-width: 768px)": { width: "300px" },
            }}
            className="smallInput satoshi xxl:h-[56px] xl:h-[50px] xxl:w-[350px] xl:w-[320px] rounded-[12px] text-[18px] xl:text-[14px] text-[#EEEEF06B] px-[20px]"
            onChange={handleName}
            value={institutionName}
            disabled={isExist ? true : false}
          />
          <Input
            type="number"
            id="courseDuration"
            placeholder="Course Duration"
            style={{
              width: "100%",
              maxWidth: "347px",
              height: "56px",
              background: "#130425",
              borderColor: "#D9D9D93D",
              borderRadius: "12px",
            }}
            className="bg-[#130425] satoshi xxl:h-[56px] xl:h-[50px] xxl:w-[350px] xl:w-[320px] rounded-[12px] text-[18px] xl:text-[14px] text-[#EEEEF06B] px-[20px]"
            onChange={handleDuration}
            value={duration}
            disabled={isExist ? true : false}
          />
          <Link href={creationStatData ? "/dashboard" : "#createAccount"}>
            <Button
              onClick={handleCreateButton}
              className=" mt-[30px] xxl:w-[350px] xl:w-[320px] text-[18px] xxl:h-[56px] rounded-[12px]  px-[24px] py-[16px] xl:text-[14px]"
              style={{
                background:
                  "linear-gradient(180deg, #B21888 0%, #4C32C3 100%),linear-gradient(0deg, #C4C4C4, #C4C4C4)",
                color: "#EEEEF0",
                height: "56px",
                borderRadius: "12px",
              }}
            >
              {isExist ? "Proceed to dashboard" : "Create Account"}
            </Button>
          </Link>
        </div>

        <div className="xxl:w-[750px] xl:w-[650px] sm:hidden">
          <div className="absolute xxl:right-[100px] xl:right-[70px] xxl:top-[1200px] xxl:w-[100px] xl:w-[100px]">
            <div className="xxl:w-[100px] flex justify-end">
              <Image src={ellipse2} alt="el1" />
            </div>
            <Image src={ellipse1} alt="el1" />
          </div>
          <div className="xxl:w-[279px] rounded-[14px] xl:w-[270px] xxl:h-[48px] xl:h-[40px] bg-[#FCFCFC3B] px-[10px] py-[10px] xxl:ml-[100px] xl:ml-[80px]">
            <div className="flex space-x-3">
              <Image src={mark} alt="mark" />
              <p className="text-[14px] font-[400] satoshi text-[#FFFFFF]">
                Your account has been created
              </p>
            </div>
          </div>

          <div className="xxl:w-[600px] flex justify-center mx-auto ">
            <Image src={metallic} alt="metallic" />
          </div>
          <div className="absolute xxl:left-[650px] xl:left-[500px] xxl:top-[1550px] xxl:bottom-[15px] xxl:w-[100px] xl:w-[100px]">
            <div className="xxl:w-[100px] flex justify-end">
              <Image src={ellipse1} alt="el1" />
            </div>
            <Image src={ellipse2} alt="el1" />
          </div>
          <div className="flex justify-end">
            <div className="xxl:w-[279px] rounded-[14px] xl:w-[270px] xxl:h-[48px] xl:h-[40px] bg-[#FCFCFC3B] px-[10px] py-[10px]">
              <div className="flex space-x-3">
                <Image src={mark} alt="mark" />
                <p className="text-[14px] font-[400] satoshi text-[#FFFFFF]">
                  Your Course has been created
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Createaccount;
