import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Customer() {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8081/customers");
        setCustomer(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCustomers();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this customer?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:8081/customers/" + id);
          Swal.fire("Deleted!", "This customer has been deleted.", "success");
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the customer.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <div className="flex justify-end m-2 mb-5 mt-6">
        <Link
          to="/customers/add"
          className="px-4 py-2 rounded-md bg-black text-white"
        >
          {" "}
          Add +
        </Link>
      </div>
      <table className="basic mt-10">
        <thead>
          <tr>
            <td> Customer ID </td>
            <td> First Name </td>
            <td> Last Name </td>
            <td> Email Address </td>
            <td> Username </td>
            <td> Actions </td>
          </tr>
        </thead>
        <tbody>
          {customer.map((data, i) => (
            <tr key={i}>
              <td>{data.customer_account_id}</td>
              <td>{data.customer_account_firstName}</td>
              <td>{data.customer_account_lastName}</td>
              <td>{data.customer_account_emailAddress}</td>
              <td>{data.customer_account_username}</td>
              <td>
                <button className="btn-green">
                  <Link to={`/customers/update/${data.customer_account_id}`}>
                    <BiEdit />
                  </Link>
                </button>
                <button
                  className="btn-red"
                  onClick={() => handleDelete(data.customer_account_id)}
                >
                  <MdOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Customer;
