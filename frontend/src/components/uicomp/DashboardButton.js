import React from "react";

export default function DashboardButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#0a1d51",
        color: "#fff",
        border: "none",
        padding: "12px 20px",
        margin: "10px 0",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s",
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#142b70"}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#0a1d51"}
    >
      {text}
    </button>
  );
}
