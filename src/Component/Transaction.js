// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, Col, Form, Row, Table } from "react-bootstrap";
// import ApiEndPoints from "./NetworkCall/ApiEndPoints";
// import { getToken, getUserdata } from "./Helper/Storage";

// export const Transaction = () => {
//   const user = getUserdata();
//   useEffect(() => {
//     getTransaction();
//   }, []);

//   const [transaction, setTransaction] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");

//   const getTransaction = async () => {
//     try {
//       const response = await axios.get(
//         user?.userType === "Admin"
//           ? ApiEndPoints.getAllTransactions
//           : ApiEndPoints.getUserTransactions,
//         { headers: { Authorization: `Bearer ${getToken()}` } }
//       );
//       console.log(response);

//       if (response?.status === 200) {
//         setTransaction(response?.data?.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleFilter = () => {
//     if (!selectedDate) {
//       alert("Please select a date.");
//       return;
//     }

//     const filtered = transaction.filter((t) => {
//       const transactionDate = new Date(t.transactionDate);
//       const filterDate = new Date(selectedDate);
//       return transactionDate.toDateString() === filterDate.toDateString();
//     });

//     setFilteredTransactions(filtered);
//   };

//   const handleClearFilter = () => {
//     setSelectedDate("");
//     setFilteredTransactions(transaction);
//   };
//   return (
//     <div>
//       {" "}
//       <Row className="mb-3">
//         <Col md={3}>
//           <Form.Group controlId="transactionDate">
//             <Form.Label className="text-black">
//               Select Transaction Date
//             </Form.Label>
//             <Form.Control
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={3} className="d-flex align-items-end">
//           <Button variant="primary" onClick={handleFilter}>
//             Filter
//           </Button>
//           <Button
//             variant="secondary"
//             onClick={handleClearFilter}
//             className="ms-2"
//           >
//             Clear
//           </Button>
//         </Col>
//       </Row>
//       <Table striped responsive bordered hover className="mt-3">
//         <thead>
//           <tr>
//             <th className="custom-background">#</th>
//             <th className="custom-background">Amount</th>
//             <th className="custom-background">Portfolio Id</th>
//             <th className="custom-background">Transaction Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTransactions?.map((transaction, index) => (
//             <tr key={transaction.id}>
//               <td className="custom-background">{index + 1}</td>
//               <td className="custom-background">
//                 {transaction?.amount || "N/A"}
//               </td>
//               <td className="custom-background">
//                 {transaction?.portfolioId || "N/A"}
//               </td>
//               <td className="custom-background">
//                 {transaction?.transactionDate || "N/A"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";
import { getToken, getUserdata } from "./Helper/Storage";

export const Transaction = () => {
  const user = getUserdata();
  const [transaction, setTransaction] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    try {
      const response = await axios.get(
        user?.userType === "Admin"
          ? ApiEndPoints.getAllTransactions
          : ApiEndPoints.getUserTransactions,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log(response);

      if (response?.status === 200) {
        setTransaction(response?.data?.data);
        setFilteredTransactions(response?.data?.data); // Initially set filtered transactions to all transactions
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const filtered = transaction.filter((t) => {
      const transactionDate = new Date(t.transactionDate);
      const filterDate = new Date(selectedDate);
      return transactionDate.toDateString() === filterDate.toDateString();
    });

    setFilteredTransactions(filtered);
  };

  const handleClearFilter = () => {
    setSelectedDate("");
    setFilteredTransactions(transaction); // Reset to the original data
  };

  return (
    <div>
      {/* Date Filter Section */}
      <Row className="mb-3 mt-1   justify-content-end">
        <Col className="text-end" xs={7} md={3} lg={3}>
          <Form.Group controlId="transactionDate">
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3} xs={5} lg={2} className=" text-lg-start   text-end   ">
          <Button className="custom-button border-0" onClick={handleFilter}>
            Filter
          </Button>
          <Button
            variant="secondary"
            onClick={handleClearFilter}
            className="ms-2"
          >
            Clear
          </Button>
        </Col>
      </Row>

      {/* Transactions Table */}
      <Table striped responsive bordered hover className="mt-3">
        <thead>
          <tr>
            <th className="custom-background">#</th>
            <th className="custom-background">Amount</th>
            <th className="custom-background">Portfolio Id</th>
            <th className="custom-background">Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions?.map((transaction, index) => (
            <tr key={transaction.id}>
              <td className="custom-background">{index + 1}</td>
              <td className="custom-background">
                {transaction?.amount || "N/A"}
              </td>
              <td className="custom-background">
                {transaction?.portfolioId || "N/A"}
              </td>
              <td className="custom-background">
                {transaction?.transactionDate || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
