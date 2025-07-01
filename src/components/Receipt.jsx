const Receipt = ({ order }) => {
  return (
    <div style={{ width: "57mm", padding: "10px", fontSize: "12px" }}>
      <h3 style={{ textAlign: "center" }}>Rricura Catering</h3>
      <hr />
      <p>
        <strong>Order #:</strong> {order.orderNumber}
      </p>
      <p>
        <strong>Customer:</strong> {order.customerName}
      </p>
      <p>
        <strong>Date:</strong> {order.deliveryDate}
      </p>
      <p>
        <strong>Time:</strong> {order.deliveryTime}
      </p>
      <hr />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {order.tamales?.map((item, idx) => (
          <li key={idx}>
            {item.quantity}x {item.name}
          </li>
        ))}
        {order.sides?.map((side, idx) => (
          <li key={`side-${idx}`}>
            {side.quantity}x {side.name} ({side.size})
          </li>
        ))}
        {order.drinks?.map((drink, idx) => (
          <li key={`drink-${idx}`}>
            {drink.quantity}x {drink.name}
          </li>
        ))}
      </ul>
      <hr />
      <p>
        <strong>Subtotal:</strong> ${order.subtotal?.toFixed(2)}
      </p>
      <p>
        <strong>Tax:</strong> ${order.tax?.toFixed(2)}
      </p>
      <p>
        <strong>Tip:</strong> ${order.tip?.toFixed(2)}
      </p>
      <p>
        <strong>Total:</strong> ${order.total?.toFixed(2)}
      </p>
      <hr />
      <p style={{ textAlign: "center" }}>¡Gracias por su orden!</p>
    </div>
  );
};

export default Receipt;
