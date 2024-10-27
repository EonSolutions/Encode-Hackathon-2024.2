"use client";
import React, { useState, useEffect, PropsWithChildren } from "react";
import styles from "./dashboard.module.scss";
import LineChart from "./LineChart";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import Popup from "./Popup";
import Stepper from "./Stepper";
import { hashFunc } from "@/app/lib/encrypt";
import { useContract } from "@/app/lib/ctx/contractctx";
import { useUser } from "@/app/lib/ctx/userctx";
import Web3 from "web3";

// Sidebar Component
const Sidebar = () => (
  <div className={styles.sidebar}>
    <h2 className={styles.sidebarTitle}>Dashboard</h2>
    <nav className={styles.navLinks}>
      <a href="#" className={styles.navItem}>
        Home
      </a>
      <a href="#" className={styles.navItem}>
        Orders
      </a>
      <a href="#" className={styles.navItem}>
        Customers
      </a>
      <a href="#" className={styles.navItem}>
        Analytics
      </a>
      <a href="#" className={styles.navItem}>
        Settings
      </a>
    </nav>
  </div>
);

type CardProps = PropsWithChildren<{
  title: string;
  data?: string;
  trendData?: any;
}>;

type HealthData = {
  heartRate: {
    average: number;
    trend: number[];
  };
  bloodPressure: {
    systolic: number;
    diastolic: number;
    trend: { day: string; systolic: number; diastolic: number }[];
  };
  sleep: {
    averageHours: number;
    trend: number[];
  };
};

// Card Component
const Card = ({ title, data, trendData, children }: CardProps) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    {data && <p className={styles.dataValue}>{data}</p>}
    {trendData && <LineChart data={trendData} options={{ responsive: true }} />}
    {children}
  </div>
);

type StressGaugeProps = {
  stressLevel: number;
};

// Stress Gauge Component
const StressGauge = ({ stressLevel }: StressGaugeProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const data = [
    {
      name: "Stress Level",
      value: stressLevel,
      fill: stressLevel > 50 ? "#ff4d4f" : "#52c41a",
    },
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
      <RadialBar background dataKey="value" />
      <Legend
        iconSize={10}
        layout="horizontal"
        verticalAlign="middle"
        wrapperStyle={{ top: 180 }}
      />
    </RadialBarChart>
  );
};

// Main DashboardPage Component
const DashboardPage = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [showPopup, setShowPopup] = useState(true); // Show JSON upload popup initially
  const [showStepper, setShowStepper] = useState(false); // Control Stepper visibility
  const [activeStep, setActiveStep] = useState(0);

  const contract = useContract();
  const { walletId } = useUser();

  const handleFileUpload = async (data: HealthData) => {
    setHealthData(data);
    setShowPopup(false); // Close the JSON upload popup
    setShowStepper(true); // Show stepper after JSON upload
    setActiveStep(0);

    // Calculate Input Data
    const averageHeartRate_n =
      data.heartRate.average / Math.max(...data.heartRate.trend);
    const averageBloodPressure_n =
      data.bloodPressure.systolic /
      Math.max(...data.bloodPressure.trend.map((day) => day.systolic));
    const averageSleep_n =
      data.sleep.averageHours / Math.max(...data.sleep.trend);

    // Step 1: Encrypt data
    const res0 = await fetch("http://localhost:5001/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: [averageHeartRate_n, averageBloodPressure_n, averageSleep_n],
      }),
    });
    const encrypted_input = (await res0.json()).encrypted_feedback;

    // Step 1.1: Save encrypted data to database
    const res1 = await fetch("/api/db/put", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        encryptedFeedback: encrypted_input,
      }),
    });
    const doc_ref = (await res1.json()).id;

    // Step 2: Prepare attestation request
    setActiveStep(1);

    const abi_signature = {
      DataEntry: {
        id: "bytes32",
        encrypted_data_hash: "bytes32",
        encrypted_result: "string",
        encrypted_data: "string",
      },
    };

    const res2 = await fetch("api/attest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data_id: doc_ref,
        data_hash: hashFunc(encrypted_input),
        model: "feedback",
        abi_signature: JSON.stringify(abi_signature),
      }),
    });
    const req = (await res2.json()).response;

    console.log(req);

    // Step 3: Sign transaction
    setActiveStep(2);
    await contract.contract!.methods["addDataEntry"](req).send({ from: walletId });

    // Step 4: Decrypt result
    setActiveStep(3);
  };

  // Simulated steps data
  const stepsData = [
    {
      label: "Step 1",
      inProgressDescription: "Uploading to Database",
      completedDescription: "Data Uploaded",
    },
    {
      label: "Step 2",
      inProgressDescription: "Running Agent",
      completedDescription: "Agent Validated",
    },
    {
      label: "Step 3",
      inProgressDescription: "Signing Transaction",
      completedDescription: "Transaction Complete",
    },
  ];

  const { heartRate, bloodPressure, sleep } = healthData || {
    heartRate: undefined,
    bloodPressure: undefined,
    sleep: undefined,
  };

  const heartRateTrendData = heartRate && {
    labels: Array.from(
      { length: heartRate.trend.length },
      (_, i) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7]
    ),
    datasets: [
      {
        label: "Heart Rate (bpm)",
        data: heartRate.trend,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const bloodPressureTrendData = bloodPressure && {
    labels: bloodPressure.trend.map((day) => day.day),
    datasets: [
      {
        label: "Systolic",
        data: bloodPressure.trend.map((day) => day.systolic),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Diastolic",
        data: bloodPressure.trend.map((day) => day.diastolic),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const sleepTrendData = sleep && {
    labels: Array.from(
      { length: sleep.trend.length },
      (_, i) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7]
    ),
    datasets: [
      {
        label: "Sleep Duration (hrs)",
        data: sleep.trend,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const stressLevel = (heartRate?.average || 0) > 75 ? 80 : 30;

  return (
    <div className={styles.dashboardContainer}>
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onFileUpload={handleFileUpload}
        />
      )}

      <Sidebar />

      <div className={styles.mainContent}>
        {showStepper ? (
          <Stepper steps={stepsData} activeStep={activeStep} />
        ) : (
          healthData && ( // Only show metrics after stepper completes
            <div className={styles.metricsGrid}>
              <Card
                title="Blood Pressure"
                data={`${bloodPressure?.systolic}/${bloodPressure?.diastolic} mmHg`}
                trendData={bloodPressureTrendData}
              />
              <Card
                title="Average Sleep"
                data={`${sleep?.averageHours} hrs`}
                trendData={sleepTrendData}
              />
              <Card
                title="Average Heart Rate"
                data={`${heartRate?.average} bpm`}
                trendData={heartRateTrendData}
              />
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
