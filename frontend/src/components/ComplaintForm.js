// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ComplaintForm({ fetchComplaints, editData, setEditData }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     if (editData) {
//       setTitle(editData.title);
//       setDescription(editData.description);
//     }
//   }, [editData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editData) {
//         // Update existing complaint
//         await axios.put(
//           `http://localhost:5000/complaints/${editData.id}`,
//           { title, description, status: editData.status },
//           { withCredentials: true }
//         );
//         setEditData(null);
//       } else {
//         // Create new complaint
//         const res = await axios.post(
//           "http://localhost:5000/complaints",
//           { title, description },
//           { withCredentials: true }
//         );
//         console.log("Created complaint:", res.data);
//       }
//       setTitle("");
//       setDescription("");
//       fetchComplaints();
//     } catch (err) {
//       console.error("Error in complaint submit:", err);
//       if (err.response && err.response.data && err.response.data.error) {
//         alert(err.response.data.error);
//       } else {
//         alert("Server error or network issue");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//       <input
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <input
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//       <button type="submit">{editData ? "Update" : "Create"}</button>
//       {editData && (
//         <button type="button" onClick={() => setEditData(null)}>
//           Cancel
//         </button>
//       )}
//     </form>
//   );
// }

// export default ComplaintForm;

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ComplaintForm({ fetchComplaints, editData, setEditData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
      setSuccessMsg("");
      setErrorMsg("");
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      if (editData) {
        await axios.put(
          `http://localhost:5000/complaints/${editData.id}`,
          { title, description, status: editData.status },
          { withCredentials: true }
        );
        setEditData(null);
        setSuccessMsg("Complaint updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/complaints",
          { title, description },
          { withCredentials: true }
        );
        setSuccessMsg("Complaint submitted successfully!");
      }

      setTitle("");
      setDescription("");
      fetchComplaints();
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      {successMsg && <p style={{ color: "#00ff99", marginBottom: "10px", fontWeight: "bold" }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: "#ff6b6b", marginBottom: "10px", fontWeight: "bold" }}>{errorMsg}</p>}

      <input
        type="text"
        placeholder="Complaint Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={inputStyle}
      />

      <textarea
        placeholder="Complaint Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={textareaStyle}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Submitting..." : editData ? "Update Complaint" : "Submit Complaint"}
        </button>

        {editData && (
          <button
            type="button"
            onClick={() => setEditData(null)}
            style={{ ...buttonStyle, backgroundColor: "#555" }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  marginBottom: "15px",
  fontSize: "16px"
};

const textareaStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  marginBottom: "15px",
  minHeight: "100px",
  fontSize: "16px"
};

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#0a1d51",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold"
};
