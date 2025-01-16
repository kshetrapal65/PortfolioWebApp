import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";
import axios from "axios";
import { getToken, getUserdata } from "./Helper/Storage";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";
import { use } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import styles from "./Helper/LoaderCss";
import toast from "react-hot-toast";

const UserProfile = () => {
  const token = getToken();
  const user = getUserdata();
  const [profileData, setProfileData] = useState({
    address: {
      addressLineOne: "",
      addressLineTwo: "",
      landMark: "",
      pincode: "",
      city: "",
      state: "",
    },
    userProfile: {
      panCard: "",
      aadharCard: "",
      maritalStatus: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    getUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    setProfileData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        ApiEndPoints.updateUserProfile,
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Profile update failed. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const getUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(ApiEndPoints.getUserProfile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setProfileData(response?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      {loading && (
        <div style={styles.divStyle}>
          <PulseLoader
            loading={loading}
            color="#F9AB75"
            style={styles.backdrop}
          />
        </div>
      )}
      <Row className="text-black">
        <Col md={12} className="mx-auto">
          <h3 className="text-start mb-4">
            {user?.userType == "Admin"
              ? "Update Admin Profile"
              : "Update User Profile"}
          </h3>
          <Form onSubmit={handleSubmit}>
            {/* Address Section */}
            <Card
              style={{
                background:
                  "linear-gradient(180deg, #F7E7DF 50%, #FFD5C7 100%)",
              }}
              className=" mb-2 shadow  "
            >
              <Card.Body>
                <Row>
                  <Col className="text-start" md={12}>
                    <h5 className="mt-4 mb-3">User Information</h5>
                  </Col>

                  <Col className="text-start" lg={4} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="userProfile.firstName"
                        value={profileData?.userProfile?.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter First Name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={4} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="userProfile.lastName"
                        value={profileData?.userProfile?.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={4} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="userProfile.phoneNumber"
                        value={profileData?.userProfile?.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Phone Number"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={4} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="userProfile.gender"
                        value={profileData?.userProfile?.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={4} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>PAN Card</Form.Label>
                      <Form.Control
                        type="text"
                        name="userProfile.panCard"
                        value={profileData?.userProfile?.panCard}
                        onChange={handleInputChange}
                        placeholder="Enter PAN Card Number"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={4} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Aadhar Card</Form.Label>
                      <Form.Control
                        type="text"
                        name="userProfile.aadharCard"
                        value={profileData?.userProfile?.aadharCard}
                        onChange={handleInputChange}
                        placeholder="Enter Aadhar Card Number"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={4} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Marital Status</Form.Label>
                      <Form.Select
                        name="userProfile.maritalStatus"
                        value={profileData?.userProfile?.maritalStatus}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card
              style={{
                background:
                  "linear-gradient(180deg, #F7E7DF 50%, #FFD5C7 100%)",
              }}
              className="shadow"
            >
              <Card.Body>
                <Row>
                  <Col md={12} className="text-start">
                    <h5 className="mb-3">Address Information</h5>
                  </Col>
                  <Col className="text-start" lg={6} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address Line 1</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.addressLineOne"
                        value={profileData?.address?.addressLineOne}
                        onChange={handleInputChange}
                        placeholder="Enter Address Line 1"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={6} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.addressLineTwo"
                        value={profileData?.address?.addressLineTwo}
                        onChange={handleInputChange}
                        placeholder="Enter Address Line 2"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={6} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Landmark</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.landMark"
                        value={profileData?.address?.landMark}
                        onChange={handleInputChange}
                        placeholder="Enter Landmark"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={6} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.pincode"
                        value={profileData?.address?.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter Pincode"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={6} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.city"
                        value={profileData?.address?.city}
                        onChange={handleInputChange}
                        placeholder="Enter City"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="text-start" lg={6} md={6} sm={12} xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.state"
                        value={profileData?.address?.state}
                        onChange={handleInputChange}
                        placeholder="Enter State"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* User Profile Section */}

            {/* Submit Button */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Row className="d-grid gap-2 mt-1 ">
              <Col
                className="text-lg-end text-md-end text-end "
                md={12}
                lg={12}
              >
                <Button
                  className="fw-bold "
                  style={{
                    backgroundColor: "#F9AB75",
                    color: "#fff",
                    border: "none",
                  }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
