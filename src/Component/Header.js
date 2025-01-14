import React, { useEffect } from "react";
import { AppBar, Toolbar, Box, IconButton, Avatar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { getToken } from "./Helper/Storage";
import axios from "axios";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const Header = ({ onMenuClick }) => {
  const [profileData, setProfileData] = useState();
  const token = getToken();
  const [img, setImg] = useState(null);
  const [show, setShow] = useState(false);
  const handleModal = () => {
    setShow(!show);
  };
  useEffect(() => {
    getImg();
    getUserProfile();
  }, []);
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

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fcf0eb",
        padding: "10px",
        display: { xs: "block", sm: "none" },
      }}
    >
      <Toolbar>
        <Box sx={{ display: { xs: "block", sm: "none" }, mr: 2 }}>
          <IconButton color="black" onClick={onMenuClick}>
            <Menu />
          </IconButton>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
          }}
        >
          {/* <IconButton>
            <Search sx={{ color: "white" }} />
          </IconButton> */}
          {/* <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            color="white"
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
              maxWidth: "400px",
            }}
          /> */}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexGrow: { xs: 1, sm: 0 },
          }}
        >
          {/* <IconButton>
            <Mail sx={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <Settings sx={{ color: "white" }} />
          </IconButton>

          <IconButton>
            <Badge
              sx={{ color: "#7294ff" }}
              badgeContent={""}
              overlap="circular"
            >
              <Notifications sx={{ color: "white" }} />
            </Badge>
          </IconButton> */}

          <IconButton>
            <span className="small me-2" style={{ color: "black" }}>
              {profileData?.userProfile?.firstName}{" "}
              {profileData?.userProfile?.lastName}
            </span>
            <Avatar onClick={handleModal} src={img} alt="Profile" />
          </IconButton>
        </Box>
      </Toolbar>
      <Modal style={{ zIndex: "1300" }} show={show} onHide={handleModal}>
        <Modal.Header closeButton>Upload image</Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                onChange={(e) => setImg(e.target.files[0])}
                type="file"
              />
            </Form.Group>
            <Button onClick={uploadImg}>Upload</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </AppBar>
  );
};

export default Header;
