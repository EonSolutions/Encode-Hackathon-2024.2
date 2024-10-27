"use client";
import { useUser } from "@/app/lib/ctx/userctx";
import styles from "./landing.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
    const { walletId, login, logout } = useUser();
    const router = useRouter();
    const loggedIn = walletId !== "";

    return (
        <div className={styles.pageContainer}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <a href="/">HealthDash</a>
                </div>
                <div className={styles.navLinks}>
                    <a href="/">Home</a>
                    <a href="/">Dashboard</a>
                    <a href="/">About</a>
                </div>
            </nav>

            <section className={styles.banner}>
                <div className={styles.textContainer}>
                    <h1>Smart Health Tracking Made Easy!</h1>
                    <p>Connect your wallet to get started with secure and private health tracking.</p>
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
                                    router.push("/dashboard");
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
                    <Image src="/rb_2133.png" alt="Health Tracking" width={500} height={500}/>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>&copy; 2024 HealthDash. All rights reserved.</p>
            </footer>
        </div>
    );
}
