import React, { useEffect, useState } from "react";
import { Table, Form, Modal, Button, Row, Col } from "react-bootstrap";
import { getToken, getUserdata } from "./Helper/Storage";

import axios from "axios";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";
import toast from "react-hot-toast";
const BankAccountsTable = () => {
  const [bankDetail, setBankDetail] = useState([]);
  const user = getUserdata();
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    ifsc: "",
    branchName: "",
    primaryFlag: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    const payload = {
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      ifsc: formData.ifsc,
      branchName: formData.branchName,
      primaryFlag: formData.primaryFlag,
      userId: user.userId,
    };
    try {
      const response = await axios.post(ApiEndPoints.AddBankDetail, payload, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 200) {
        // setBankDetail(response.data.data);
        toast.success("Bank Account added successfully");
        getBankDetails();
      }
    } catch (error) {
      console.log(error);
      toast.error("Bank Account add failed");
    }
    handleClose();
  };

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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateBankDetail = async (item) => {
    console.log("item", item);

    const payload = {
      // bankName: item.bankName,
      accountNumber: item.accountNumber,
      // ifsc: item.ifsc,
      // branchName: item.branchName,
      primaryFlag: true,
      // userId: item.userId,
    };
    try {
      const response = await axios.post(
        ApiEndPoints.UpdatePrimaryBank,
        payload,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (response.status === 200) {
        // setBankDetail(response.data.data);
        getBankDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row>
        <Col md={12} className="d-flex justify-content-end">
          <Button
            className="custom-button border-0 fw-bold"
            onClick={handleShow}
          >
            Add Bank Details
          </Button>
        </Col>
      </Row>
      <Table striped responsive bordered hover className="mt-3">
        <thead>
          <tr>
            <th className="custom-background">#</th>
            <th className="custom-background">Bank Name</th>
            <th className="custom-background">Account Number</th>
            <th className="custom-background">IFSC</th>
            <th className="custom-background">Branch Name</th>
            <th className="custom-background">Primary</th>
          </tr>
        </thead>
        <tbody>
          {bankDetail.map((account, index) => (
            <tr key={account.id}>
              <td className="custom-background">{index + 1}</td>
              <td className="custom-background">{account.bankName}</td>
              <td className="custom-background">
                {account.accountNumber || "N/A"}
              </td>
              <td className="custom-background">{account.ifsc || "N/A"}</td>
              <td className="custom-background">
                {account.branchName || "N/A"}
              </td>
              <td className="custom-background">
                <Form.Check
                  type="checkbox"
                  checked={account.primaryFlag || false}
                  onChange={() => updateBankDetail(account)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal style={{ zIndex: 9999 }} show={show} onHide={handleClose}>
        <Modal.Header className="custom-background" closeButton>
          <Modal.Title>Add Bank Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-background">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Enter bank name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control
                type="text"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleChange}
                placeholder="Enter IFSC code"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Branch Name</Form.Label>
              <Form.Control
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                placeholder="Enter branch name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrimaryFlag">
              <Form.Check
                type="checkbox"
                label="Is Primary"
                name="primaryFlag"
                checked={formData.primaryFlag}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="custom-background">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="custom-button border-0 " onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BankAccountsTable;
