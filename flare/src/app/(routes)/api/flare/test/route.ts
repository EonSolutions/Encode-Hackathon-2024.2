import { Web3 } from "web3";

export async function GET() {
  const web3 = new Web3("https://coston2-api.flare.network/ext/C/rpc");
  const chainId = await web3.eth.getChainId();
  return Response.json({ id: chainId.toString() });
}
