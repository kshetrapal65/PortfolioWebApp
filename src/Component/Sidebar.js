import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Home,
  BarChart,
  ShoppingCart,
  Settings,
  Logout,
  Visibility,
  VisibilityOff,
  AccountBalance,
  AccountCircle,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "react-bootstrap";
import { getToken, getUserdata, LogOut } from "./Helper/Storage";
import axios from "axios";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";
import toast from "react-hot-toast";
import { FaCoins } from "react-icons/fa";
import moment from "moment/moment";

const Sidebar = ({ mobileOpen, onClose }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [currentTime, setCurrentTime] = useState(moment());
  const [show, setShow] = useState(false);
  const [bankDetail, setBankDetail] = useState([]);
  const [img, setImg] = useState(null);
  const [profileData, setProfileData] = useState();
  const [primarryAccount, setPrimarryAccount] = useState();
  const [account, setAccount] = useState({
    bankName: primarryAccount?.bankName,
    branchName: primarryAccount?.branchName || "",
    ifsc: primarryAccount?.ifsc || "",
    primaryFlag: primarryAccount?.primaryFlag || "",
    accountNumber: primarryAccount?.accountNumber || "",
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const user = getUserdata();
  const token = getToken();

  const navigate = useNavigate();
  useEffect(() => {
    getBankDetails();
    getUserProfile();
    getImg();
  }, []);
  const getBankDetails = async () => {
    try {
      const response = await axios.get(ApiEndPoints.getBankDetails, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 200) {
        setBankDetail(response.data.data);
        setPrimarryAccount(
          response.data.data?.find((item) => item.primaryFlag == true)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getImg = async () => {
    try {
      const response = await axios.get(ApiEndPoints.getImage, {
        responseType: "arraybuffer", // Correct placement of responseType
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], { type: "image/jpeg" });

      // Generate a URL for the Blob
      const imageUrl = URL.createObjectURL(blob);

      setImg(imageUrl);
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };
  const uploadImg = async (e) => {
    e.preventDefault();
    const file = img;
    const formData = new FormData();
    formData.append("profilePic", file);
    try {
      const response = await axios.post(ApiEndPoints.uploadImage, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        getImg();
        setShow(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleModal = () => {
    setShow(!show);
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalopen = () => {
    getBankDetails();

    setShowModal(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    resetForm();
  };
  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setAccount({
      bankName: primarryAccount?.bankName || "",
      branchName: primarryAccount?.branchName || "",
      ifsc: primarryAccount?.ifsc || "",
      primaryFlag: primarryAccount?.primaryFlag || "",
      accountNumber: primarryAccount?.accountNumber || "",
    });
  };
  const Logouts = () => {
    LogOut();
    navigate("/");
    toast.success("Logout successfully!");
    window.location.reload();
  };
  const DashboardCard = ({ title, value, icon, color, backgroundColor }) => {
    return (
      <Card
        style={{
          backgroundColor: backgroundColor,
          // color: "#fff",
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
            <h6 className="mb-0  mt-2">{title}</h6>
          </Col>
        </Row>
        <Row>
          <Col className="text-start ">
            <h4 className="mb-0 fw-bold">{value}</h4>
          </Col>
        </Row>
      </Card>
    );
  };
  const getUserProfile = async () => {
    try {
      // setLoading(true);
      const response = await axios.get(ApiEndPoints.getUserProfile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setProfileData(response?.data?.data);
        // setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      // setLoading(false);
    }
  };

  const drawerContent = (
    <Box
      sx={{
        background: "linear-gradient(180deg, #fcf0eb 0%, #fce0db 100%)",
        height: "100%",
        color: "white",
        display: "flex",
        flexDirection: "column",
        paddingTop: "10px",
        overflowX: "hidden",
      }}
    >
      <div className="d-flex flex-column align-items-center">
        <h7 className="text-black">{currentTime.format("MMMM Do, YYYY")}</h7>
        <p className="text-black">{currentTime.format("HH:mm:ss")}</p>
      </div>

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon onClick={() => onClose()} sx={{ color: "black" }}>
              Home
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/profile">
            <ListItemIcon onClick={() => onClose()} sx={{ color: "black" }}>
              Profile
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/transaction">
            <ListItemIcon onClick={() => onClose()} sx={{ color: "black" }}>
              Transaction
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {user?.userType === "User" && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/transaction">
                <ListItemIcon onClick={() => onClose()} sx={{ color: "black" }}>
                  Transaction
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon
                  onClick={() => {
                    handleModalopen();
                    onClose();
                  }}
                  sx={{ color: "black" }}
                >
                  {/* <Visibility  /> */}
                  Investment Calculator
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </>
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={() => Logouts()}>
            <ListItemIcon sx={{ color: "black" }}>
              {/* <Visibility onClick={() => handleModalopen()} /> */}
              Logout
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      {/* <ListItem disablePadding>
        <Tooltip title="Logout">
          <ListItemButton onClick={() => Logouts()}>
            <ListItemIcon sx={{ color: "black" }}>
              <Logout />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </ListItem> */}
    </Box>
    // <Container
    //   fluid
    //   className="p-3"
    //   style={{ backgroundColor: "#ffe4e1", minHeight: "100vh" }}
    // >
    //   <Row>

    //     <Col
    //       xs={4}
    //       md={12}
    //       className="p-3"
    //       style={{ backgroundColor: "#fddde6", borderRadius: "15px" }}
    //     >
    //       <div className="text-center mb-4">
    //         <div
    //           style={{
    //             width: "100px",
    //             height: "100px",
    //             borderRadius: "50%",
    //             backgroundColor: "#f08080",
    //             margin: "0 auto",
    //           }}
    //         ></div>
    //         <h5 className="mt-3">Khushal Chobisa</h5>
    //         <p>Current Date</p>
    //         <p>Current Time</p>
    //       </div>
    //       <ul className="list-unstyled">
    //         <li>Home</li>
    //         <li>Profile</li>
    //         <li>Transaction</li>
    //         <li>Investment Calculator</li>
    //         <li>Logout</li>
    //       </ul>
    //     </Col>

    //     <Col xs={8} md={9} className="p-3">
    //     <h4 className="mb-4 text-center">User Dashboard UI (Mobile)</h4>
    //     <Row className="g-3">

    //       <Col xs={12} md={6}>
    //         <Card
    //           className="p-3 text-center"
    //           style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
    //         >
    //           <Card.Body>
    //             <Card.Title>Investment</Card.Title>
    //             <input
    //               type="text"
    //               className="form-control"
    //               placeholder="Enter value"
    //             />
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //       <Col xs={12} md={6}>
    //         <Card
    //           className="p-3 text-center"
    //           style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
    //         >
    //           <Card.Body>
    //             <Card.Title>Amount Received</Card.Title>
    //             <input
    //               type="text"
    //               className="form-control"
    //               placeholder="Enter value"
    //             />
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //       <Col xs={12} md={6}>
    //         <Card
    //           className="p-3 text-center"
    //           style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
    //         >
    //           <Card.Body>
    //             <Card.Title>TDS Amount</Card.Title>
    //             <input
    //               type="text"
    //               className="form-control"
    //               placeholder="Enter value"
    //             />
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //       <Col xs={12} md={6}>
    //         <Card
    //           className="p-3 text-center"
    //           style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
    //         >
    //           <Card.Body>
    //             <Card.Title>Total Capital</Card.Title>
    //             <input
    //               type="text"
    //               className="form-control"
    //               placeholder="Enter value"
    //             />
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //       <Col xs={12}>
    //         <Card
    //           className="p-3 text-center"
    //           style={{ backgroundColor: "#ffe4e1", borderRadius: "15px" }}
    //         >
    //           <Card.Body>
    //             <Card.Title>Current Portfolio</Card.Title>
    //             <input
    //               type="text"
    //               className="form-control"
    //               placeholder="Enter value"
    //             />
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Col>
    //   </Row>
    // </Container>
  );
  const drawerContent1 = (
    // <Box
    //   sx={{
    //     backgroundColor: "#FFFDD0",
    //     height: "100%",
    //     color: "white",
    //     display: "flex",
    //     flexDirection: "column",
    //     paddingTop: "10px",
    //     overflowX: "hidden",
    //   }}
    // >
    //   <List>
    //     <ListItem disablePadding>
    //       <Tooltip title="Home">
    //         <ListItemButton component={Link} to="/">
    //           <ListItemIcon sx={{ color: "black" }}>
    //             <Home />
    //           </ListItemIcon>
    //         </ListItemButton>
    //       </Tooltip>
    //     </ListItem>
    //     <ListItem disablePadding>
    //       <Tooltip title="Profile">
    //         <ListItemButton component={Link} to="/profile">
    //           <ListItemIcon sx={{ color: "black" }}>
    //             <AccountCircle />
    //           </ListItemIcon>
    //         </ListItemButton>
    //       </Tooltip>
    //     </ListItem>
    //     {user?.userType === "User" && (
    //       <>
    //         <ListItem disablePadding>
    //           <Tooltip title="Accounts List">
    //             <ListItemButton component={Link} to="/bank-accounts">
    //               <ListItemIcon sx={{ color: "black" }}>
    //                 <AccountBalance />
    //               </ListItemIcon>
    //             </ListItemButton>
    //           </Tooltip>
    //         </ListItem>
    //         <ListItem disablePadding>
    //           <Tooltip title="View Bank Detail">
    //             <ListItemButton>
    //               <ListItemIcon sx={{ color: "black" }}>
    //                 <Visibility onClick={() => handleModalopen()} />
    //               </ListItemIcon>
    //             </ListItemButton>
    //           </Tooltip>
    //         </ListItem>
    //       </>
    //     )}
    //   </List>
    //   <Box sx={{ flexGrow: 1 }} />{" "}
    //   <ListItem disablePadding>
    //     <Tooltip title="Logout">
    //       <ListItemButton onClick={() => Logouts()}>
    //         <ListItemIcon sx={{ color: "black" }}>
    //           <Logout />
    //         </ListItemIcon>
    //       </ListItemButton>
    //     </Tooltip>
    //   </ListItem>
    // </Box>
    <Container
      fluid
      className=""
      style={{
        // borderRadius: "15px",
        // background: "linear-gradient(180deg, #fcf0eb 0%, #fce0db 100%)",
        minHeight: "100vh",
      }}
    >
      <Row>
        {/* Sidebar */}
        <Col
          xs={12}
          md={12}
          sm={12}
          className="p-3 text-start "
          style={{
            background: "linear-gradient(90deg, #F7E7DF 50%, #FFD5C7 100%)",
            // borderRadius: "15px",
            minHeight: "100vh",
          }}
        >
          <div className="text-center mb-4">
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                // backgroundColor: "#f08080",
                margin: "0 auto",
              }}
            >
              <img
                src={img}
                alt="User"
                onClick={handleModal}
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            </div>
            <h5 className="mt-3">
              {profileData?.userProfile?.firstName}{" "}
              {profileData?.userProfile?.lastName}
            </h5>
            <h7 className="">{currentTime.format("MMMM Do, YYYY")}</h7>
            <p>{currentTime.format("HH:mm:ss")}</p>
          </div>
          {/* <ul className="list-unstyled">
            <li>Home</li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>Transaction</li>
            <li>Investment Calculator</li>
            <li>Logout</li>
          </ul> */}
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon sx={{ color: "black" }}>Home</ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon sx={{ color: "black" }}>Profile</ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/transaction">
                <ListItemIcon onClick={() => onClose()} sx={{ color: "black" }}>
                  Transaction
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            {user?.userType === "User" && (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/bank-accounts">
                    <ListItemIcon sx={{ color: "black" }}>
                      Bank Account's
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/transaction">
                    <ListItemIcon sx={{ color: "black" }}>
                      Transaction
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon
                      onClick={() => handleModalopen()}
                      sx={{ color: "black" }}
                    >
                      {/* <Visibility  /> */}
                      View Bank Detail
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/calculator">
                    <ListItemIcon sx={{ color: "black" }}>
                      {/* <Visibility  /> */}
                      Investment Calculator
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </>
            )}
            <ListItem disablePadding>
              <ListItemButton onClick={() => Logouts()}>
                <ListItemIcon sx={{ color: "black" }}>
                  {/* <Visibility onClick={() => handleModalopen()} /> */}
                  Logout
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Col>

        {/* Main Dashboard */}
        {/* <Col xs={8} md={9} className="p-1    ">
          <h4 className="mb-4 text-center">User Dashboard UI (Mobile)</h4>
          <Row className="g-1 justify-content-between ">
            
            <Col xs={6} md={2}>
              <DashboardCard
                title="Total investment"
                value="454545"
                icon={<FaCoins style={{ color: "#00c98d" }} />}
                color="#155345"
                percentage={-3}
                trend="down"
                width="250px"
                backgroundColor="#FFDAB9"
              />
            </Col>

            
            <Col xs={6} md={2}>
              <DashboardCard
                title="Amount Received"
                value="454545"
                icon={<FaCoins style={{ color: "#00c98d" }} />}
                color="#155345"
                percentage={-3}
                trend="down"
                width="250px"
                backgroundColor="#FFDAB9"
              />
            </Col>

             
            <Col xs={12} md={2}>
              <DashboardCard
                title="TDS Amount"
                value="454545"
                icon={<FaCoins style={{ color: "#00c98d" }} />}
                color="#155345"
                percentage={-3}
                trend="down"
                width="250px"
                backgroundColor="#FFDAB9"
              />
            </Col>

             
            <Col xs={12} md={2}>
              <DashboardCard
                title="Total Capital"
                value="454545"
                icon={<FaCoins style={{ color: "#00c98d" }} />}
                color="#155345"
                percentage={-3}
                trend="down"
                width="250px"
                backgroundColor="#FFDAB9"
              />
            </Col>

             
            <Col xs={2} md={2}>
              <DashboardCard
                title="Current Portfolio"
                value="454545"
                icon={<FaCoins style={{ color: "#00c98d" }} />}
                color="#155345"
                percentage={-3}
                trend="down"
                width="250px"
                backgroundColor="#FFDAB9"
              />
            </Col>
          </Row>
        </Col> */}
      </Row>
    </Container>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "#1f1f2e",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: 250,
            // backgroundColor: "#1f1f2e",
          },
        }}
        open
      >
        {drawerContent1}
      </Drawer>
      <Modal
        dialogClassName="custom-modal"
        show={showModal}
        onHide={handleModalClose}
        centered
        backdrop="static"
        style={{
          zIndex: 1300,
        }}
      >
        <ModalHeader className="custom-background" closeButton>
          <h5>Accout Details</h5>
        </ModalHeader>
        <ModalBody className="custom-background">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                name="bankName"
                placeholder="Enter product name"
                value={primarryAccount?.bankName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                placeholder="Enter address"
                value={primarryAccount?.accountNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>IFSC</Form.Label>
              <Form.Control
                type="text"
                name="ifsc"
                placeholder="Enter owner name"
                value={primarryAccount?.ifsc}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Branch Name</Form.Label>
              <Form.Control
                // type="number"
                name="branchName"
                value={primarryAccount?.branchName}
                placeholder="Enter quantity"
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* <Button className="custom-button mt-2" type="submit">
              
            </Button>{" "} */}
            {/* {product.id && (
              <Button variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            )} */}
          </Form>
        </ModalBody>
      </Modal>
      <Modal style={{ zIndex: "1300" }} show={show} onHide={handleModal}>
        <Modal.Header className="custom-background" closeButton>
          Upload image
        </Modal.Header>

        <Modal.Body className="custom-background">
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                onChange={(e) => setImg(e.target.files[0])}
                type="file"
              />
            </Form.Group>
            <Button className="custom-button border-0 mt-2" onClick={uploadImg}>
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Sidebar;
