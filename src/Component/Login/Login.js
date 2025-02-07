import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiEndPoints from "../NetworkCall/ApiEndPoints";
import { setToken, setUserData } from "../Helper/Storage";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import styles from "../Helper/LoaderCss";
import PulseLoader from "react-spinners/PulseLoader";
import img from "../../Assets/Images/Websitelogo-02.png";
import img1 from "../../Assets/Images/newsticker.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(ApiEndPoints.Login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid response format.");
      }

      setLoading(false);

      if (response.ok) {
        setToken(data?.data?.token);
        setUserData(JSON.stringify(data?.data));
        window.location.reload();
        navigate("/");
        toast.success("Login successful!");
      } else {
        setError(data.message || "Login failed. Please try again.");
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center  "
      style={{ backgroundColor: "#fcf0eb" }}
    >
      {loading && (
        <div style={styles.divStyle}>
          <PulseLoader
            loading={loading}
            color="#F9AB75"
            style={styles.backdrop}
          />
        </div>
      )}
      <Row className="w-100 mt-3">
        <Col
          xs={12}
          md={6}
          className=" d-md-flex justify-content-center align-items-center mt-3"
        >
          <img
            src={img}
            width="60%"
            height={"60%"}
            alt="Background"
            className="img-fluid tt"
          />
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div
            className="p-4 rounded custom-background shadow bg-white"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <div className="text-center mb-4">
              <img src={img1} alt="Avatar" style={{ height: "80px" }} />
              <h2 className="mt-3">Welcome</h2>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="text-start w-100">
                  Email or Phone
                </Form.Label>{" "}
                {/* Aligns label to start */}
                <Form.Control
                  // type="email"
                  name="email"
                  placeholder="Enter your email or phone"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group
                controlId="password"
                className="mb-3 position-relative"
              >
                <Form.Label className="text-start w-100">Password</Form.Label>{" "}
                {/* Aligns label to start */}
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </div>
              </Form.Group>

              {/* {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )} */}
              {loading ? (
                <div className="text-center my-3">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-end">
                    Dont have an account?
                    <Link to="/sign-up" className="text-muted ms-1">
                      Sign Up
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    // style={{ backgroundColor: "#093d62", border: "none" }}
                    className="w-100 mt-3 fw-bold custom-button border-0 "
                  >
                    Login
                  </Button>
                  <hr />
                  <Button
                    onClick={() => window.open("https://maharanacapital.in/")}
                    // style={{ backgroundColor: "#093d62", border: "none" }}
                    className="w-100 mt-1 fw-bold custom-button border-0 "
                  >
                    Home
                  </Button>
                </>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
