import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUpload } from "react-icons/fi";

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    productImage: "",
    productDescription: "",
    productUnitPrice: "",
    productStockQuantity: "",
    productStatus: "",
    productCategoryId: "",
    productCreatedAt: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const fetchProductCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching product categories:", err);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `${currentDate.getMonth() + 1}`.padStart(2, "0");
    const day = `${currentDate.getDate()}`.padStart(2, "0");
    const hours = `${currentDate.getHours()}`.padStart(2, "0");
    const minutes = `${currentDate.getMinutes()}`.padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    setProduct((prevProduct) => ({
      ...prevProduct,
      productCreatedAt: formattedDate,
    }));
  }, []);

  const uploadImage = async (e) => {
    try {
      const file = e.target?.files[0];
      if (file) {
        const data = new FormData();
        data.append("file", file);
        const response = await axios.post(
          "http://localhost:8081/products/add/upload",
          data
        );
        const uploadedImage = response.data.images[0];
        setProduct((prev) => ({
          ...prev,
          productImage: `http://localhost:8081/images/${uploadedImage}`,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const {
        productName,
        productImage,
        productDescription,
        productUnitPrice,
        productStockQuantity,
        productStatus,
        productCategoryId,
        productCreatedAt,
      } = product;
      await axios.post("http://localhost:8081/products", {
        product_name: productName,
        product_description: productDescription,
        product_category_id_fk: productCategoryId,
        product_unitPrice: productUnitPrice,
        product_stockQuantity: productStockQuantity,
        product_status: productStatus,
        productImages: productImage,
        product_createdAt: productCreatedAt,
      });
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mb-5">
      <form>
        <h1 className="mt-7 mb-5 text-md font-semibold"> Add Product </h1>
        <div className="mb-2">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Enter Product Name"
            name="productName"
            onChange={handleChange}
          />
        </div>

        <label> Photos </label>
        <div className="mb-2">
          <label className="w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 bg-gray-200 rounded-lg cursor-pointer">
            <FiUpload />
            <div>Upload</div>
            <input type="file" onChange={uploadImage} className="hidden" />
          </label>
          {product.productImage && (
            <div>
              Uploaded Image:
              <img
                src={product.productImage}
                alt="Product"
                width="100"
                height="100"
              />
            </div>
          )}
        </div>

        <div className="mb-2">
          <label>Product Category</label>
          <select
            name="productCategoryId"
            onChange={handleChange}
            value={product.productCategoryId}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option
                key={category.product_category_id}
                value={category.product_category_id}
              >
                {category.product_category_name}
              </option>
            ))}
          </select>
        </div>

        <label> Description </label>
        <textarea
          placeholder="Enter Description"
          name="productDescription"
          onChange={handleChange}
        />

        <label> Unit Price (in PHP) </label>
        <input
          type="number"
          placeholder="Enter Unit Price"
          name="productUnitPrice"
          onChange={handleChange}
        />

        <label> Stock Quantity </label>
        <input
          type="number"
          placeholder="Stock Quantity"
          name="productStockQuantity"
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="productStatus" onChange={handleChange}>
          <option value=""></option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <label> Created At </label>
        <input
          type="datetime-local"
          name="productCreatedAt"
          value={product.productCreatedAt}
          onChange={handleChange}
          disabled
        />

        <div className="flex justify-end mt-2">
          <button
            onClick={handleClick}
            type="submit"
            className="px-4 py-1 rounded-md bg-black text-white text-base"
          >
            SAVE PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
