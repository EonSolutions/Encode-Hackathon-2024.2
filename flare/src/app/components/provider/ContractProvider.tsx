"use client";

import ContractContext from "@/app/lib/ctx/contractctx";
import { Children } from "@/app/lib/types";
import { useEffect, useState } from "react";
import Web3, { Contract } from "web3";

const BASE_URL = "https://coston2-explorer.flare.network/api";
const RPC_URL = "https://coston2-api.flare.network/ext/C/rpc";
const CONTRACT_ADDR = "0xDA7703F33B7DE79721b5d5dec7F7518b514406ba";

export const ContractProvider = ({ children }: Children) => {
  const [contract, setContract] = useState<Contract<any> | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const params = `?module=contract&action=getabi&address=${CONTRACT_ADDR}`;
      const response = await fetch(BASE_URL + params);
      // const abi = JSON.parse((await response.json())["result"]);

      console.log(await response.json());

      // const w3 = new Web3(RPC_URL);
      // const contract = new w3.eth.Contract(abi, CONTRACT_ADDR);
      // console.log(contract);
      // setContract(contract);
    })();
  }, []);

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};
