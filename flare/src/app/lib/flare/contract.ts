import { ContractHolder } from "../ctx/contractctx";

async function transact(
  contract: ContractHolder,
  user: string,
  method: string,
  args: any[],
  gas: number
) {
  if (!contract.contract) return;
  if (!user) return;
  console.log(contract.contract.methods);

  return await contract.contract.methods[method](...args).send({
    from: user,
    gas: gas.toString(),
  });
}

export { transact };
