import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function PurchaseOrder() {
  const [purchaseOrder, setPurchaseOrder] = useState([]);

  useEffect(() => {
    const fetchAllPurchaseOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8081/purchaseorders");
        setPurchaseOrder(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPurchaseOrders();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this purchase order?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:8081/purchaseorders/" + id);
          Swal.fire(
            "Deleted!",
            "Your purchase order has been deleted.",
            "success"
          );
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the purchase order.",
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
          to="/purchaseorders/add"
          className="px-4 py-2 rounded-md bg-black text-white"
        >
          {" "}
          Add +
        </Link>
      </div>
      <table className="basic mt-10">
        <thead>
          <tr>
            <td> Purchase Order ID </td>
            <td> Order Date </td>
            <td> Delivery Date </td>
            <td> Total Amount </td>
            <td> Supplier </td>
            <td> Actions </td>
          </tr>
        </thead>
        <tbody>
          {purchaseOrder.map((data, i) => (
            <tr key={i}>
              <td>{data.po_id}</td>
              <td>{data.po_orderDate}</td>
              <td>{data.po_deliveryDate}</td>
              <td>{data.po_totalAmount}</td>
              <td>{data.supplier_name}</td>
              <td>
                <button className="btn-green">
                  <Link to={`/purchaseorders/update/${data.po_id}`}>
                    <BiEdit />
                  </Link>
                </button>
                <button
                  className="btn-red"
                  onClick={() => handleDelete(data.po_id)}
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

export default PurchaseOrder;
