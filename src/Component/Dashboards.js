import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box } from "@mui/material";

import { Card, Col, Row, Table } from "react-bootstrap";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { Outlet } from "react-router-dom";
import { getToken } from "./Helper/Storage";
import axios from "axios";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";

const Dashboards = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [protfolio, setProtfolio] = useState([]);

  const token = getToken();
  useEffect(() => {
    getProtFolio();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getProtFolio = async () => {
    try {
      const response = await axios.get(ApiEndPoints.GetUserPortfolio, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setProtfolio(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fcf0eb", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
        <Header onMenuClick={handleDrawerToggle} />

        {/* Nested Routes Content */}
        <Box
          className="dashboard-content"
          sx={{ padding: "20px", color: "white" }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboards;
