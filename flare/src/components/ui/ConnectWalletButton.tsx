"use client";

export default function ConnectWalletButton() {
  return <button className="connect-wallet" onClick={async () => {
    const res = await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log(res);
  }}>Connect Wallet</button>;
}
