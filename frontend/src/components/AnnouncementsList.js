// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // export default function AnnouncementsList() {
// //   const [announcements, setAnnouncements] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [role, setRole] = useState("");
// //   const navigate = useNavigate();

// //   // Fetch announcements
// //   const fetchAnnouncements = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/announcements", { withCredentials: true });
// //       setAnnouncements(res.data);
// //     } catch (err) {
// //       console.error("Error fetching announcements:", err);
// //     }
// //     setLoading(false);
// //   };

// //   // Fetch user role
// //   const fetchRole = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/validate-session", { withCredentials: true });
// //       setRole(res.data.role);
// //     } catch (err) {
// //       console.error("Error fetching role:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRole();
// //     fetchAnnouncements();
// //   }, []);

// //   if (loading) return <p>Loading announcements...</p>;

// //   return (
// //     <div className="container">
// //       <h2>Community Announcements</h2>

// //       {announcements.length === 0 ? (
// //         <p>No announcements available.</p>
// //       ) : (
// //         <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //           <thead>
// //             <tr>
// //               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
// //               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Message</th>
// //               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Posted By</th>
// //               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Created At</th>
// //               {role === "Admin" && <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {announcements.map(a => (
// //               <tr key={a.id}>
// //                 <td style={{ border: "1px solid #ccc", padding: "8px" }}>{a.title}</td>
// //                 <td style={{ border: "1px solid #ccc", padding: "8px" }}>{a.message}</td>
// //                 <td style={{ border: "1px solid #ccc", padding: "8px" }}>{a.created_by_name}</td>
// //                 <td style={{ border: "1px solid #ccc", padding: "8px" }}>
// //                   {new Date(a.created_at).toLocaleString()}
// //                 </td>
// //                 {role === "Admin" && (
// //                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>
// //                     <button
// //                       onClick={() => navigate(`/announcements/edit/${a.id}`)}
// //                       style={{ padding: "5px 10px", cursor: "pointer" }}
// //                     >
// //                       Edit
// //                     </button>
// //                   </td>
// //                 )}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AnnouncementsList() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [role, setRole] = useState("");
//   const navigate = useNavigate();

//   const fetchAnnouncements = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/announcements", { withCredentials: true });
//       setAnnouncements(res.data);
//     } catch (err) {
//       console.error("Error fetching announcements:", err);
//     }
//     setLoading(false);
//   };

//   const fetchRole = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/validate-session", { withCredentials: true });
//       setRole(res.data.role);
//     } catch (err) {
//       console.error("Error fetching role:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRole();
//     fetchAnnouncements();
//   }, []);

//   if (loading) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Loading announcements...</p>;

//   return (
//     <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#0a1d51", color: "#fff" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "'Segoe UI', sans-serif" }}>Community Announcements</h2>

//       {announcements.length === 0 ? (
//         <p style={{ textAlign: "center" }}>No announcements available.</p>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "700px", margin: "0 auto" }}>
//           {announcements.map(a => (
//             <div 
//               key={a.id} 
//               style={{
//                 backgroundColor: "#1f2a48",
//                 borderRadius: "20px",
//                 padding: "15px 20px",
//                 position: "relative",
//                 fontFamily: "'Segoe UI', sans-serif",
//                 wordBreak: "break-word",
//               }}
//             >
//               <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "6px", color: "#00bfff" }}>
//                 {a.title}
//               </div>
//               <div style={{ fontSize: "15px", marginBottom: "8px", color: "#e0e0e0" }}>
//                 {a.message}
//               </div>
//               <div style={{ fontSize: "13px", color: "#b0c4de", textAlign: "right" }}>
//                 {a.created_by_name} • {new Date(a.created_at).toLocaleString()}
//               </div>

//               {role === "Admin" && (
//                 <button
//                   onClick={() => navigate(`/announcements/edit/${a.id}`)}
//                   style={{
//                     position: "absolute",
//                     top: "10px",
//                     right: "10px",
//                     backgroundColor: "#00bfff",
//                     color: "#0a1d51",
//                     border: "none",
//                     padding: "4px 8px",
//                     borderRadius: "10px",
//                     cursor: "pointer",
//                     fontWeight: "bold",
//                     fontSize: "12px",
//                   }}
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBell, FaBullhorn } from "react-icons/fa"; // bullhorn for admin announcement

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/announcements", { withCredentials: true });
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
    setLoading(false);
  };

  const fetchRole = async () => {
    try {
      const res = await axios.get("http://localhost:5000/validate-session", { withCredentials: true });
      setRole(res.data.role);
    } catch (err) {
      console.error("Error fetching role:", err);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchAnnouncements();
  }, []);

  if (loading)
    return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Loading announcements...</p>;

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#0a1d51", color: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "'Segoe UI', sans-serif" }}>
        <FaBell style={{ marginRight: "10px", color: "#00bfff" }} />
        Community Announcements
      </h2>

      {announcements.length === 0 ? (
        <p style={{ textAlign: "center" }}>No announcements available.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
          {announcements.map(a => (
            <div
              key={a.id}
              style={{
                maxWidth: "500px",
                width: "100%",
                backgroundColor: "#1c2a65",
                borderRadius: "15px",
                padding: "15px 20px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
                fontFamily: "'Segoe UI', sans-serif",
                position: "relative",
                borderLeft: "5px solid #00bfff", // like announcement indicator
              }}
            >
              {/* Header with icon */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <FaBullhorn style={{ color: "#00bfff", marginRight: "8px" }} />
                <span style={{ fontSize: "14px", fontWeight: "bold", color: "#00bfff" }}>
                  Announcement from Admin
                </span>
              </div>

              {/* Title */}
              <div style={{ fontSize: "13px", fontWeight: "bold", color: "#b0c4de", marginBottom: "3px" }}>
                Title:
              </div>
              <div style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginBottom: "10px" }}>
                {a.title}
              </div>

              {/* Content */}
              <div style={{ fontSize: "13px", fontWeight: "bold", color: "#b0c4de", marginBottom: "3px" }}>
                Content:
              </div>
              <div style={{ fontSize: "15px", color: "#e0e0e0", marginBottom: "10px", lineHeight: "1.4" }}>
                {a.message}
              </div>

              {/* Footer */}
              <div style={{ fontSize: "12px", color: "#b0c4de", textAlign: "right" }}>
                {a.created_by_name} • {new Date(a.created_at).toLocaleString()}
              </div>

              {/* Edit button for Admin */}
              {role === "Admin" && (
                <button
                  onClick={() => navigate(`/announcements/edit/${a.id}`)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    backgroundColor: "#00bfff",
                    color: "#0a1d51",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
