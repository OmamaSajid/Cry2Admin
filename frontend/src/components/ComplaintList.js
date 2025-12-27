import React, { useState, useEffect } from "react";
import axios from "axios";

function ComplaintList({ setEditData }) {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/complaints", { withCredentials: true });
      setComplaints(res.data);
      console.log("Fetched complaints:", res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      alert("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await axios.delete(`http://localhost:5000/complaints/${id}`, { withCredentials: true });
      fetchComplaints();
    } catch (err) {
      console.error("Error deleting complaint:", err);
      alert("Failed to delete complaint");
    }
  };

  return (
    <div>
      <h3>Complaints</h3>
      {complaints.length === 0 ? (
        <p>No complaints yet.</p>
      ) : (
        <ul>
          {complaints.map((c) => (
            <li key={c.id} style={{ marginBottom: "10px" }}>
              <strong>{c.title}</strong>: {c.description} (Status: {c.status})
              <button onClick={() => setEditData(c)} style={{ marginLeft: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(c.id)} style={{ marginLeft: "5px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ComplaintList;
