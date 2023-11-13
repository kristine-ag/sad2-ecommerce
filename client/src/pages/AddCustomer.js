import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCustomer() {
  const [customer, setCustomer] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerEmailAddress: "",
    customerUsername: "",
    customerPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const {
        customerFirstName,
        customerLastName,
        customerEmailAddress,
        customerUsername,
        customerPassword,
      } = customer;
      await axios.post("http://localhost:8081/customers", {
        customer_account_firstName: customerFirstName,
        customer_account_lastName: customerLastName,
        customer_account_emailAddress: customerEmailAddress,
        customer_account_username: customerUsername,
        customer_account_password: customerPassword,
      });
      navigate("/customers");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mb-5">
      <form>
        <h1 className="mt-7 mb-5 text-md font-semibold"> Add Customer </h1>

        <div className="mb-2">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="customerFirstName"
            onChange={handleChange}
          />
        </div>

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="customerLastName"
          onChange={handleChange}
        />

        <label>Email Address</label>
        <input
          type="text"
          placeholder="Enter Email Address"
          name="customerEmailAddress"
          onChange={handleChange}
        />

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          name="customerUsername"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="text"
          placeholder="Enter Password"
          name="customerPassword"
          onChange={handleChange}
        />

        <div className="flex justify-end mt-2">
          <button
            onClick={handleClick}
            type="submit"
            className="px-4 py-1 rounded-md bg-black text-white text-base"
          >
            {" "}
            SAVE CUSTOMER
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
