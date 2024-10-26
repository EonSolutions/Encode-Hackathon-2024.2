import { ContractHolder } from "../ctx/contractctx";

async function getMethods(contract: ContractHolder) {
  if (!contract.contract) return;

  return contract.contract;
}

export { getMethods };