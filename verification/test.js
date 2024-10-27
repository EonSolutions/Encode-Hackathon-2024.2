import { Web3 } from "web3";

const w3 = new Web3();
w3.eth.accounts.wallet.create(1);

console.log(w3.eth.accounts.wallet[0].address, w3.eth.accounts.wallet[0].privateKey);