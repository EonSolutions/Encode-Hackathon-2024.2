"use client";
import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.scss";

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
        {
            label: "Step 1",
            inProgressDescription: "Initializing Chain",
            completedDescription: "Chain Initialized"
        },
        {
            label: "Step 2",
            inProgressDescription: "Validating Transaction",
            completedDescription: "Transaction Validated"
        },
        {
            label: "Step 3",
            inProgressDescription: "Reaching Consensus",
            completedDescription: "Consensus Reached"
        },
        {
            label: "Step 4",
            inProgressDescription: "Adding Block to Chain",
            completedDescription: "Block Added to Chain"
        },
        {
            label: "Step 5",
            inProgressDescription: "Confirming Transaction",
            completedDescription: "Transaction Confirmed"
        }
    ];

    return (
        <div className={styles.stepper}>
            {steps.map((step, index) => (
                <div key={index} className={styles.stepContainer}>
                    {index !== 0 && (
                        <div
                            className={`${styles.line} ${
                                index <= activeStep ? styles.lineActive : ""
                            }`}
                        />
                    )}
                    <div
                        className={`${styles.stepIndicator} ${
                            index < activeStep
                                ? styles.completed
                                : index === activeStep
                                    ? styles.active
                                    : ""
                        }`}
                    >
                        <span className={styles.stepNumber}>{index + 1}</span>
                    </div>
                    <div className={styles.stepContent}>
                        <p className={styles.stepTitle}>{step.label}</p>
                        <p
                            className={`${styles.stepDescription} ${
                                index < activeStep
                                    ? styles.completed
                                    : index === activeStep
                                        ? styles.inProgress
                                        : styles.pending
                            }`}
                        >
                            {index < activeStep
                                ? step.completedDescription
                                : index === activeStep
                                    ? step.inProgressDescription
                                    : ""}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function DashboardPage() {
    const [activeStep, setActiveStep] = useState(0);

    // Simulate step progression for demo
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev < 4 ? prev + 1 : 0)); // Reset after last step
        }, 2000);

        return () => clearInterval(interval);
    }, []);

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
            </div>
        </div>
    );
}
