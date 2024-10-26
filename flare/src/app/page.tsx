"use client";
import { useUser } from "@/app/lib/ctx/userctx";
import styles from "./landing.module.scss";

export default function LandingPage() {
    const { walletId, login, logout } = useUser();
    const loggedIn = walletId !== "";

    return (
        <div className={styles.pageContainer}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <a href="/">HealthDash</a>
                </div>
                <div className={styles.navLinks}>
                    <a href="/">Home</a>
                    <a href="/dashboard">Dashboard</a>
                    <a href="/about">About</a>
                </div>
            </nav>

            <section className={styles.banner}>
                <div className={styles.textContent}>
                    <h1>Smart Health Tracking Made Easy!</h1>
                    <p>Connect your wallet to get started with secure and seamless health tracking.</p>
                    <button
                        className={styles.connectWallet}
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
                    <p className={styles.connectionStatus}>
                        {loggedIn ? "Connected" : "Not Connected"}
                    </p>
                    {walletId && <p className={styles.walletId}>{walletId}</p>}
                </div>
                <div className={styles.illustration}>
                    <img src="/images/health-illustration.svg" alt="Health Tracking" />
                </div>
            </section>

            <footer className={styles.footer}>
                <p>&copy; 2024 HealthDash. All rights reserved.</p>
            </footer>
        </div>
    );
}
