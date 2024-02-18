import {
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Checkbox,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { useContractRead, useAccount, useReadContract } from "wagmi";
import factoryabi from "../utils/factory.json";
import childabi from "../utils/childAccount.json";
import { useEffect, useState, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Verified from "../dashboard/Verified";
import ErrorDialog from "../dashboard/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputTab = () => {
  const { address } = useAccount();
  const [dropdown, setDropDown] = useState(false);
  const [chooseAddr, setChosenAddr] = useState("");
  const [addressName, setAddressName] = useState("");
  const [inputWallet, setInputWallet] = useState("");
  const [Outcome, setOutcome] = useState();
  const [errorOutcome, setErrorOutcome] = useState("");
  const ref = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpentwo,
    onOpen: onOpentwo,
    onClose: Onclosetwo,
  } = useDisclosure();
  const { isOpen: isOpenDrop, onToggle } = useDisclosure();

  const {
    data: AllaccountData,
    isError,
    isLoading: AllAccountLoading,
    isFetched,
  } = useReadContract({
    address: "0xd6a356Bc384B8CBc2ce29e52AAa55e245a0672Ed",
    abi: factoryabi,
    functionName: "AllAccounts",
  });

  const {
    data: VerifyData,
    isError: isErrorVerify,
    isLoading: isverifyLoading,
    isFetched: isVerifyFetched,
  } = useReadContract({
    address: chooseAddr,
    abi: childabi,
    functionName: "VerifySignature",
    args: [inputWallet],
  });

  const handleDropDown = () => {
    if (address) {
      onToggle();
    } else {
      toast.info("Please Connect Wallet");
    }
  };

  const handleAddress = (result, resultName) => {
    setChosenAddr(result);
    setAddressName(resultName);
    onToggle();
  };

  const handleWalletInput = (e) => {
    setInputWallet(e.target.value);
  };
  const handleVerify = () => {
    if (VerifyData && inputWallet != "") {
      onOpen();
      setOutcome(VerifyData);
    }
    if (isErrorVerify && inputWallet != "") {
      onOpentwo();
      setErrorOutcome(isErrorVerify);
    }
    if (inputWallet == "") {
      toast.error("Enter Wallet address");
    }
    if (addressName == "") {
      toast.error("Choose Institution name");
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOutcome(false);
      setErrorOutcome(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="sm:hidden xxl:w-[1200px] sm:w-[340px] sm:h-[150px] xl:w-[900px] xl:h-[89px] xxl:h-[89px] xxl:mx-auto xl:mx-auto">
        <div className="xxl:flex sm:space-y-[20px] xl:flex space-x-4 xxl:w-[1020px] sm:block sm:h-[200px] sm:w-[347px] xxl:h-[73px] xl:h-[70px] rounded-[111px] sm:rounded-[12px] px-[27px] py-[18px] bg-[#2B243C] mx-auto mt-[40px] xl:mt-[25px]">
          <InputGroup style={{ width: "270px" }} onClick={handleDropDown}>
            <Input
              type="text"
              id="institutionName"
              placeholder="Institution Name"
              value={addressName}
              style={{ borderRadius: "15px" }}
              className="bg-[#FCFCFC3B] satoshi xxl:h-[49px] xxl:w-[270px] xl:w-[220px] rounded-[35px] text-[20px] xl:text-[14px] text-[#EEEEF06B] px-[20px] cursor-pointer"
              disabled
            />
            <InputRightElement
              style={{ width: "40px", height: "40px" }}
              pointerEvents="none"
              color="#8E8E8E"
              children={<RiArrowDropDownLine className="text-[50px]" />}
            />
          </InputGroup>
          <Input
            type="text"
            id="Wallet"
            placeholder="Enter wallet Address"
            style={{ borderRadius: "15px", borderColor: "#FCFCFC3B" }}
            className=" bg-[#FCFCFC3B] satoshi xxl:h-[49px] xxl:w-[499px] xl:w-[390px] rounded-[35px] px-[20px] text-[20px] xl:text-[14px] text-[#EEEEF06B]"
            onChange={handleWalletInput}
          />
          <Button
            className="xxl:w-[198px] xl:w-[170px] text-[20px] xxl:h-[49px] px-[24px] py-[16px] xl:text-[14px]"
            style={{
              color: "#EEEEF0",
              borderTopRightRadius: "35px",
              borderBottomRightRadius: "35px",
              background:
                "linear-gradient(92.94deg, rgba(89, 49, 194, 0.56) 28.69%, rgba(129, 47, 191, 0.56) 46.25%, rgba(198, 42, 185, 0.56) 70.56%)",
            }}
            onClick={handleVerify}
          >
            Verify
          </Button>
        </div>
        <Collapse in={isOpenDrop} animateOpacity>
          <div
            className="w-[245px] h-[104px] bg-[#A9A9A970] rounded-[8px] border-[1px] ml-[110px] mt-[2px] text-center scrollable"
            style={{ overflowY: "scroll", maxHeight: "300px" }}
          >
            {AllaccountData?.map((item, index) => {
              const handleAddressClick = () => {
                handleAddress(item.accountAddress, item._name);
              };
              return (
                <div
                  key={index}
                  className="w-[167px] my-[20px] h-[22px] satoshi font-[400] text-[16px] text-[#EEEEF06B] border-b-[2px] mx-auto cursor-pointer"
                  onClick={handleAddressClick}
                >
                  {item._name}
                </div>
              );
            })}
          </div>
        </Collapse>
        {Outcome && <Verified open={isOpen} close={onClose} />}
        {errorOutcome && <ErrorDialog open={isOpentwo} close={Onclosetwo} />}
      </div>
    </div>
  );
};

export default InputTab;
