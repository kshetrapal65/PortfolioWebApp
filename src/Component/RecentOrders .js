import React from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box } from "@mui/material";

const RecentOrders = () => {
  const orders = [
    {
      customer: "Wade Warren",
      orderNo: "15478256",
      amount: "$124.00",
      status: "Delivered",
      img: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    },
    {
      customer: "Jane Cooper",
      orderNo: "48965786",
      amount: "$365.02",
      status: "Delivered",
      img: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
    {
      customer: "Guy Hawkins",
      orderNo: "78958215",
      amount: "$45.88",
      status: "Cancelled",
      img: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    },
    {
      customer: "Kristin Watson",
      orderNo: "20965732",
      amount: "$65.00",
      status: "Pending",
      img: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    },
    {
      customer: "Cody Fisher",
      orderNo: "95715620",
      amount: "$545.00",
      status: "Delivered",
      img: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
    {
      customer: "Savannah Nguyen",
      orderNo: "78514568",
      amount: "$128.20",
      status: "Delivered",
      img: "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=2",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#1E1E2D",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
      }}
    >
      <h3 className="text-light text-start mb-4">Recent Orders</h3>
      <Table responsive hover variant="dark" className="rounded">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Order No.</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="d-flex align-items-center">
                <img
                  src={order.img}
                  alt={order.customer}
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px" }}
                />
                {order.customer}
              </td>
              <td>{order.orderNo}</td>
              <td>{order.amount}</td>
              <td>
                <span
                  className={`badge px-3 py-2 ${
                    order.status === "Delivered"
                      ? "bg-success"
                      : order.status === "Cancelled"
                        ? "bg-danger"
                        : "bg-warning"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default RecentOrders;
