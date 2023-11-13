import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateOrder() {
  const [customer, setCustomer] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerEmailAddress: "",
    customerUsername: "",
    customerPassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const customerId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/customers/${customerId}`
        );
        const customerData = response.data;

        setCustomer({
          customerFirstName: customerData.customerFirstName,
          customerLastName: customerData.customerLastName,
          customerEmailAddress: customerData.customerEmailAddress,
          customerUsername: customerData.customerUsername,
          customerPassword: customerData.customerPassword,
        });
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomerData();
  }, [customerId]);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8081/customers/update/${customerId}`,
        customer
      );
      navigate("/customers");
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  return (
    <div className="flex justify-center mb-5">
      <form>
        <h1 className="mt-7 mb-5 text-md font-semibold"> Update Customer </h1>

        <div className="mb-2">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="customerFirstName"
            onChange={handleChange}
            value={customer.customerFirstName}
          />
        </div>

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="customerLastName"
          onChange={handleChange}
          value={customer.customerLastName}
        />

        <label>Email Address</label>
        <input
          type="text"
          placeholder="Enter Email Address"
          name="customerEmailAddress"
          onChange={handleChange}
          value={customer.customerEmailAddress}
        />

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          name="customerUsername"
          onChange={handleChange}
          value={customer.customerUsername}
        />

        <label>Password</label>
        <input
          type="text"
          placeholder="Enter Password"
          name="customerPassword"
          onChange={handleChange}
          value={customer.customerPassword}
        />

        <div className="flex justify-end mt-2">
          <button
            onClick={handleClick}
            type="submit"
            className="px-4 py-1 rounded-md bg-black text-white text-base"
          >
            {" "}
            SAVE CUSTOMER{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateOrder;
