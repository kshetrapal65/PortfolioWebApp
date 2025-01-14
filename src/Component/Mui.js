// Import necessary libraries
import React from "react";
import {
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Mui() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigationItems = [
    "Home",
    "Profile",
    "Transaction",
    "Investment Calculator",
    "Logout",
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": { width: 240, backgroundColor: "#ffe4e1" },
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#000" }}>
            Khushal Chobisa
          </Typography>
          <Typography variant="body2" sx={{ color: "#000" }}>
            Current Date & Time
          </Typography>
        </Box>
        <Divider />
        <List>
          {navigationItems.map((text, index) => (
            <ListItem
              button
              key={index}
              onClick={() => alert(`${text} Clicked`)}
            >
              <ListItemText
                primary={text}
                sx={{ textAlign: "center", color: "#000" }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Dashboard Section */}
        <Grid container spacing={3}>
          {[
            "Investment",
            "Amount Received",
            "TDS Amount",
            "Total Capital",
            "Current Portfolio",
          ].map((label, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "#ffe4e1",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: "#000" }}>
                  {label}
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    height: 40,
                    backgroundColor: "#fff",
                    borderRadius: 1,
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Plan Section */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {["Monthly", "Yearly"].map((planType, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={3}
                sx={{ p: 2, backgroundColor: "#ffe4e1", borderRadius: 2 }}
              >
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", mb: 2, color: "#000" }}
                >
                  Plan Type - {planType}
                </Typography>
                <List>
                  {[
                    "Investment",
                    planType === "Monthly" ? "Monthly ROI" : "Yearly ROI",
                    "Bonus on ROI",
                    planType === "Monthly" ? "Monthly Income" : "Yearly Income",
                    planType === "Monthly" ? "Monthly TDS" : "Yearly TDS",
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ py: 0 }}>
                      <ListItemText primary={item} sx={{ color: "#000" }} />
                      <Box
                        sx={{
                          ml: 2,
                          width: "50%",
                          height: 30,
                          backgroundColor: "#fff",
                          borderRadius: 1,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Mui;
