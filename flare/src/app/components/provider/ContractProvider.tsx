"use client";

import ContractContext from "@/app/lib/ctx/contractctx";
import { Children } from "@/app/lib/types";
import { useEffect, useState } from "react";
import Web3, { Contract } from "web3";

import abi from "@/app/lib/flare/abi.json";

const CONTRACT_ADDR = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";

export const ContractProvider = ({ children }: Children) => {
  const [contract, setContract] = useState<Contract<any> | undefined>(
    undefined
  );

  useEffect(() => {
    const w3 = new Web3(window.ethereum);
    setContract(new w3.eth.Contract(abi, CONTRACT_ADDR));
  }, []);

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};
