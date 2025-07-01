import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "../components/Receipt";

const RricuraOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt-${selectedOrder?.orderNumber}`,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://your-backend.onrender.com/api/rricura/orders"
        );
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rricura Orders</h2>

      <ul className="space-y-2">
        {orders.map((order) => (
          <li
            key={order._id}
            className="border p-4 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedOrder(order)}
          >
            <strong>{order.customerName}</strong> - {order.orderNumber}
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <div className="mt-8">
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            🖨️ Print Receipt
          </button>

          <div ref={receiptRef}>
            <Receipt order={selectedOrder} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RricuraOrders;
