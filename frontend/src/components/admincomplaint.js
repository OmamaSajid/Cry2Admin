import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/complaints", { withCredentials: true });
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      alert("Failed to load complaints");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/complaints/${id}`,
        { status },
        { withCredentials: true }
      );
      setComplaints(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // Delete complaint
  const deleteComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await axios.delete(`http://localhost:5000/complaints/${id}`, { withCredentials: true });
      setComplaints(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete complaint");
    }
  };

  if (loading) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Loading complaints...</p>;

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#0a1d51", color: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#00bfff" }}>All Complaints</h2>

      {complaints.length === 0 ? (
        <p style={{ textAlign: "center" }}>No complaints found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["ID", "User ID", "Title", "Description", "Status", "Created At", "Actions"].map((header) => (
                  <th key={header} style={{
                    borderBottom: "2px solid #00bfff",
                    padding: "10px",
                    textAlign: "left",
                    minWidth: "100px",
                  }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
                  <td style={{ padding: "8px" }}>{c.id}</td>
                  <td style={{ padding: "8px" }}>{c.user_id}</td>
                  <td style={{ padding: "8px" }}>{c.title}</td>
                  <td style={{ padding: "8px" }}>{c.description}</td>
                  <td style={{ padding: "8px" }}>
                    <select
                      value={c.status}
                      onChange={e => updateStatus(c.id, e.target.value)}
                      style={{
                        padding: "5px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#0f245f",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td style={{ padding: "8px" }}>{new Date(c.created_at).toLocaleString()}</td>
                  <td style={{ padding: "8px" }}>
                    <button
                      onClick={() => deleteComplaint(c.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#ff4d4f",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginLeft: "5px"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
