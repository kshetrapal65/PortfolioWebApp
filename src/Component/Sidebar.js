import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  IconButton,
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

import { Button, Form, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { getToken, getUserdata, LogOut } from "./Helper/Storage";
import axios from "axios";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";
import toast from "react-hot-toast";

const Sidebar = ({ mobileOpen, onClose }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [bankDetail, setBankDetail] = useState([]);
  const [primarryAccount, setPrimarryAccount] = useState();
  console.log("primarryAccount", primarryAccount);
  const user = getUserdata();

  const navigate = useNavigate();
  useEffect(() => {
    getBankDetails();
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
          response.data.data?.find((item) => item.primaryFlag === true)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [account, setAccount] = useState({
    bankName: primarryAccount?.bankName,
    branchName: primarryAccount?.branchName || "",
    ifsc: primarryAccount?.ifsc || "",
    primaryFlag: primarryAccount?.primaryFlag || "",
    accountNumber: primarryAccount?.accountNumber || "",
  });
  const handleModalClose = () => setShowModal(false);
  const handleModalopen = () => {
    console.log("clicked");

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
  // const drawerContent = (
  //   <Box
  //     sx={{
  //       backgroundColor: "#1f1f2e",
  //       height: "100%",
  //       color: "white",
  //       paddingTop: "10px",
  //       overflowX: "hidden",
  //     }}
  //   >
  //     <List>
  //       <ListItem disablePadding>
  //         <ListItemButton component={Link} to="/">
  //           <ListItemIcon sx={{ color: "white" }}>
  //             <Home />
  //           </ListItemIcon>
  //         </ListItemButton>
  //       </ListItem>
  //       {user?.userType === "User" && (
  //         <>
  //           <ListItem disablePadding>
  //             <ListItemButton component={Link} to="/bank-accounts">
  //               <ListItemIcon sx={{ color: "white" }}>
  //                 <AccountBalance />
  //               </ListItemIcon>
  //             </ListItemButton>
  //           </ListItem>
  //           <ListItem disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon sx={{ color: "white" }}>
  //                 <Visibility onClick={() => handleModalopen()} />
  //               </ListItemIcon>
  //             </ListItemButton>
  //           </ListItem>
  //         </>
  //       )}
  //     </List>
  //     <Box sx={{ flexGrow: 1 }} />
  //     <ListItem disablePadding>
  //       <ListItemButton onClick={() => Logouts()}>
  //         <ListItemIcon sx={{ color: "white" }}>
  //           <Logout />
  //         </ListItemIcon>
  //       </ListItemButton>
  //     </ListItem>
  //   </Box>
  // );
  const drawerContent = (
    <Box
      sx={{
        backgroundColor: "#1f1f2e",
        height: "100%",
        color: "white",
        display: "flex", // Enable flexbox for the Box
        flexDirection: "column", // Arrange children vertically
        paddingTop: "10px",
        overflowX: "hidden",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon sx={{ color: "white" }}>
              <Home />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/profile">
            <ListItemIcon sx={{ color: "white" }}>
              <AccountCircle />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {user?.userType === "User" && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/bank-accounts">
                <ListItemIcon sx={{ color: "white" }}>
                  <AccountBalance />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  <Visibility onClick={() => handleModalopen()} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Box sx={{ flexGrow: 1 }} />{" "}
      {/* Pushes the logout button to the bottom */}
      <ListItem disablePadding>
        <ListItemButton onClick={() => Logouts()}>
          <ListItemIcon sx={{ color: "white" }}>
            <Logout />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </Box>
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
            width: 70,
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
            width: 70,
            backgroundColor: "#1f1f2e",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
      <Modal
        dialogClassName="custom-modal"
        show={showModal}
        onHide={handleModalClose}
        centered
        backdrop="static"
        style={{ zIndex: 1300 }}
      >
        <ModalHeader closeButton>
          <h5>Accout Details</h5>
        </ModalHeader>
        <ModalBody>
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
    </>
  );
};

export default Sidebar;
