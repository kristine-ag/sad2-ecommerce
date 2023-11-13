import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Product() {
  const [product, setProduct] = useState([]);
  const [categoryMapping, setCategoryMapping] = useState({});

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8081/products");
        setProduct(res.data);

        const categoryResponse = await axios.get(
          "http://localhost:8081/categories"
        );
        const categories = categoryResponse.data;
        const categoryMap = {};
        categories.forEach((category) => {
          categoryMap[category.product_category_id] =
            category.product_category_name;
        });
        setCategoryMapping(categoryMap);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8081/products/${id}`);
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the product.",
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
          to="/products/add"
          className="px-4 py-2 rounded-md bg-black text-white"
        >
          {" "}
          Add +
        </Link>
      </div>
      <table className="basic mt-10">
        <thead>
          <tr>
            <td> Product ID </td>
            <td> Product Name </td>
            <td> Product Category </td>
            <td> Description </td>
            <td> Unit Price </td>
            <td> Stock Quantity </td>
            <td> Status </td>
            <td> Actions </td>
          </tr>
        </thead>
        <tbody>
          {product.map((data, i) => (
            <tr key={i}>
              <td>{data.product_id}</td>
              <td>{data.product_name}</td>
              <td>{categoryMapping[data.product_category_id_fk]}</td>
              <td>{truncateText(data.product_description, 50)}</td>
              <td>{data.product_unitPrice}</td>
              <td>{data.product_stockQuantity}</td>
              <td>{data.product_status}</td>
              <td>
                <button className="btn-green">
                  <Link to={`/products/update/${data.product_id}`}>
                    <BiEdit />
                  </Link>
                </button>
                <button
                  className="btn-red"
                  onClick={() => handleDelete(data.product_id)}
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

export default Product;
