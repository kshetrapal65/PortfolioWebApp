import React, { useState } from "react";
import "./Login.css";
import ApiEndPoints from "../NetworkCall/ApiEndPoints";
import { setToken, setUserData } from "../Helper/Storage";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
        console.log("Login successful:", data);
        setToken(data?.data?.token);
        setUserData(JSON?.stringify(data?.data));
        // navigate("/");
        window.location.reload();
        // Handle redirection or token storage here
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container1">
      <img
        className="wave"
        src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png"
        alt="wave"
      />
      <div className="img">
        <img
          src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/bg.svg"
          alt="background"
        />
      </div>
      <div className="login-content">
        <form className="form1" onSubmit={handleSubmit}>
          <img
            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
            alt="avatar"
          />
          <h2 className="title">Welcome</h2>
          <div className={`input-div one ${formData.username ? "focus" : ""}`}>
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <h5>Username</h5>
              <input
                type="text"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`input-div pass ${formData.password ? "focus" : ""}`}>
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <h5>Password</h5>
              <input
                type="password"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Link to="/sign-up">Sign Up</Link>
              <input type="submit" className="btn" value="Login" />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
