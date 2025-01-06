import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboards from "../Component/Dashboards";

import { useEffect, useState } from "react";

import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { FaDollarSign, FaFileAlt, FaShoppingCart } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { FaEdit, FaPlus } from "react-icons/fa";

import axios from "axios";

import { getToken, getUserdata } from "../Component/Helper/Storage";
import ApiEndPoints from "../Component/NetworkCall/ApiEndPoints";
import BankAccountsTable from "../Component/BankAccountsTable";
import UserProfile from "../Component/UserProfile";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";
import styles from "../Component/Helper/LoaderCss";

const PrivateRoute = () => {
  const [protfolio, setProtfolio] = useState([]);
  const [allProtfolio, setAllProtfolio] = useState([]);
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(false);
  const [userId, setUserId] = useState(null);
  const [lumsum, setLumsum] = useState();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    investedAmount: "",
    registrationDate: "",
    planType: "",
    year: "",
  });
  console.log("userId", userId);
  const handleformChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setShow(false);
    resetForm();
    setFlag(false);
  };
  const user = getUserdata();

  const token = getToken();
  useEffect(() => {
    getProtFolio();
    getAllProtFolio();
    getlumsum();
  }, []);
  const DashboardCard = ({ title, value, icon, color }) => {
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
          {/* <Col className="text-end">
            <div style={{ color: "green", fontSize: "14px" }}>
              {trend === "up" ? (
                <FaArrowUp style={{ color: "green", marginRight: "5px" }} />
              ) : (
                <FaArrowDown style={{ color: "red", marginRight: "5px" }} />
              )}
              {percentage}%
            </div>
          </Col> */}
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

  const getAllProtFolio = async () => {
    try {
      const response = await axios.get(ApiEndPoints.getAllProtFolio, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setAllProtfolio(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleEdit = (item) => {
    setShow(true);
    setFlag(true);
    setFormData(item);
    console.log("item", item);

    // Implement edit logic here
  };
  const handladd = (userid) => {
    setShow(true);
    setUserId(userid);
  };
  const resetForm = () => {
    setFormData({
      invesmentAmount: "",
      registrationDate: "",
      invesmentType: "",
      invesmentDuration: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        userId: flag ? formData?.userId : userId?.userId,
        investedAmount: formData?.investedAmount,
        year: formData?.year,
        registrationDate: formData?.registrationDate,
        planType: formData?.planType,
        active: "true",
        portfolioId: flag ? formData?.portfolioId : null,
      };
      const response = await axios.post(
        `${flag ? `${ApiEndPoints.addProtFolio}?modify=true` : ApiEndPoints.addProtFolio}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setShow(false);
        getProtFolio();
        setFlag(false);
        getAllProtFolio();
        setLoading(false);
        resetForm();
        toast.success(
          flag
            ? "Portfolio updated successfully!"
            : "Portfolio added successfully!"
        );
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      toast.error("An error occurred. Please try again later.");
    }
  };
  const getlumsum = async () => {
    try {
      const response = await axios.get(
        `${user?.userType === "Admin" ? ApiEndPoints.getAdminLumSumPortfolio : ApiEndPoints.getUserLumSumPortfolio}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setLumsum(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Routes>
        {/* Dashboard Layout with constant Sidebar and Header */}
        <Route path="/" element={<Dashboards />}>
          {/* Nested Routes */}
          <Route
            index
            element={
              <>
                {user?.userType === "Admin" ? (
                  <>
                    <div>
                      <Row className="g-3">
                        <Col xs={12} sm={6} lg={3} md={3}>
                          <DashboardCard
                            title="Total Capital"
                            value={lumsum?.totalCapital}
                            icon={<BsCartPlus style={{ color: "#4160f9" }} />}
                            color="#293368"
                            percentage={-3}
                            trend="down"
                            width="250px"
                          />
                        </Col>
                        <Col xs={12} sm={6} lg={3} md={3}>
                          <DashboardCard
                            title="Total investment"
                            value={lumsum?.totalInvestment}
                            icon={
                              <FaShoppingCart style={{ color: "#00c98d" }} />
                            }
                            color="#155345"
                            percentage={-3}
                            trend="down"
                            width="250px"
                          />
                        </Col>
                        <Col xs={12} sm={6} lg={3} md={3}>
                          <DashboardCard
                            title="Total Payable"
                            value={lumsum?.payable}
                            icon={<FaFileAlt style={{ color: "#f35f5f" }} />}
                            color="#5f3237"
                            percentage={3}
                            trend="up"
                            width="250px"
                          />
                        </Col>
                        <Col xs={12} sm={6} lg={3} md={3}>
                          <DashboardCard
                            title="Total Total Tds"
                            value={lumsum?.totalTds}
                            icon={<FaDollarSign style={{ color: "#ea42a2" }} />}
                            color="#5b2a4a"
                            percentage={-3}
                            trend="down"
                            width="250px"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col className="mt-2" xs={12} sm={12} lg={12} md={12}>
                          <div>
                            <Table hover variant="dark" className="rounded">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>User ID</th>
                                  <th>Invested Amount</th>
                                  <th>Year</th>
                                  <th>Registration Date</th>
                                  <th>Plan End Date</th>
                                  <th>Plan Type</th>
                                  <th>Portfolio ID</th>
                                  <th>Active</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allProtfolio.map((item, index) => (
                                  <tr key={item.portfolioId}>
                                    <td>{index + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.userId}</td>
                                    <td>{item.investedAmount}</td>
                                    <td>{item.year}</td>
                                    <td>{item.registrationDate}</td>
                                    <td>{item.planEndDate}</td>
                                    <td>{item.planType}</td>
                                    <td>{item.portfolioId}</td>
                                    <td>{item.active ? "Yes" : "No"}</td>
                                    <td>
                                      <FaEdit
                                        onClick={() => handleEdit(item)}
                                      />{" "}
                                      <FaPlus
                                        onClick={() => handladd(item)}
                                        className="ms-1"
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                      <Modal
                        style={{ zIndex: "1300" }}
                        show={show}
                        onHide={handleClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add Portfolio</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form onSubmit={handleSubmit}>
                            {flag && (
                              <Form.Group>
                                <Form.Label>Portfolio ID</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="investedAmount"
                                  placeholder="Enter Invesment Amount"
                                  value={formData?.portfolioId}
                                  readOnly
                                  disabled
                                  //  onChange={handleformChange}
                                  required
                                />
                              </Form.Group>
                            )}
                            <Form.Group>
                              <Form.Label>Invesment Amount</Form.Label>
                              <Form.Control
                                type="text"
                                name="investedAmount"
                                placeholder="Enter Invesment Amount"
                                value={formData.investedAmount}
                                onChange={handleformChange}
                                required
                              />
                            </Form.Group>
                            <Form.Group className="mt-2">
                              <Form.Label>Registration Date</Form.Label>
                              <Form.Control
                                type="date"
                                name="registrationDate"
                                placeholder="Enter Registration Date"
                                value={formData.registrationDate}
                                onChange={handleformChange}
                                required
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formSelect">
                              <Form.Label>Select Plan Type</Form.Label>
                              <Form.Select
                                aria-label="Default select example"
                                name="planType"
                                value={formData.planType}
                                onChange={handleformChange}
                              >
                                <option value="">Choose...</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formSelect">
                              <Form.Label>Select yesr</Form.Label>
                              <Form.Select
                                name="year"
                                aria-label="Default select example"
                                value={formData.year}
                                onChange={handleformChange}
                              >
                                <option value="">Choose...</option>
                                <option value="1">1</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                              </Form.Select>
                            </Form.Group>
                            <Button
                              className="custom-button mt-2"
                              type="submit"
                            >
                              {flag ? "Update" : "Add"}
                            </Button>
                            {/* {product.id && (
              <Button variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            )} */}
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Row className="g-3">
                        <Col xs={12} sm={6} lg={3} md={3}>
                          <DashboardCard
                            title="Total Capital"
                            value={lumsum?.totalCapital}
                            icon={<BsCartPlus style={{ color: "#4160f9" }} />}
                            color="#293368"
                            percentage={-3}
                            trend="down"
                            width="250px"
                          />
                        </Col>
                        <Col xs={12} sm={6} lg={3} md={3}>
                          <DashboardCard
                            title="Total investment"
                            value={lumsum?.totalInvestment}
                            icon={
                              <FaShoppingCart style={{ color: "#00c98d" }} />
                            }
                            color="#155345"
                            percentage={-3}
                            trend="down"
                            width="250px"
                          />
                        </Col>
                        <Col xs={12} sm={6} lg={3} md={3}>
                          <DashboardCard
                            title="Total Payable"
                            value={lumsum?.payable}
                            icon={<FaFileAlt style={{ color: "#f35f5f" }} />}
                            color="#5f3237"
                            percentage={3}
                            trend="up"
                            width="250px"
                          />
                        </Col>
                        <Col xs={12} sm={6} lg={3} md={3}>
                          <DashboardCard
                            title="Total Tds"
                            value={lumsum?.totalTds}
                            icon={<FaDollarSign style={{ color: "#ea42a2" }} />}
                            color="#5b2a4a"
                            percentage={-3}
                            trend="down"
                            width="250px"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col className="mt-2" xs={12} sm={12} lg={12} md={12}>
                          <div className="table-responsive">
                            <Table hover variant="dark" className="rounded">
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
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </>
            }
          />
          <Route path="bank-accounts" element={<BankAccountsTable />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default PrivateRoute;
