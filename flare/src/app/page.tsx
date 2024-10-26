"use client";
import React from "react";
import { useUser } from "@/app/lib/ctx/userctx";
import UserPanel from "../app/components/ui/UserPanel";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const { walletId } = useUser();
    const router = useRouter();

    // Redirect to dashboard if already connected
    React.useEffect(() => {
        if (walletId) {
            router.push("/dashboard");
        }
    }, [walletId, router]);

    return (
        <div className="landing-page">
            <h1>Welcome to Healthcare Dashboard</h1>
            <p>Please connect your wallet to continue.</p>
            <UserPanel />

            <style jsx>{`
        .landing-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #f3f4f6;
          text-align: center;
        }
        h1 {
          font-size: 2.5rem;
          color: #333;
        }
        p {
          color: #555;
          font-size: 1.25rem;
        }
        .connect-wallet {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }
        .connect-wallet:hover {
          background-color: #005bb5;
        }
      `}</style>
        </div>
    );
}