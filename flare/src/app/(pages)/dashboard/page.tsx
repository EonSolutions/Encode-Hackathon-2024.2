"use client";
import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.scss";
import LineChart from "./LineChart";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import Popup from "./Popup";

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

// Stress Gauge Component, rendered only on the client side
const StressGauge = ({ stressLevel }) => {
    // Set state to check if component has mounted
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set the client flag to true on component mount
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Render nothing on the server side
        return null;
    }

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
    const [healthData, setHealthData] = useState({
        heartRate: { average: 72, trend: [70, 72, 74, 73, 71, 72, 73, 74, 76, 72, 73, 75] },
        bloodPressure: {
            systolic: 120,
            diastolic: 80,
            trend: [
                { day: "Mon", systolic: 118, diastolic: 78 },
                { day: "Tue", systolic: 121, diastolic: 79 },
                { day: "Wed", systolic: 119, diastolic: 77 },
                { day: "Thu", systolic: 123, diastolic: 80 },
                { day: "Fri", systolic: 117, diastolic: 76 }
            ]
        },
        sleep: { averageHours: 7.5, trend: [7, 8, 7.5, 6, 8, 7, 7.5] }
    });
    const [showPopup, setShowPopup] = useState(true);

    const handleFileUpload = (data) => {
        setHealthData(data);
        setShowPopup(false);
    };

    const { heartRate, bloodPressure, sleep } = healthData;

    const heartRateTrendData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [{ label: "Heart Rate (bpm)", data: heartRate.trend, borderColor: "rgba(75, 192, 192, 1)", backgroundColor: "rgba(75, 192, 192, 0.2)", fill: true }]
    };

    const bloodPressureTrendData = {
        labels: bloodPressure.trend.map((day) => day.day),
        datasets: [
            { label: "Systolic", data: bloodPressure.trend.map((day) => day.systolic), borderColor: "rgba(255, 99, 132, 1)", backgroundColor: "rgba(255, 99, 132, 0.2)", fill: true },
            { label: "Diastolic", data: bloodPressure.trend.map((day) => day.diastolic), borderColor: "rgba(54, 162, 235, 1)", backgroundColor: "rgba(54, 162, 235, 0.2)", fill: true }
        ]
    };

    const sleepTrendData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{ label: "Sleep Duration (hrs)", data: sleep.trend, borderColor: "rgba(153, 102, 255, 1)", backgroundColor: "rgba(153, 102, 255, 0.2)", fill: true }]
    };

    const stressLevel = heartRate.average > 75 ? 80 : 30;

    return (
        <div className={styles.dashboardContainer}>
            {showPopup && <Popup onClose={() => setShowPopup(false)} onFileUpload={handleFileUpload} />}
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.metricsGrid}>
                    <Card title="Blood Pressure" data={`${bloodPressure.systolic}/${bloodPressure.diastolic} mmHg`} trendData={bloodPressureTrendData} />
                    <Card title="Average Sleep" data={`${sleep.averageHours} hrs`} trendData={sleepTrendData} />
                    <Card title="Average Heart Rate" data={`${heartRate.average} bpm`} trendData={heartRateTrendData} />
                    <Card title="Stress Analysis">
                        <StressGauge stressLevel={stressLevel} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;