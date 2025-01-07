// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { Box } from "@mui/material";
// import "../App.css";
// import { Card, Col, Row } from "react-bootstrap";
// import {
//   FaArrowDown,
//   FaArrowUp,
//   FaDollarSign,
//   FaFileAlt,
//   FaShoppingCart,
// } from "react-icons/fa";
// import { BsCartPlus } from "react-icons/bs";
// import ActivityChart from "./ActivityChart";
// import MenuCard from "./MenuCard";
// import CircularProgress from "./CircularProgress";
// import RecentOrders from "./RecentOrders ";
// import CustomerFeedback from "./CustomerFeedback";
// import { Outlet, Route, Routes } from "react-router-dom";
// import Login from "./Login/Login";
// import Register from "./Register/Register";

// const Dashboards = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   const DashboardCard = ({
//     title,
//     value,
//     icon,
//     color,
//     percentage,
//     trend,
//     width,
//   }) => {
//     return (
//       // <Card
//       //   style={{
//       //     backgroundColor: "#1E1E2F",
//       //     color: "#FFF",
//       //     borderRadius: "10px",
//       //     padding: "20px",
//       //   }}
//       // >
//       //   <Card.Body>
//       //     <div className="d-flex justify-content-between align-items-center">
//       //       <div>
//       //         <Card.Title>{title}</Card.Title>
//       //         <h4>{value}</h4>
//       //         <div className="d-flex align-items-center mt-2">
//       //           {trend === "up" ? (
//       //             <FaArrowUp style={{ color: "green", marginRight: "5px" }} />
//       //           ) : (
//       //             <FaArrowDown style={{ color: "red", marginRight: "5px" }} />
//       //           )}
//       //           <span style={{ color: trend === "up" ? "green" : "red" }}>
//       //             {percentage}%
//       //           </span>
//       //         </div>
//       //       </div>
//       //       <div
//       //         style={{
//       //           width: "50px",
//       //           height: "50px",
//       //           backgroundColor: color,
//       //           borderRadius: "50%",
//       //           display: "flex",
//       //           justifyContent: "center",
//       //           alignItems: "center",
//       //         }}
//       //       >
//       //         {icon}
//       //       </div>
//       //     </div>
//       //   </Card.Body>
//       // </Card>
//       <Card
//         style={{
//           backgroundColor: "#1c1c28",
//           color: "#fff",
//           borderRadius: "10px",
//           padding: "15px",
//           // maxWidth: width,
//         }}
//         className="shadow-sm"
//       >
//         <Row className="align-items-center mb-2">
//           <Col xs={12}>
//             <div
//               style={{
//                 backgroundColor: color,
//                 borderRadius: "50%",
//                 padding: "10px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: "50px",
//                 height: "50px",
//               }}
//             >
//               {icon}
//             </div>
//           </Col>
//           <Col className="text-start " xs={12}>
//             <h6 className="mb-0 small mt-2">{title}</h6>
//           </Col>
//         </Row>
//         <Row>
//           <Col className="text-start ">
//             <h4 className="mb-0 fw-bold">{value}</h4>
//           </Col>
//           <Col className="text-end">
//             <div style={{ color: "green", fontSize: "14px" }}>
//               {trend === "up" ? (
//                 <FaArrowUp style={{ color: "green", marginRight: "5px" }} />
//               ) : (
//                 <FaArrowDown style={{ color: "red", marginRight: "5px" }} />
//               )}
//               {percentage}%
//             </div>
//           </Col>
//         </Row>
//       </Card>
//     );
//   };
//   const NetprofitCard = ({
//     title,
//     value,
//     icon,
//     color,
//     percentage,
//     trend,
//     width,
//   }) => {
//     return (
//       <Card
//         style={{
//           backgroundColor: "#1c1c28",
//           color: "#fff",
//           borderRadius: "10px",
//           padding: "15px",
//           maxWidth: width,
//         }}
//         className="shadow-sm"
//       >
//         {/* <Row className="align-items-center mb-2">
//           <Col className="text-start " lg={7} xs={12}>
//             <h6 className="mb-0 small mt-2">{title}</h6>
//             <h3 className="mb-0 mt-3 fw-bold">{value}</h3>
//             <div className="mt-2" style={{ color: "green", fontSize: "14px" }}>
//               {trend === "up" ? (
//                 <FaArrowUp style={{ color: "green", marginRight: "5px" }} />
//               ) : (
//                 <FaArrowDown style={{ color: "red", marginRight: "5px" }} />
//               )}
//               {percentage}%
//             </div>
//           </Col>
//           <Col lg={5} xs={12}>
//             <CircularProgress />
//           </Col>
//         </Row> */}
//         <Row className="align-items-center mb-2">
//           <Col className="text-start" sm={6} lg={7} xs={7}>
//             <h6 className="mb-0 small mt-2">{title}</h6>
//             <h3 className="mb-0 mt-3 fw-bold">{value}</h3>
//             <div
//               className="d-flex align-items-center mt-2"
//               style={{ fontSize: "14px" }}
//             >
//               {trend === "up" ? (
//                 <FaArrowUp style={{ color: "green", marginRight: "5px" }} />
//               ) : (
//                 <FaArrowDown style={{ color: "red", marginRight: "5px" }} />
//               )}
//               <span style={{ color: trend === "up" ? "green" : "red" }}>
//                 {percentage}%
//               </span>
//             </div>
//           </Col>
//           <Col
//             lg={5}
//             sm={6}
//             xs={5}
//             className="d-flex-column justify-content-center   align-items-center"
//           >
//             <CircularProgress />
//             {/* <span className="small">Goal Completed</span> */}
//           </Col>
//         </Row>
//       </Card>
//     );
//   };

//   return (
//     <Box>
//       <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

//       <Box
//         sx={{
//           flexGrow: 1,
//           backgroundColor: "#121212",
//           minHeight: "100vh",
//         }}
//       >
//         <Header onMenuClick={handleDrawerToggle} />

//         <Box
//           className="dashboard-content"
//           sx={{ padding: "20px", color: "white" }}
//         >
//           <Row className="g-3">
//             <Col xs={6} sm={6} lg={2} md={3}>
//               <DashboardCard
//                 title="Total Orders"
//                 value="100"
//                 icon={<BsCartPlus style={{ color: "#4160f9" }} />}
//                 color="#293368"
//                 percentage={-3}
//                 trend="down"
//                 width="250px"
//               />
//             </Col>
//             <Col xs={6} sm={6} lg={2} md={3}>
//               <DashboardCard
//                 title="Total Delivered"
//                 value="70"
//                 icon={<FaShoppingCart style={{ color: "#00c98d" }} />}
//                 color="#155345"
//                 percentage={-3}
//                 trend="down"
//                 width="250px"
//               />
//             </Col>
//             <Col xs={6} sm={6} lg={2} md={3}>
//               <DashboardCard
//                 title="Total Cancelled"
//                 value="05"
//                 icon={<FaFileAlt style={{ color: "#f35f5f" }} />}
//                 color="#5f3237"
//                 percentage={3}
//                 trend="up"
//                 width="250px"
//               />
//             </Col>
//             <Col xs={6} sm={6} lg={2} md={3}>
//               <DashboardCard
//                 title="Total Revenue"
//                 value="$12k"
//                 icon={<FaDollarSign style={{ color: "#ea42a2" }} />}
//                 color="#5b2a4a"
//                 percentage={-3}
//                 trend="down"
//                 width="250px"
//               />
//             </Col>
//             <Col xs={12} sm={12} lg={4} md={12}>
//               <NetprofitCard
//                 title="Total Revenue"
//                 value="$12k"
//                 icon={<FaDollarSign style={{ color: "#FFF" }} />}
//                 color="#9C27B0"
//                 percentage={-3}
//                 trend="down"
//                 width=""
//               />
//             </Col>
//           </Row>
//           <Row className="mt-2 ">
//             <Col className="mt-2" xs={12} sm={12} lg={8} md={12}>
//               <ActivityChart />
//             </Col>
//             <Col className="mt-2" xs={12} sm={12} lg={4} md={12}>
//               <MenuCard />
//             </Col>
//           </Row>
//           <Row className="mt-2">
//             <Col className="mt-2" xs={12} sm={12} lg={8} md={12}>
//               <RecentOrders />
//             </Col>
//             <Col
//               className="mt-2"
//               xs={12}
//               sm={12}
//               lg={4}
//               md={12}
//               style={{ paddingLeft: "0px" }}
//             >
//               <CustomerFeedback />
//             </Col>
//           </Row>
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboards;
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box } from "@mui/material";
// import { Outlet } from "react-router-dom";

import { Card, Col, Row, Table } from "react-bootstrap";
import {
  FaArrowDown,
  FaArrowUp,
  FaDollarSign,
  FaFileAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import ActivityChart from "./ActivityChart";
import MenuCard from "./MenuCard";
import CircularProgress from "./CircularProgress";
import RecentOrders from "./RecentOrders ";
import CustomerFeedback from "./CustomerFeedback";
import { Outlet, Route, Routes } from "react-router-dom";
import { getToken } from "./Helper/Storage";
import axios from "axios";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";
import { use } from "react";

const Dashboards = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [protfolio, setProtfolio] = useState([]);
  console.log("protfolio", protfolio);

  const token = getToken();
  useEffect(() => {
    getProtFolio();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const DashboardCard = ({
    title,
    value,
    icon,
    color,
    percentage,
    trend,
    width,
  }) => {
    return (
      <Card
        style={{
          backgroundColor: "#1c1c28",
          color: "#fff",
          borderRadius: "10px",
          padding: "15px",
          // maxWidth: width,
        }}
        className="shadow-sm"
      >
        <Row className="align-items-center mb-2">
          <Col xs={12}>
            <div
              style={{
                backgroundColor: color,
                borderRadius: "50%",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
              }}
            >
              {icon}
            </div>
          </Col>
          <Col className="text-start " xs={12}>
            <h6 className="mb-0 small mt-2">{title}</h6>
          </Col>
        </Row>
        <Row>
          <Col className="text-start ">
            <h4 className="mb-0 fw-bold">{value}</h4>
          </Col>
          <Col className="text-end">
            <div style={{ color: "green", fontSize: "14px" }}>
              {trend === "up" ? (
                <FaArrowUp style={{ color: "green", marginRight: "5px" }} />
              ) : (
                <FaArrowDown style={{ color: "red", marginRight: "5px" }} />
              )}
              {percentage}%
            </div>
          </Col>
        </Row>
      </Card>
    );
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
    <Box sx={{ backgroundColor: "#FFFDD0", minHeight: "100vh" }}>
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
          {/* <Row className="g-3">
            <Col xs={6} sm={6} lg={3} md={3}>
              <DashboardCard
                title="Total Orders"
                value="100"
                icon={<BsCartPlus style={{ color: "#4160f9" }} />}
                color="#293368"
                percentage={-3}
                trend="down"
                width="250px"
              />
            </Col>
            <Col xs={6} sm={6} lg={3} md={3}>
              <DashboardCard
                title="Total Delivered"
                value="70"
                icon={<FaShoppingCart style={{ color: "#00c98d" }} />}
                color="#155345"
                percentage={-3}
                trend="down"
                width="250px"
              />
            </Col>
            <Col xs={6} sm={6} lg={3} md={3}>
              <DashboardCard
                title="Total Cancelled"
                value="05"
                icon={<FaFileAlt style={{ color: "#f35f5f" }} />}
                color="#5f3237"
                percentage={3}
                trend="up"
                width="250px"
              />
            </Col>
            <Col xs={6} sm={6} lg={3} md={3}>
              <DashboardCard
                title="Total Revenue"
                value="$12k"
                icon={<FaDollarSign style={{ color: "#ea42a2" }} />}
                color="#5b2a4a"
                percentage={-3}
                trend="down"
                width="250px"
              />
            </Col>
          </Row> */}
          {/* <Row className="mt-2">
            <Col className="mt-2" xs={12} sm={12} lg={12} md={12}>
              <Table responsive hover variant="dark" className="rounded">
                <thead>
                  <tr>
                    <th>Plan Type</th>
                    <th>Date of Investment</th>
                    <th>Invested Amount</th>
                    <th>Monthly ROI</th>
                    <th>Bonus on ROI</th>
                    <th>Total Monthly Return</th>
                    <th>Monthly Payable</th>
                    <th>Yearly Return</th>
                    <th>Yearly TDS</th>
                    <th>Monthly TDS</th>
                    <th>Total Payable</th>
                    <th>Paid Till Now</th>
                    <th>Current Calculated Amount</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {protfolio?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.planType}</td>
                      <td>{item.dateOfInvestment}</td>
                      <td>{item.investedAmount}</td>
                      <td>{item.monthlyReturnOnInvestment}</td>
                      <td>{item.bonusOnMonthlyReturn}</td>
                      <td>{item.totalMonthlyReturn}</td>
                      <td>{item.monthlyPayable ?? "N/A"}</td>
                      <td>{item.yearlyReturn}</td>
                      <td>{item.yearlyTds}</td>
                      <td>{item.monthlyTds ?? "N/A"}</td>
                      <td>{item.totalPayable}</td>
                      <td>{item.paidTillNow ?? "N/A"}</td>
                      <td>{item.currentCalculatedAmount}</td>
                      <td>{item.active ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row> */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboards;
