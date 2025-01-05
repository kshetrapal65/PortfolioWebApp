import React from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Typography, Select, MenuItem } from "@mui/material";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ActivityChart = () => {
  const data1 = {
    labels: [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 21, 23, 25, 27],
    datasets: [
      {
        label: "Activity",
        data: [
          3000, 9500, 4000, 6000, 5000, 2500, 7000, 10000, 15000, 10000, 5000,
          10000, 15000, 10000, 5000, 10000,
        ],
        backgroundColor: "#5A84FF",
        borderRadius: 8,
        barPercentage: 0.8,
      },
    ],
  };
  const data2 = {
    labels: [2, 6, 23, 14, 19, 16, 17, 19, 21, 23, 25, 27],
    datasets: [
      {
        label: "Activity",
        data: [
          5000, 2500, 7000, 10000, 15000, 10000, 5000, 3000, 9500, 4000, 6000,
          10000,
        ],
        backgroundColor: "#5A84FF",
        borderRadius: 8,
        barPercentage: 0.8,
      },
    ],
  };
  const [data, setData] = React.useState(data1);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#999" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      x: {
        ticks: { color: "#999" },
        grid: { display: false },
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1E1E2D",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Activity
        </Typography>

        <Select
          defaultValue="weekly"
          size="small"
          variant="outlined"
          sx={{
            backgroundColor: "#2D2D3C",
            color: "white",
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
        >
          <MenuItem onClick={() => setData(data1)} value="weekly">
            Weekly
          </MenuItem>
          <MenuItem onClick={() => setData(data2)} value="monthly">
            Monthly
          </MenuItem>
        </Select>
      </Box>

      <Box sx={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default ActivityChart;
