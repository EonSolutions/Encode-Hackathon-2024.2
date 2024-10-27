"use client";

import ContractContext from "@/app/lib/ctx/contractctx";
import { Children } from "@/app/lib/types";
import { useEffect, useState } from "react";
import Web3, { Contract } from "web3";

import abi from "@/app/lib/flare/abi.json";

const CONTRACT_ADDR = "0x13EA456Cf7E1c32800673E944E8D8a10AaF94788";

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
