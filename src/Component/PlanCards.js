import React from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function PlanCards({ plans }) {
  const data = plans;
  console.log("plans", plans);

  const plan = [
    {
      type: "Monthly",
      details: [
        "Investment",
        "Monthly ROI",
        "Bonus on ROI",
        "Monthly Income",
        "Monthly TDS",
      ],
    },
    {
      type: "Yearly",
      details: [
        "Investment",
        "Monthly ROI",
        "Bonus on ROI",
        "Monthly Income",
        "Monthly TDS",
      ],
    },
  ];

  return (
    <Container
      className="py-4   mt-3"
      style={{ backgroundColor: "#fcf0eb", borderRadius: "20px" }}
    >
      <Row className="justify-content-center">
        <Col
          className="shadow     align-items-center justify-content-center   rounded-5 text-center "
          lg={10}
        >
          <Row className="d-flex mt-3 align-items-center justify-content-center">
            {plans?.map((plan, index) => (
              <Col sm={12} md={5} key={index} className="mb-4    ">
                <Card
                  style={{
                    background:
                      " linear-gradient(90deg, #F7E7DF 50%, #FFD5C7 100%)",
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                  className="shadow"
                >
                  <Card.Body className="">
                    <Card.Title
                      className="text-center"
                      style={{ fontWeight: "bold", color: "#13477f" }}
                    >
                      Plan Type
                    </Card.Title>
                    <Row className="justify-content-center mb-2">
                      <Col
                        style={{
                          flex: "1",
                          maxWidth: "50%",

                          borderRadius: "10px",
                          backgroundColor: "#F9AB75",
                          border: "1px solid #ccc",
                          alignItems: "center",
                        }}
                        className="text-white fw-bold"
                        lg={6}
                      >
                        {plan?.planType}
                      </Col>
                    </Row>

                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "15px",
                          color: "#000",
                        }}
                      >
                        <span style={{ flex: "1", color: "#13477f" }}>
                          Investment
                        </span>
                        <Form.Control
                          type="text"
                          readOnly
                          value={plan?.investedAmount}
                          style={{
                            flex: "1",
                            height: "30px",
                            marginLeft: "10px",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                          }}
                        />
                      </li>

                      <li
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "15px",
                          color: "#000",
                        }}
                      >
                        <span style={{ flex: "1", color: "#13477f" }}>
                          Monthly ROI
                        </span>
                        <Form.Control
                          type="text"
                          readOnly
                          value={plan?.yearlyReturn}
                          style={{
                            flex: "1",
                            height: "30px",
                            marginLeft: "10px",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                          }}
                        />
                      </li>
                      <li
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "15px",
                          color: "#000",
                        }}
                      >
                        <span style={{ flex: "1", color: "#13477f" }}>
                          Bonus on ROI
                        </span>
                        <Form.Control
                          type="text"
                          readOnly
                          value={plan?.yearlyTds}
                          style={{
                            flex: "1",
                            height: "30px",
                            marginLeft: "10px",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                          }}
                        />
                      </li>
                      <li
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "15px",
                          color: "#000",
                        }}
                      >
                        <span style={{ flex: "1", color: "#13477f" }}>
                          Monthly Income
                        </span>
                        <Form.Control
                          type="text"
                          readOnly
                          value={plan?.totalPayable}
                          style={{
                            flex: "1",
                            height: "30px",
                            marginLeft: "10px",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                          }}
                        />
                      </li>
                      <li
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "15px",
                          color: "#000",
                        }}
                      >
                        <span style={{ flex: "1", color: "#13477f" }}>
                          Monthly TDS
                        </span>
                        <Form.Control
                          type="text"
                          readOnly
                          value={plan?.monthlyReturnOnInvestment}
                          style={{
                            flex: "1",
                            height: "30px",
                            marginLeft: "10px",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                          }}
                        />
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
    // <Container
    //   className="py-4   mt-5"
    //   style={{ backgroundColor: "#fcf0eb", borderRadius: "20px" }}
    // >
    //   <Row className="justify-content-center">
    //     <Col
    //       className="shadow  d-flex align-items-center justify-content-center   rounded-5 text-center "
    //       lg={10}
    //     >
    //       <Row className="d-flex mt-3 align-items-center justify-content-center">
    //         {plan.map((plan, index) => (
    //           <Col sm={12} md={5} key={index} className="mb-4">
    //             <Card
    //               style={{
    //                 background:
    //                   "linear-gradient(90deg, #F7E7DF 50%, #FFD5C7 100%)",
    //                 borderRadius: "20px",
    //                 padding: "20px",
    //               }}
    //               className="shadow"
    //             >
    //               <Card.Body>
    //                 <Card.Title
    //                   className="text-center"
    //                   style={{ fontWeight: "bold", color: "#000" }}
    //                 >
    //                   Plan Type
    //                 </Card.Title>
    //                 <Row className="justify-content-center mb-2">
    //                   <Col
    //                     style={{
    //                       flex: "1",
    //                       maxWidth: "50%",

    //                       borderRadius: "10px",
    //                       backgroundColor: "#fff",
    //                       border: "1px solid #ccc",
    //                       alignItems: "center",
    //                     }}
    //                     className=""
    //                     lg={6}
    //                   >
    //                     {plan?.type}
    //                   </Col>
    //                 </Row>

    //                 <ul style={{ listStyleType: "none", padding: 0 }}>
    //                   {plan.details.map((detail, idx) => (
    //                     <li
    //                       key={idx}
    //                       style={{
    //                         display: "flex",
    //                         justifyContent: "space-between",
    //                         alignItems: "center",
    //                         marginBottom: "15px",
    //                         color: "#000",
    //                       }}
    //                     >
    //                       <span style={{ flex: "1" }}>{detail}</span>
    //                       <Form.Control
    //                         type="text"
    //                         value="55454"
    //                         style={{
    //                           flex: "1",
    //                           height: "30px",
    //                           marginLeft: "10px",
    //                           borderRadius: "10px",
    //                           backgroundColor: "#fff",
    //                           border: "1px solid #ccc",
    //                         }}
    //                       />
    //                     </li>
    //                   ))}
    //                 </ul>
    //               </Card.Body>
    //             </Card>
    //           </Col>
    //         ))}
    //       </Row>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export default PlanCards;
