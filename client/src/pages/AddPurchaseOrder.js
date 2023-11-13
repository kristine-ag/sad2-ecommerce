import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPurchaseOrder() {
  const [purchaseOrder, setPurchaseOrder] = useState({
    purchaseOrderDate: "",
    purchaseOrderDeliveryDate: "",
    purchaseOrderTotalAmount: "",
    supplier_id_fk: "", // Add supplier_id_fk to store the supplier ID
  });

  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setPurchaseOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const {
        purchaseOrderDate,
        purchaseOrderDeliveryDate,
        purchaseOrderTotalAmount,
        supplier_id_fk,
      } = purchaseOrder;
      await axios.post("http://localhost:8081/purchaseorders", {
        po_orderDate: purchaseOrderDate,
        po_deliveryDate: purchaseOrderDeliveryDate,
        po_totalAmount: purchaseOrderTotalAmount,
        supplier_id_fk, // Include supplier_id_fk
      });
      navigate("/purchaseorders");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mb-5">
      <form>
        <h1 className="mt-7 mb-5 text-md font-semibold">
          {" "}
          Add Purchase Order{" "}
        </h1>

        <div className="mb-2">
          <label> Order Date </label>
          <input type="date" name="purchaseOrderDate" onChange={handleChange} />
        </div>

        <label> Delivery Date </label>
        <input
          type="date"
          name="purchaseOrderDeliveryDate"
          onChange={handleChange}
        />

        <label> Total Amount </label>
        <input
          type="number"
          placeholder="Total Amount"
          name="purchaseOrderTotalAmount"
          onChange={handleChange}
        />

        <label> Supplier </label>
        <select name="supplier_id_fk" onChange={handleChange}>
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.supplier_id} value={supplier.supplier_id}>
              {supplier.supplier_name}
            </option>
          ))}
        </select>

        <div className="flex justify-end mt-2">
          <button
            onClick={handleClick}
            type="submit"
            className="px-4 py-1 rounded-md bg-black text-white text-base"
          >
            SAVE PURCHASE ORDER
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPurchaseOrder;
