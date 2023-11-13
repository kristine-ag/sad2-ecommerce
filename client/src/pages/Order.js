import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Order() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8081/orders");
        setOrder(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllOrders();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this order?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:8081/orders/" + id);
          Swal.fire("Deleted!", "This order has been deleted.", "success");
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the order.",
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
          to="/orders/add"
          className="px-4 py-2 rounded-md bg-black text-white"
        >
          {" "}
          Add +
        </Link>
      </div>
      <table className="basic mt-10">
        <thead>
          <tr>
            <td> Order ID </td>
            <td> Date </td>
            <td> Customer Name </td>
            <td> Total </td>
            <td> Order Status </td>
            <td> Payment Status </td>
            <td> Actions </td>
          </tr>
        </thead>
        <tbody>
          {order.map((data, i) => (
            <tr key={i}>
              <td>{data.so_id}</td>
              <td>{data.so_orderDate}</td>
              <td>{data.customer_firstName + data.customer_lastName}</td>
              <td>{data.so_totalAmount}</td>
              <td>{data.so_orderStatus}</td>
              <td>{data.so_paymentStatus}</td>
              <td>
                <button className="btn-green">
                  <Link to={`/orders/update/${data.so_id}`}>
                    <BiEdit />
                  </Link>
                </button>
                <button
                  className="btn-red"
                  onClick={() => handleDelete(data.so_id)}
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

export default Order;
