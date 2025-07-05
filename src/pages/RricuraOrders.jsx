import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "../components/Receipt";

const RricuraOrders = () => {
  const [orders, setOrders] = useState([]);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const selectedOrder = orders.find((o) => o._id === selectedOrderId);
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt-${selectedOrder?.orderNumber}`,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://elizabeth-backend.onrender.com/api/rricura/orders"
        );
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const [searchName, setSearchName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchFilteredOrders = async () => {
    const params = new URLSearchParams();

    if (searchName) params.append("name", searchName);
    if (filterStatus) params.append("status", filterStatus);
    if (filterDate) params.append("date", filterDate);

    const res = await fetch(`/api/rricura/orders?${params.toString()}`);
    const data = await res.json();
    setFilteredOrders(data);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Rricura Orders</h2>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          onClick={fetchFilteredOrders}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>
      {filteredOrders.map((order) => (
        <div key={order._id}>
          <p>
            <strong>{order.customerInfo.name}</strong> - {order.status} -{" "}
            {order.deliveryDate}
          </p>
        </div>
      ))}

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Order #</th>

              <th>Email</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Delivery Fee</th>
              <th>Tip</th>
              <th>Total</th>
              <th>Delivery Date</th>
              <th>Delivery Address</th>
              <th>Ordered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="order-row"
                onClick={() =>
                  setSelectedOrderId(
                    selectedOrderId === order._id ? null : order._id
                  )
                }
              >
                <td>{order.customerName}</td>
                <td>{order.orderNumber}</td>

                <td>{order.customerEmail}</td>
                <td>{order.customerPhone}</td>
                <td>
                  <ul className="items-list">
                    {order.items?.map((item, index) => (
                      <li key={index}>
                        {item.quantity} {item.unit || ""} {item.name} — $
                        {(item.basePrice * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.subtotal?.toFixed(2)}</td>
                <td>${order.tax?.toFixed(2)}</td>
                <td>
                  {order.deliveryAddress?.fee
                    ? `$${order.deliveryAddress.fee.toFixed(2)}`
                    : "-"}
                </td>
                <td>
                  $
                  {typeof order.tip === "number"
                    ? order.tip.toFixed(2)
                    : "0.00"}
                </td>
                <td>${order.total?.toFixed(2)}</td>
                <td>
                  {order.deliveryDate} at {order.deliveryTime}
                </td>
                <td>
                  {order.deliveryAddress?.fullAddress ||
                    `${order.deliveryAddress?.street}, ${order.deliveryAddress?.city}, ${order.deliveryAddress?.state} ${order.deliveryAddress?.zip}`}
                </td>
                <td>
                  {order.createdAt && (
                    <div>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <div className="print-section">
          <button onClick={handlePrint} className="print-button">
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
