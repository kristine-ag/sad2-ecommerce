import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdatePurchaseOrder() {
  const [purchaseOrder, setPurchaseOrder] = useState({
    purchaseOrderDate: "",
    purchaseOrderDeliveryDate: "",
    purchaseOrderTotalAmount: "",
    supplier_id_fk: "", // Add supplier_id_fk to store the supplier ID
  });

  const navigate = useNavigate();
  const location = useLocation();

  const purchaseOrderId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchPurchaseOrderData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/purchaseorders/${purchaseOrderId}`
        );
        const purchaseOrderData = response.data;

        setPurchaseOrder({
          purchaseOrderDate: purchaseOrderData.po_orderDate,
          purchaseOrderDeliveryDate: purchaseOrderData.po_deliveryDate,
          purchaseOrderTotalAmount: purchaseOrderData.po_totalAmount,
          supplier_id_fk: purchaseOrderData.supplier_id_fk, // Set the supplier_id_fk
        });
      } catch (error) {
        console.error("Error fetching purchase order data:", error);
      }
    };
    fetchPurchaseOrderData();
  }, [purchaseOrderId]);

  const handleChange = (e) => {
    setPurchaseOrder({
      ...purchaseOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8081/purchaseorders/update/${purchaseOrderId}`,
        purchaseOrder
      );
      navigate("/purchaseorders");
    } catch (err) {
      console.error("Error updating purchase order:", err);
    }
  };

  return (
    <div className="flex justify-center mb-5">
      <form>
        <h1 className="mt-7 mb-5 text-md font-semibold">
          {" "}
          Update Purchase Order{" "}
        </h1>

        <div className="mb-2">
          <label> Order Date </label>
          <input
            type="date"
            name="purchaseOrderDate"
            value={purchaseOrder.purchaseOrderDate}
            onChange={handleChange}
          />
        </div>

        <label> Delivery Date </label>
        <input
          type="date"
          name="purchaseOrderDeliveryDate"
          value={purchaseOrder.purchaseOrderDeliveryDate}
          onChange={handleChange}
        />

        <label> Total Amount </label>
        <input
          type="number"
          placeholder="Total Amount"
          name="purchaseOrderTotalAmount"
          value={purchaseOrder.purchaseOrderTotalAmount}
          onChange={handleChange}
        />

        <label> Supplier ID (readonly) </label>
        <input
          type="text"
          name="supplier_id_fk"
          value={purchaseOrder.supplier_id_fk}
          readOnly // Make it read-only
        />

        <div className="flex justify-end mt-2">
          <button
            onClick={handleClick}
            type="submit"
            className="px-4 py-1 rounded-md bg-black text-white text-base"
          >
            {" "}
            SAVE PURCHASE ORDER{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePurchaseOrder;
