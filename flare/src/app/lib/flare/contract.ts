import { ContractHolder } from "../ctx/contractctx";

async function transact(
  contract: ContractHolder,
  user: string,
  method: string,
  args: any[]
) {
  if (!contract.contract) return;
  if (!user) return;
  contract.contract.methods[method](...args).send({ from: user });
}

export { transact };
