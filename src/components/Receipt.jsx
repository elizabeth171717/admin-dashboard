import React from "react";
import { GrTextAlignCenter } from "react-icons/gr";

const Receipt = ({ order }) => {
  if (!order) return null;

  const {
    orderNumber,
    customerName,
    deliveryDate,
    deliveryTime,
    items = [],
    subtotal,
    tax,
    deliveryAddress,
    tip,
    total,
  } = order;

  return (
    <div className="receipt">
      <h2>Rricura Tamales & more</h2>
      <p>Order #: {orderNumber}</p>

      <p>
        <strong>Customer:</strong> {customerName}
      </p>
      <p>
        <strong>Delivery Date:</strong> {deliveryDate}
      </p>
      <p>
        <strong>Delivery Time:</strong> {deliveryTime}
      </p>

      <div className="items">
        <strong>Items:</strong>

        {items.map((item, idx) => (
          <div
            key={idx}
            className="justify-between"
            style={{ marginBottom: "4px" }}
          >
            <span>
              {item.quantity} {item.unit || ""} {item.name}
            </span>
            <span>${(item.quantity * item.basePrice).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="tocal-calculation mt-4 space-y-1">
        {subtotal !== undefined && (
          <div className="justify-between">
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </div>
        )}
        {tax !== undefined && (
          <div className="justify-between">
            <span>Tax:</span> <span>${tax.toFixed(2)}</span>
          </div>
        )}
        {deliveryAddress?.fee !== undefined && (
          <div className="justify-between">
            <span>Delivery Fee:</span>{" "}
            <span>${deliveryAddress.fee.toFixed(2)}</span>
          </div>
        )}
        {tip !== undefined && (
          <div className="justify-between">
            <span>Tip:</span> <span>${tip.toFixed(2)}</span>
          </div>
        )}
        {total !== undefined && (
          <div className="justify-between">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="adress">
        <strong>Delivery Address:</strong>
        <div>
          {order.deliveryAddress?.fullAddress ||
            `${order.deliveryAddress?.street}, ${order.deliveryAddress?.city}, ${order.deliveryAddress?.state} ${order.deliveryAddress?.zip}`}
        </div>
      </div>
      {order.deliveryAddress?.instructions && (
        <div className="instructions">
          Note: {order.deliveryAddress.instructions}
        </div>
      )}

      <p>¡Gracias por su orden!</p>
      <p>www.rricuratamales.com</p>
    </div>
  );
};

export default Receipt;
