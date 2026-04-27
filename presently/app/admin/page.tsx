"use client";
import { useEffect, useState } from "react";

type Order = {
  relation?: string;
  age?: string;
  budget?: string;
  interests?: string;
  recipientName?: string;
  recipientPhone?: string;
  recipientEmail?: string;
  surpriseType?: string;
  address?: string;
  email?: string;
  status?: string;
  createdAt?: string;
  trackingNumber?: string;
  voucherCode?: string;
  adminNotes?: string;
};

export default function AdminPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("presentlyOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!order) return;
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    if (!order) return;
    localStorage.setItem("presentlyOrder", JSON.stringify(order));
    alert("Order updated successfully");
  };

  if (!order) {
    return (
      <main style={pageStyle}>
        <div style={cardStyle}>
          <h1>Admin Panel</h1>
          <p>No order found.</p>
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "10px" }}>🛠 Admin Panel</h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          Manage the surprise order and update its progress
        </p>

        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Order Details</h2>
          <p><strong>Recipient:</strong> {order.recipientName || "-"}</p>
          <p><strong>Relationship:</strong> {order.relation || "-"}</p>
          <p><strong>Age:</strong> {order.age || "-"}</p>
          <p><strong>Budget:</strong> {order.budget || "-"}</p>
          <p><strong>Interests:</strong> {order.interests || "-"}</p>
          <p><strong>Phone:</strong> {order.recipientPhone || "-"}</p>
          <p><strong>Surprise Type:</strong> {order.surpriseType || "-"}</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Update Status</h2>

          <label style={labelStyle}>Order Status</label>
          <select
            name="status"
            value={order.status || "paid"}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="created">created</option>
            <option value="paid">paid</option>
            <option value="selecting">selecting</option>
            <option value="ready">ready</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
          </select>

          <label style={labelStyle}>Tracking Number</label>
          <input
            name="trackingNumber"
            value={order.trackingNumber || ""}
            onChange={handleChange}
            placeholder="Tracking number"
            style={inputStyle}
          />

          <label style={labelStyle}>Voucher Code</label>
          <input
            name="voucherCode"
            value={order.voucherCode || ""}
            onChange={handleChange}
            placeholder="Voucher code"
            style={inputStyle}
          />

          <label style={labelStyle}>Admin Notes</label>
          <textarea
            name="adminNotes"
            value={order.adminNotes || ""}
            onChange={handleChange}
            placeholder="Internal notes"
            style={{ ...inputStyle, minHeight: "100px" }}
          />
        </section>

        <button onClick={saveChanges} style={buttonStyle}>
          Save Changes
        </button>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f9fafb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
  padding: "20px",
};

const cardStyle: React.CSSProperties = {
  background: "white",
  padding: "40px",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "650px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "28px",
  padding: "20px",
  border: "1px solid #eee",
  borderRadius: "14px",
};

const sectionTitle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "16px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "18px",
  cursor: "pointer",
};