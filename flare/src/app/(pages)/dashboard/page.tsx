"use client";
import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.scss";
import { generateKeys, encryptData } from "../../../lib/encrypt";

const Sidebar = () => (
    <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Dashboard</h2>
        <nav className={styles.navLinks}>
            <a href="#" className={styles.navItem}>Home</a>
            <a href="#" className={styles.navItem}>Orders</a>
            <a href="#" className={styles.navItem}>Customers</a>
            <a href="#" className={styles.navItem}>Analytics</a>
            <a href="#" className={styles.navItem}>Settings</a>
        </nav>
    </div>
);

const Stepper = ({ activeStep }: { activeStep: number }) => {
    const steps = [
        { label: "Step 1", inProgressDescription: "Initializing Chain", completedDescription: "Chain Initialized" },
        { label: "Step 2", inProgressDescription: "Validating Transaction", completedDescription: "Transaction Validated" },
        { label: "Step 3", inProgressDescription: "Reaching Consensus", completedDescription: "Consensus Reached" },
        { label: "Step 4", inProgressDescription: "Adding Block to Chain", completedDescription: "Block Added to Chain" },
        { label: "Step 5", inProgressDescription: "Confirming Transaction", completedDescription: "Transaction Confirmed" }
    ];

    return (
        <div className={styles.stepper}>
            {steps.map((step, index) => (
                <div key={index} className={styles.stepContainer}>
                    {index !== 0 && (
                        <div className={`${styles.line} ${index <= activeStep ? styles.lineActive : ""}`} />
                    )}
                    <div className={`${styles.stepIndicator} ${index < activeStep ? styles.completed : index === activeStep ? styles.active : ""}`}>
                        <span className={styles.stepNumber}>{index + 1}</span>
                    </div>
                    <div className={styles.stepContent}>
                        <p className={styles.stepTitle}>{step.label}</p>
                        <p className={`${styles.stepDescription} ${index < activeStep ? styles.completed : index === activeStep ? styles.inProgress : styles.pending}`}>
                            {index < activeStep ? step.completedDescription : index === activeStep ? step.inProgressDescription : ""}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function DashboardPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [fileData, setFileData] = useState<string[] | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev < 4 ? prev + 1 : 0));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    try {
                        const parsedData = JSON.parse(e.target.result as string);
                        console.log("Parsed JSON data:", parsedData); // Debugging line

                        // Extract itemsPurchased and convert to a comma-separated string
                        const itemsPurchased = parsedData.user?.itemsPurchased || null;
                        if (Array.isArray(itemsPurchased)) {
                            const itemsPurchasedString = itemsPurchased.join(", ");
                            console.log("Items Purchased String:", itemsPurchasedString); // Debugging line
                            setFileData(itemsPurchasedString);
                        } else {
                            console.error("Invalid JSON structure: itemsPurchased is not an array.");
                            alert("Invalid JSON structure. Please provide a valid JSON file with an itemsPurchased array.");
                            setFileData(null);
                        }
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                        alert("Failed to parse JSON file. Please check the file format.");
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    const handleFileSubmit = async () => {
        if (!fileData) {
            alert("Please upload a JSON file containing itemsPurchased.");
            return;
        }

        try {
            console.log("Items purchased to encrypt:", fileData); // Debugging line

            // Generate RSA keys
            const { publicKey, privateKey } = generateKeys();

            // Encrypt the itemsPurchased string
            const encryptedData = encryptData(fileData, publicKey);
            console.log("Encrypted itemsPurchased:", encryptedData); // Debugging line

            // Send encrypted itemsPurchased to Firebase
            const res = await fetch("/api/db/put", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ encryptedFeedback: encryptedData }),
            });

            const body = await res.json();
            console.log("Document written with ID: ", body.id);

            // Reset file data after submission
            setFileData(null);
        } catch (error) {
            console.error("Error uploading JSON data: ", error);
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.headerBanner}>
                    <div>
                        <h2>Blockchain Process Visualization</h2>
                        <p>Explore each step in the blockchain verification process.</p>
                    </div>
                </div>
                <Stepper activeStep={activeStep} />

                {/* Analytics File Upload Section */}
                <div className={styles.analyticsSection}>
                    <h3>Upload JSON for Analytics</h3>
                    <input type="file" accept=".json" onChange={handleFileChange} />
                    <button onClick={handleFileSubmit} disabled={!fileData} className={styles.uploadButton}>
                        Upload and Encrypt
                    </button>
                </div>
            </div>
        </div>
    );
}
