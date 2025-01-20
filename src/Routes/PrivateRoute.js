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
import { FaPlusCircle, FaRupeeSign } from "react-icons/fa";
import {} from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import axios from "axios";

import { getToken, getUserdata } from "../Component/Helper/Storage";
import ApiEndPoints from "../Component/NetworkCall/ApiEndPoints";
import BankAccountsTable from "../Component/BankAccountsTable";
import UserProfile from "../Component/UserProfile";
import toast from "react-hot-toast";

import investmentIcon from "../Assets/Images/01.png";
import AmountRecievedIcon from "../Assets/Images/02.png";
import TdsIcon from "../Assets/Images/03.png";
import CapitalIcon from "../Assets/Images/04.png";
import PortfolioIcon from "../Assets/Images/05.png";
import PlanCards from "../Component/PlanCards";
import InvestmentCalculator from "../Component/InvestmentCalculator";
import { Transaction } from "../Component/Transaction";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import CompanyLogo from "../Assets/Images/CompanyLogo.jpeg";

const PrivateRoute = () => {
  const [protfolio, setProtfolio] = useState([]);
  console.log("protfolio", protfolio);

  const [allProtfolio, setAllProtfolio] = useState([]);
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(false);
  const [userId, setUserId] = useState(null);
  const [lumsum, setLumsum] = useState();
  const renderTooltip = (text) => (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  const [formData, setFormData] = useState({
    investedAmount: "",
    registrationDate: "",
    planType: "",
    year: "",
    active: true,
  });
  console.log("formData", formData);

  const handleformChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
          background: "linear-gradient(90deg, #F7E7DF 50%, #FFD5C7 100%)",
          // color: "#fff",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "0px 9px 9px rgba(0, 0, 0, 0.2)",
          // maxWidth: width,
        }}
        // className="shadow"
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
            <span
              style={{ fontSize: "13px", color: "#13477f" }}
              className="mb-0   fw-bold mt-2"
            >
              {title}
            </span>
          </Col>
          <Col xs={12} className="justify-content-center d-flex">
            <input
              style={{ textAlign: "center" }}
              type="text"
              readOnly
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

    try {
      const payload = {
        userId: flag ? formData?.userId : userId?.userId,
        investedAmount: formData?.investedAmount,
        year: formData?.year,
        registrationDate: formData?.registrationDate,
        planType: formData?.planType,
        active: flag ? formData?.active : true,
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

        resetForm();
        toast.success(
          flag
            ? "Portfolio updated successfully!"
            : "Portfolio added successfully!"
        );
      }
    } catch (error) {
      console.log("error", error);

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
  const [formData1, setFormData1] = useState({
    amount: "",
    transactionDate: new Date().toLocaleDateString("en-CA"),
  });

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => {
    setShow1(false);
    setFormData1({
      amount: "",
      transactionDate: new Date().toLocaleDateString("en-CA"),
    });
  };
  const handleShow1 = (data) => {
    setFormData1((prevData) => ({
      ...prevData,
      portfolioId: data?.portfolioId,
      userId: data?.userId,
    }));

    setShow1(true);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData1({
      ...formData1,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit1 = async () => {
    const payload = {
      userId: formData1.userId,
      amount: formData1.amount,
      transactionDate: formData1.transactionDate,
      portfolioId: formData1.portfolioId,
    };
    try {
      const response = await axios.post(ApiEndPoints.addTransaction, payload, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 200) {
        // setBankDetail(response.data.data);
        toast.success("Transaction added successfully");
        // getBankDetails();
      }
    } catch (error) {
      console.log(error);
      toast.error("Bank Account add failed");
    }
    handleClose1();
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
                      <Row className="">
                        <Col className="text-start ms-lg-4 " lg={11}>
                          <Image
                            fluid
                            style={{ height: "100px" }}
                            src={CompanyLogo}
                            alt="Logo"
                          />
                        </Col>
                      </Row>
                      <Row className="g-3 justify-content-around mt-1 ">
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="Investment"
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
                              className="rounded"
                            >
                              <thead>
                                <tr>
                                  <th className="custom-background">#</th>
                                  <th className="custom-background">
                                    Portfolio Number
                                  </th>
                                  <th className="custom-background">
                                    First Name
                                  </th>
                                  <th className="custom-background">
                                    Last Name
                                  </th>

                                  <th className="custom-background">
                                    Invested Amount
                                  </th>
                                  <th className="custom-background">Year</th>
                                  <th className="custom-background">
                                    Registration Date
                                  </th>
                                  <th className="custom-background">
                                    Plan End Date
                                  </th>
                                  <th className="custom-background">
                                    Plan Type
                                  </th>

                                  <th className="custom-background">Status</th>
                                  <th colSpan={3} className="custom-background">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {allProtfolio.map((item, index) => (
                                  <tr key={item.portfolioId}>
                                    <td className="custom-background">
                                      {index + 1}
                                    </td>
                                    <td className="custom-background">
                                      {item.portfolioNumber}
                                    </td>
                                    <td className="custom-background">
                                      {item.firstName}
                                    </td>
                                    <td className="custom-background">
                                      {item.lastName}
                                    </td>

                                    <td className="custom-background">
                                      {item.investedAmount}
                                    </td>
                                    <td className="custom-background">
                                      {item.year}
                                    </td>
                                    <td className="custom-background">
                                      {item.registrationDate}
                                    </td>
                                    <td className="custom-background">
                                      {item.planEndDate}
                                    </td>
                                    <td className="custom-background">
                                      {item.planType}
                                    </td>

                                    <td className="custom-background">
                                      {item.active ? "Active" : "Inactive"}
                                    </td>
                                    <OverlayTrigger
                                      placement="left"
                                      overlay={renderTooltip("Edit")}
                                    >
                                      <td className="custom-background">
                                        <FaEdit
                                          onClick={() => handleEdit(item)}
                                          style={{ cursor: "pointer" }}
                                        />
                                      </td>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                      placement="left"
                                      overlay={renderTooltip("Add Portfolio")}
                                    >
                                      <td className="custom-background">
                                        <FaPlusCircle
                                          onClick={() => handladd(item)}
                                          className=" "
                                          style={{ cursor: "pointer" }}
                                        />
                                      </td>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                      placement="left"
                                      overlay={renderTooltip("Add Transaction")}
                                    >
                                      <td className="custom-background">
                                        <FaRupeeSign
                                          onClick={() => handleShow1(item)}
                                          style={{ cursor: "pointer" }}
                                        />
                                      </td>
                                    </OverlayTrigger>
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
                        <Modal.Header className="custom-background" closeButton>
                          <Modal.Title>Add Portfolio</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="custom-background">
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
                            {flag && (
                              <Form.Group
                                className="mb-3"
                                controlId="formPrimaryFlag"
                              >
                                <Form.Check
                                  type="checkbox"
                                  label="Is Active"
                                  name="active"
                                  checked={formData.active}
                                  onChange={handleformChange}
                                />
                              </Form.Group>
                            )}
                            <Button
                              className="custom-button border-0 mt-2"
                              type="submit"
                            >
                              {flag ? "Update" : "Add"}
                            </Button>
                          </Form>
                        </Modal.Body>
                      </Modal>
                      <Modal
                        style={{ zIndex: 9999 }}
                        show={show1}
                        onHide={handleClose1}
                      >
                        <Modal.Header className="custom-background" closeButton>
                          <Modal.Title>Add Transaction</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="custom-background">
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control
                                type="number"
                                name="amount"
                                value={formData1.amount}
                                onChange={handleChange}
                                placeholder="Enter amount"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Transaction Date</Form.Label>
                              <Form.Control
                                type="date"
                                name="transactionDate"
                                value={formData1.transactionDate}
                                onChange={handleChange}
                                placeholder="Enter transaction date"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Portfolio Id</Form.Label>
                              <Form.Control
                                type="text"
                                name="portfolioId"
                                disabled
                                value={formData1.portfolioId}
                                onChange={handleChange}
                                placeholder="Enter portfolio id"
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer className="custom-background">
                          <Button variant="secondary" onClick={handleClose1}>
                            Cancel
                          </Button>
                          <Button
                            className="custom-button border-0 "
                            onClick={handleSubmit1}
                          >
                            Add
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Row className="">
                        <Col className="text-start ms-lg-4 " lg={11}>
                          <Image
                            fluid
                            style={{ height: "100px" }}
                            src={CompanyLogo}
                            alt="Logo"
                          />
                        </Col>
                      </Row>
                      <Row className="g-3 justify-content-around mt-1 ">
                        <Col xs={6} sm={6} lg={2} md={3}>
                          <DashboardCard
                            title="Investment"
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
          <Route path="calculator" element={<InvestmentCalculator />} />
          <Route path="transaction" element={<Transaction />} />
        </Route>
      </Routes>
    </>
  );
};

export default PrivateRoute;
