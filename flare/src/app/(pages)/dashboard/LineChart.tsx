import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from "chart.js";

// Register required components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const LineChart = ({ data, options }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Destroy existing chart instance if it exists (to prevent duplication)
        let chartInstance;
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            chartInstance = new Chart(ctx, {
                type: "line",
                data,
                options
            });
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [data, options]);

    return <canvas ref={chartRef} />;
};

export default LineChart;