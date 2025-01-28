import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { getToken } from "./Helper/Storage";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";
import axios from "axios";

const InvestmentCalculator = () => {
  const token = getToken();
  const [formdata, setFormData] = React.useState({
    amount: "",
    planType: "",
    planDuration: "",
  });
  const [response, setResponse] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };
  const calculate = async () => {
    try {
      const payload = {
        amount: formdata.amount,
        planType: formdata.planType,
        totalYear: formdata.planDuration,
      };
      const response = await axios.post(
        ApiEndPoints.publicCalculator,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setResponse(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Container
        className="py-4 mt-5"
        style={{ backgroundColor: "#fcf0eb", borderRadius: "20px" }}
      >
        <Row className="justify-content-center">
          <Col
            className="shadow align-items-center justify-content-center rounded-5 text-center"
            lg={10}
          >
            <Row className="d-flex mt-3 align-items-center justify-content-center">
              <Col sm={12} md={12} lg={5} className="mb-4">
                <Card
                  style={{
                    background:
                      "linear-gradient(90deg, #F7E7DF 50%, #FFD5C7 100%)",
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                  className="shadow"
                >
                  <Card.Body>
                    <Card.Title
                      className="text-center"
                      style={{ fontWeight: "bold", color: "#13477f" }}
                    >
                      Investment Calculator
                    </Card.Title>
                    <ul
                      className="mt-3"
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        // margin: 0,
                      }}
                    >
                      {/* First Input Field */}
                      <li
                        style={{
                          marginBottom: "15px",
                        }}
                      >
                        <Row className="align-items-center">
                          <Col sm={4}>
                            <span
                              style={{ fontWeight: "bold", color: "#13477f" }}
                            >
                              Amount
                            </span>
                          </Col>
                          <Col sm={8}>
                            <Form.Control
                              type="text"
                              placeholder="Enter Amount"
                              required
                              onChange={handleChange}
                              value={formdata.amount}
                              name="amount"
                              style={{
                                height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                              }}
                            />
                          </Col>
                        </Row>
                      </li>

                      {/* Second Input Field */}
                      <li
                        style={{
                          marginBottom: "15px",
                        }}
                      >
                        <Row className="align-items-center">
                          <Col sm={4}>
                            <span
                              style={{ fontWeight: "bold", color: "#13477f" }}
                            >
                              Plan Type
                            </span>
                          </Col>
                          <Col sm={8}>
                            <Form.Select
                              aria-label="Default select example"
                              name="planType"
                              onChange={handleChange}
                              required
                              value={formdata.planType}
                              style={{
                                height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                              }}
                            >
                              <option value="">Choose...</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </Form.Select>
                          </Col>
                        </Row>
                      </li>

                      <li
                        style={{
                          marginBottom: "15px",
                        }}
                      >
                        <Row className="align-items-center">
                          <Col sm={4}>
                            <span
                              style={{ fontWeight: "bold", color: "#13477f" }}
                            >
                              Total Year
                            </span>
                          </Col>
                          <Col sm={8}>
                            <Form.Select
                              aria-label="Default select example"
                              name="planDuration"
                              required
                              onChange={handleChange}
                              value={formdata.planDuration}
                              style={{
                                height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                              }}
                            >
                              <option value="">Choose...</option>
                              <option value="1">1</option>
                              <option value="3">3</option>
                              <option value="5">5</option>
                              <option value="7">7</option>
                              <option value="10">10</option>
                            </Form.Select>
                          </Col>
                        </Row>
                      </li>
                      <Col sm={12} lg={12}>
                        <Button
                          onClick={calculate}
                          type="submit"
                          //   variant="#F9AB75"
                          className="fw-bold "
                          style={{
                            backgroundColor: "#F9AB75",
                            border: "none",
                            color: "#fff",
                          }}
                        >
                          Calculate
                        </Button>
                      </Col>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={12} lg={5} className="mb-4">
                <Card
                  style={{
                    background:
                      "linear-gradient(90deg, #F7E7DF 50%, #FFD5C7 100%)",
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                  className="shadow"
                >
                  <Card.Body>
                    <Card.Title
                      className="text-center"
                      style={{ fontWeight: "bold", color: "#13477f" }}
                    >
                      Result
                    </Card.Title>
                    <ul
                      className="mt-3"
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        // margin: 0,
                      }}
                    >
                      {/* First Input Field */}
                      <li
                        style={{
                          marginBottom: "15px",
                        }}
                      >
                        <Row className="align-items-center">
                          <Col lg={8} sm={8}>
                            <span
                              style={{ fontWeight: "bold", color: "#13477f" }}
                            >
                              Monthly ROI
                            </span>
                          </Col>
                          <Col lg={4} sm={4}>
                            <Form.Control
                              type="text"
                              value={response?.monthlyReturnOnInvestment}
                              style={{
                                // height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                              }}
                            />
                          </Col>
                        </Row>
                      </li>

                      {/* Second Input Field */}
                      <li
                        style={{
                          marginBottom: "15px",
                        }}
                      >
                        <Row className="align-items-center">
                          <Col lg={8} sm={8}>
                            <span
                              style={{ fontWeight: "bold", color: "#13477f" }}
                            >
                              Bonus On Monthly Return
                            </span>
                          </Col>
                          <Col lg={4} sm={4}>
                            <Form.Control
                              type="text"
                              value={response?.bonusOnMonthlyReturn}
                              style={{
                                // height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                              }}
                            />
                          </Col>
                        </Row>
                      </li>

                      <li
                        style={{
                          marginBottom: "15px",
                        }}
                      >
                        <Row className="align-items-center">
                          <Col lg={8} sm={8}>
                            <span
                              style={{ fontWeight: "bold", color: "#13477f" }}
                            >
                              Total Monthly Return
                            </span>
                          </Col>
                          <Col lg={4} sm={4}>
                            <Form.Control
                              type="text"
                              value={response?.totalMonthlyReturn}
                              style={{
                                // height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                              }}
                            />
                          </Col>
                        </Row>
                      </li>
                      <li
                        style={
                          {
                            //   marginBottom: "px",
                          }
                        }
                      >
                        <Row className="align-items-center">
                          <Col lg={8} sm={8}>
                            <span
                              style={{ fontWeight: "bold", color: "#13477f" }}
                            >
                              Yearly Return
                            </span>
                          </Col>
                          <Col lg={4} sm={4}>
                            <Form.Control
                              type="text"
                              value={response?.yearlyReturn}
                              style={{
                                // height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                              }}
                            />
                          </Col>
                        </Row>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default InvestmentCalculator;
