import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const UserDashboard = () => {
  return (
    <Container
      fluid
      className="p-3"
      style={{ backgroundColor: "#ffe4e1", minHeight: "100vh" }}
    >
      <Row>
        {/* Sidebar */}
        <Col
          xs={4}
          md={3}
          className="p-3 text-start "
          style={{ backgroundColor: "#fddde6", borderRadius: "15px" }}
        >
          <div className="text-center mb-4">
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#f08080",
                margin: "0 auto",
              }}
            ></div>
            <h5 className="mt-3">Khushal Chobisa</h5>
            <p>Current Date</p>
            <p>Current Time</p>
          </div>
          <ul className="list-unstyled">
            <li>Home</li>
            <li>Profile</li>
            <li>Transaction</li>
            <li>Investment Calculator</li>
            <li>Logout</li>
          </ul>
        </Col>

        {/* Main Dashboard */}
        <Col xs={8} md={9} className="p-1  bg-dark ">
          <h4 className="mb-4 text-center">User Dashboard UI (Mobile)</h4>
          <Row className="g-1 justify-content-between ">
            {/* Investment */}
            <Col xs={6} md={2}>
              <Card
                className="p-3 text-center"
                style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
              >
                <Card.Body>
                  <Card.Title className="small">Investment</Card.Title>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter value"
                  />
                </Card.Body>
              </Card>
            </Col>

            {/* Amount Received */}
            <Col xs={6} md={2}>
              <Card
                className="p-3 text-center"
                style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
              >
                <Card.Body>
                  <Card.Title className="small">Amount Received</Card.Title>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter value"
                    value="55555"
                  />
                </Card.Body>
              </Card>
            </Col>

            {/* TDS Amount */}
            <Col xs={12} md={2}>
              <Card
                className="p-3 text-center"
                style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
              >
                <Card.Body>
                  <Card.Title>TDS Amount</Card.Title>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter value"
                  />
                </Card.Body>
              </Card>
            </Col>

            {/* Total Capital */}
            <Col xs={12} md={2}>
              <Card
                className="p-3 text-center"
                style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
              >
                <Card.Body>
                  <Card.Title>Total Capital</Card.Title>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter value"
                  />
                </Card.Body>
              </Card>
            </Col>

            {/* Current Portfolio */}
            <Col xs={2}>
              <Card
                className="p-3 text-center"
                style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
              >
                <Card.Body>
                  <Card.Title>Current Portfolio</Card.Title>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter value"
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
