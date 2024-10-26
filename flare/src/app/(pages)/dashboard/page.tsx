"use client";
import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.scss";
import LineChart from "./LineChart";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import Popup from "./Popup";
import Stepper from "./Stepper";

// Sidebar Component
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

// Card Component
const Card = ({ title, data, trendData, children }) => (
    <div className={styles.card}>
        <h3>{title}</h3>
        {data && <p className={styles.dataValue}>{data}</p>}
        {trendData && <LineChart data={trendData} options={{ responsive: true }} />}
        {children}
    </div>
);

// Stress Gauge Component
const StressGauge = ({ stressLevel }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const data = [
        { name: "Stress Level", value: stressLevel, fill: stressLevel > 50 ? "#ff4d4f" : "#52c41a" }
    ];

    return (
        <RadialBarChart
            width={200}
            height={200}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={15}
            data={data}
            startAngle={180}
            endAngle={0}
        >
            <RadialBar minAngle={15} background clockWise dataKey="value" />
            <Legend iconSize={10} layout="horizontal" verticalAlign="middle" wrapperStyle={{ top: 180 }} />
        </RadialBarChart>
    );
};

// Main DashboardPage Component
const DashboardPage = () => {
    const [healthData, setHealthData] = useState(null);
    const [showPopup, setShowPopup] = useState(true); // Show JSON upload popup initially
    const [showStepper, setShowStepper] = useState(false); // Control Stepper visibility
    const [activeStep, setActiveStep] = useState(0);

    const handleFileUpload = (data) => {
        setHealthData(data);
        setShowPopup(false); // Close the JSON upload popup
        setShowStepper(true); // Show stepper after JSON upload
        setActiveStep(0);
    };

    // Simulated steps data
    const stepsData = [
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

    // Handle auto-advancing steps
    useEffect(() => {
        if (showStepper && activeStep < stepsData.length - 1) {
            const interval = setInterval(() => {
                setActiveStep((prev) => prev + 1);
            }, 1000); // Adjust time interval as needed
            return () => clearInterval(interval);
        } else if (activeStep === stepsData.length - 1) {
            // Hide stepper and display data after the last step
            setTimeout(() => setShowStepper(false), 1000);
        }
    }, [showStepper, activeStep]);

    const { heartRate, bloodPressure, sleep } = healthData || {};

    const heartRateTrendData = heartRate && {
        labels: Array.from({ length: heartRate.trend.length }, (_, i) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7]),
        datasets: [{ label: "Heart Rate (bpm)", data: heartRate.trend, borderColor: "rgba(75, 192, 192, 1)", backgroundColor: "rgba(75, 192, 192, 0.2)", fill: true }]
    };

    const bloodPressureTrendData = bloodPressure && {
        labels: bloodPressure.trend.map((day) => day.day),
        datasets: [
            { label: "Systolic", data: bloodPressure.trend.map((day) => day.systolic), borderColor: "rgba(255, 99, 132, 1)", backgroundColor: "rgba(255, 99, 132, 0.2)", fill: true },
            { label: "Diastolic", data: bloodPressure.trend.map((day) => day.diastolic), borderColor: "rgba(54, 162, 235, 1)", backgroundColor: "rgba(54, 162, 235, 0.2)", fill: true }
        ]
    };

    const sleepTrendData = sleep && {
        labels: Array.from({ length: sleep.trend.length }, (_, i) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7]),
        datasets: [{ label: "Sleep Duration (hrs)", data: sleep.trend, borderColor: "rgba(153, 102, 255, 1)", backgroundColor: "rgba(153, 102, 255, 0.2)", fill: true }]
    };

    const stressLevel = heartRate?.average > 75 ? 80 : 30;

    return (
        <div className={styles.dashboardContainer}>
            {showPopup && <Popup onClose={() => setShowPopup(false)} onFileUpload={handleFileUpload} />}

            <Sidebar />

            <div className={styles.mainContent}>
                {showStepper ? (
                    <Stepper steps={stepsData} activeStep={activeStep} />
                ) : (
                    healthData && ( // Only show metrics after stepper completes
                        <div className={styles.metricsGrid}>
                            <Card title="Blood Pressure" data={`${bloodPressure.systolic}/${bloodPressure.diastolic} mmHg`} trendData={bloodPressureTrendData} />
                            <Card title="Average Sleep" data={`${sleep.averageHours} hrs`} trendData={sleepTrendData} />
                            <Card title="Average Heart Rate" data={`${heartRate.average} bpm`} trendData={heartRateTrendData} />
                            <Card title="Stress Analysis">
                                <StressGauge stressLevel={stressLevel} />
                            </Card>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
