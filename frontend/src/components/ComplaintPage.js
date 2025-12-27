// // // frontend/src/pages/ComplaintPage.js
// // import React, { useState } from "react";
// // import ComplaintForm from "../components/ComplaintForm";
// // import ComplaintList from "../components/ComplaintList";

// // function ComplaintPage() {
// //   const [editData, setEditData] = useState(null);

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>Complaints</h2>
// //       <ComplaintForm fetchComplaints={() => {}} editData={editData} setEditData={setEditData} />
// //       <ComplaintList setEditData={setEditData} />
// //     </div>
// //   );
// // }

// // export default ComplaintPage;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ComplaintForm from "../components/ComplaintForm";

// function ComplaintPage() {
//   const [complaints, setComplaints] = useState([]);
//   const [editData, setEditData] = useState(null);

//   const fetchComplaints = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/complaints/my", { withCredentials: true });
//       setComplaints(res.data);
//     } catch (err) {
//       console.error("Failed to fetch complaints", err);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   return (
//     <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#0a1d51", color: "#fff" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Complaint Center</h2>

//       {/* Complaint Form */}
//       <div style={{
//         backgroundColor: "#142b70",
//         padding: "20px",
//         borderRadius: "10px",
//         maxWidth: "700px",
//         margin: "0 auto 30px auto",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
//       }}>
//         <ComplaintForm
//           fetchComplaints={fetchComplaints}
//           editData={editData}
//           setEditData={setEditData}
//         />
//       </div>

//       {/* Complaints Table */}
//       <div style={{
//         maxWidth: "900px",
//         margin: "0 auto",
//         backgroundColor: "#142b70",
//         borderRadius: "10px",
//         overflowX: "auto",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
//       }}>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ backgroundColor: "#0a1d51" }}>
//               <th style={thStyle}>Title</th>
//               <th style={thStyle}>Description</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {complaints.length === 0 ? (
//               <tr>
//                 <td colSpan="4" style={{ textAlign: "center", padding: "15px" }}>No complaints yet</td>
//               </tr>
//             ) : (
//               complaints.map((c) => (
//                 <tr key={c.id} style={{ borderBottom: "1px solid #fff" }}>
//                   <td style={tdStyle}>{c.title}</td>
//                   <td style={tdStyle}>{c.description}</td>
//                   <td style={tdStyle}>{c.status}</td>
//                   <td style={tdStyle}>
//                     <button
//                       onClick={() => setEditData(c)}
//                       style={buttonStyle}
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // Styling for table cells
// const thStyle = {
//   padding: "12px",
//   textAlign: "left",
//   color: "#fff"
// };

// const tdStyle = {
//   padding: "12px",
//   color: "#fff"
// };

// const buttonStyle = {
//   backgroundColor: "#0a1d51",
//   color: "#fff",
//   border: "none",
//   padding: "8px 12px",
//   borderRadius: "5px",
//   cursor: "pointer",
//   fontWeight: "bold"
// };

// export default ComplaintPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintForm from "../components/ComplaintForm";

function ComplaintPage() {
  const [complaints, setComplaints] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchComplaints = async () => {
    try {
      // Use the original endpoint to fetch all complaints visible to the user
      const res = await axios.get("http://localhost:5000/complaints", { withCredentials: true });
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#0a1d51", color: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Complaint Center</h2>

      {/* Complaint Form */}
      <div style={{
        backgroundColor: "#142b70",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "700px",
        margin: "0 auto 30px auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
      }}>
        <ComplaintForm
          fetchComplaints={fetchComplaints}
          editData={editData}
          setEditData={setEditData}
        />
      </div>

      {/* Complaints Table */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#142b70",
        borderRadius: "10px",
        overflowX: "auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#0a1d51" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "15px" }}>No complaints yet</td>
              </tr>
            ) : (
              complaints.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #fff" }}>
                  <td style={tdStyle}>{c.title}</td>
                  <td style={tdStyle}>{c.description}</td>
                  <td style={tdStyle}>{c.status}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => setEditData(c)}
                      style={buttonStyle}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styling for table cells
const thStyle = {
  padding: "12px",
  textAlign: "left",
  color: "#fff"
};

const tdStyle = {
  padding: "12px",
  color: "#fff"
};

const buttonStyle = {
  backgroundColor: "#0a1d51",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default ComplaintPage;
