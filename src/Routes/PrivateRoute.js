import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboards from "../Component/Dashboards";

import { useEffect, useState } from "react";

import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import {
  FaChartLine,
  FaCoins,
  FaDollarSign,
  FaFileAlt,
  FaMoneyBillWave,
  FaPiggyBank,
  FaRupeeSign,
  FaShoppingCart,
} from "react-icons/fa";
import { BsCartPlus, BsCurrencyExchange, BsGraphUp } from "react-icons/bs";
import { FaEdit, FaPlus } from "react-icons/fa";

import axios from "axios";

import { getToken, getUserdata } from "../Component/Helper/Storage";
import ApiEndPoints from "../Component/NetworkCall/ApiEndPoints";
import BankAccountsTable from "../Component/BankAccountsTable";
import UserProfile from "../Component/UserProfile";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";
import styles from "../Component/Helper/LoaderCss";
import { AiOutlineBank } from "react-icons/ai";
import investmentIcon from "../Assets/Images/01.png";
import AmountRecievedIcon from "../Assets/Images/02.png";
import TdsIcon from "../Assets/Images/03.png";
import CapitalIcon from "../Assets/Images/04.png";
import PortfolioIcon from "../Assets/Images/05.png";
import PlanCards from "../Component/PlanCards";

const PrivateRoute = () => {
  const [protfolio, setProtfolio] = useState([]);
  console.log("protfolio", protfolio);

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
  const DashboardCard = ({ title, value, icon, color, backgroundColor }) => {
    return (
      <Card
        style={{
          background: "linear-gradient(90deg, #fcf0eb 50%, #fde8e1 100%)",
          // color: "#fff",
          borderRadius: "10px",
          padding: "15px",
          // maxWidth: width,
        }}
        className="shadow-sm"
      >
        <Row className="align-items-center g-1 justify-content-center mb-2">
          <Col className="justify-content-center d-flex" xs={12}>
            {/* <div
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
              <Image style={{ width: "30px" }} src={investmentIcon} />
            </div> */}
            <Image style={{ width: "50px" }} src={icon} />
          </Col>
          <Col className="justify-content-center d-flex" xs={12}>
            <span style={{ fontSize: "13px" }} className="mb-0   fw-bold mt-2">
              {title}
            </span>
          </Col>
          <Col xs={12} className="justify-content-center d-flex">
            <input
              style={{ textAlign: "center" }}
              type="text"
              value={value}
              className="form-control rounded-5 "
            />
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
        <Route path="/" element={<Dashboards />}>
          <Route
            index
            element={
              <>
                {user?.userType === "Admin" ? (
                  <>
                    <div>
                      <Row className="g-3 justify-content-between ">
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="investment"
                            value={lumsum?.totalInvestment}
                            icon={investmentIcon}
                            color="#155345"
                            percentage={-3}
                            trend="down"
                            width="250px"
                            backgroundColor="#FFDAB9"
                          />
                        </Col>
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="Amount Recieved"
                            value={lumsum?.payable}
                            icon={AmountRecievedIcon}
                            color="#5f3237"
                            percentage={3}
                            trend="up"
                            width="250px"
                            backgroundColor="#D5E8D4"
                          />
                        </Col>
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="TDS Amount"
                            value={lumsum?.totalTds}
                            icon={TdsIcon}
                            color="#5b2a4a"
                            percentage={-3}
                            trend="down"
                            width="250px"
                            backgroundColor="#E6E6FA"
                          />
                        </Col>
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="Total Capital"
                            value={lumsum?.totalCapital}
                            icon={CapitalIcon}
                            color="#293368"
                            percentage={-3}
                            trend="down"
                            width="250px"
                            backgroundColor="#F5C6AA"
                          />
                        </Col>
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="Total Portfolio"
                            value={lumsum?.totalCapital}
                            icon={PortfolioIcon}
                            color="#293368"
                            percentage={-3}
                            trend="down"
                            width="250px"
                            backgroundColor="#F5C6AA"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col className="mt-2" xs={12} sm={12} lg={12} md={12}>
                          <div className="table-responsive">
                            <Table
                              striped
                              bordered
                              responsive
                              hover
                              variant="light"
                              className="rounded"
                            >
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
                              <Form.Label>Select year</Form.Label>
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
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Row className="g-3 justify-content-between mt-1 ">
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="investment"
                            value={lumsum?.totalInvestment}
                            icon={investmentIcon}
                            color="#155345"
                            percentage={-3}
                            trend="down"
                            width="250px"
                            backgroundColor="#FFDAB9"
                          />
                        </Col>
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="Amount Recieved"
                            value={lumsum?.payable}
                            icon={AmountRecievedIcon}
                            color="#5f3237"
                            percentage={3}
                            trend="up"
                            width="250px"
                            backgroundColor="#D5E8D4"
                          />
                        </Col>
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="TDS Amount"
                            value={lumsum?.totalTds}
                            icon={TdsIcon}
                            color="#5b2a4a"
                            percentage={-3}
                            trend="down"
                            width="250px"
                            backgroundColor="#E6E6FA"
                          />
                        </Col>
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="Total Capital"
                            value={lumsum?.totalCapital}
                            icon={CapitalIcon}
                            color="#293368"
                            percentage={-3}
                            trend="down"
                            width="250px"
                            backgroundColor="#F5C6AA"
                          />
                        </Col>
                        <Col xs={12} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="Current Portfolio"
                            value={lumsum?.totalCapital}
                            icon={PortfolioIcon}
                            color="#293368"
                            percentage={-3}
                            trend="down"
                            width="250px"
                            backgroundColor="#F5C6AA"
                          />
                        </Col>
                      </Row>
                      {/* <Row className="mt-2"> */}
                      {/* <Col className="mt-2" xs={12} sm={12} lg={12} md={12}>
                          <div className="table-responsive">
                            <Table hover variant="light" className="rounded">
                              <thead>
                                <tr>
                                  <th>Plan Type</th>
                                  <th>Date of Investment</th>
                                  <th>Invested Amount</th>
                                  <th>Monthly ROI</th>
                                  <th>Bonus on ROI</th>
                                  <th>Total Monthly income</th>

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
                        </Col> */}
                      <PlanCards plans={protfolio} />
                      {/* </Row> */}
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
