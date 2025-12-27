import React from "react";

export default function Card({ title, value, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg, #1f2a48, #142b70)",
        color: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
        minWidth: "250px",
        flex: "1 1 250px",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        {icon && <span style={{ fontSize: "30px", marginRight: "10px" }}>{icon}</span>}
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      <p style={{ fontSize: "16px", lineHeight: "1.4" }}>{value}</p>
    </div>
  );
}
