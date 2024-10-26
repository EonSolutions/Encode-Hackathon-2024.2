import { createContext, useContext } from 'react';
import { Contract } from 'web3';

type ContractHolder = {
  contract?: Contract<any>;
  setContract: (contract: Contract<any>) => void;
}

const ContractContext = createContext<ContractHolder>({
  setContract: () => {},
});

const useContract = () => useContext(ContractContext);

export default ContractContext;
export { useContract };
export type { ContractHolder };