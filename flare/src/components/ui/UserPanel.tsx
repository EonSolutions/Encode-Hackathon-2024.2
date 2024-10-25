"use client";

import { useUser } from "@/lib/ctx/userctx";

export default function UserPanel() {
  const { walletId, login, logout } = useUser();

  const loggedIn = walletId !== "";

  return (
    <div>
      <button
        className="connect-wallet"
        onClick={async () => {
          if (loggedIn) {
            logout();
            return;
          } else {
            const res = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            if (res.length > 0) {
              login(res[0]);
            }
          }
        }}
      >
        {loggedIn ? "Disconnect Wallet" : "Connect Wallet"}
      </button>
      <div className="external-links">
        <div className="profile-container">
          <div className="profile-info">
            <p className="profile-name">
              {loggedIn ? "Connected" : "Not Connected"}
            </p>
            <p className="profile-email">{walletId || "Please connect a wallet."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
