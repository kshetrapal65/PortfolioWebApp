import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { getToken } from "./Helper/Storage";

import axios from "axios";
import ApiEndPoints from "./NetworkCall/ApiEndPoints";
const BankAccountsTable = () => {
  const [bankDetail, setBankDetail] = useState([]);

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
      bankName: item.bankName,
      accountNumber: item.accountNumber,
      ifsc: item.ifsc,
      branchName: item.branchName,
      primaryFlag: true,
    };
    try {
      const response = await axios.post(ApiEndPoints.AddBankDetail, payload, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 200) {
        // setBankDetail(response.data.data);
        getBankDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [bankAccounts, setBankAccounts] = useState(bankDetail);

  const handlePrimaryChange = (id) => {
    const updatedAccounts = bankAccounts.map((account) =>
      account.id === id
        ? { ...account, primaryFlag: true }
        : { ...account, primaryFlag: false }
    );
    setBankAccounts(updatedAccounts);
  };

  return (
    <Table striped bordered hover variant="dark" className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Bank Name</th>
          <th>Account Number</th>
          <th>IFSC</th>
          <th>Branch Name</th>
          <th>Primary</th>
        </tr>
      </thead>
      <tbody>
        {bankDetail.map((account, index) => (
          <tr key={account.id}>
            <td>{index + 1}</td>
            <td>{account.bankName}</td>
            <td>{account.accountNumber || "N/A"}</td>
            <td>{account.ifsc || "N/A"}</td>
            <td>{account.branchName || "N/A"}</td>
            <td>
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
  );
};

export default BankAccountsTable;
