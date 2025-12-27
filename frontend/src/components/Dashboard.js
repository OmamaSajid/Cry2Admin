

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";

// // // function Dashboard() {
// // //   const [role, setRole] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchSession = async () => {
// // //       try {
// // //         const res = await axios.get(
// // //           "http://localhost:5000/validate-session",
// // //           { withCredentials: true }
// // //         );

// // //         if (!res.data.logged_in) {
// // //           navigate("/login");
// // //         } else {
// // //           setRole(res.data.role);
// // //         }
// // //       } catch (err) {
// // //         navigate("/login");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchSession();
// // //   }, [navigate]);

// // //   if (loading) return <p>Loading dashboard...</p>;

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h2>Welcome to NexusCare Dashboard</h2>
// // //       <p>Your role: {role}</p>

// // //       {/* Complaint Module */}
// // //       {(role === "Medical" || role === "Admin") && (
// // //         <button
// // //           onClick={() => navigate("/complaints")}
// // //           style={{ marginTop: "20px", padding: "10px", cursor: "pointer" }}
// // //         >
// // //           Go to Complaints
// // //         </button>
// // //       )}

// // //       {role === "Admin" && (
// // //         <button
// // //           onClick={() => navigate("/complaints/audit")}
// // //           style={{
// // //             marginTop: "20px",
// // //             padding: "10px",
// // //             marginLeft: "10px",
// // //             cursor: "pointer",
// // //           }}
// // //         >
// // //           View Complaint Audit Logs
// // //         </button>
// // //       )}

// // //       {/* ⬇⬇ NEW — Announcements Module Buttons ⬇⬇ */}

// // //       <button
// // //         onClick={() => navigate("/announcements")}
// // //         style={{
// // //           marginTop: "20px",
// // //           padding: "10px",
// // //           cursor: "pointer",
// // //           display: "block"
// // //         }}
// // //       >
// // //         View Announcements
// // //       </button>

// // //       {role === "Admin" && (
// // //         <button
// // //           onClick={() => navigate("/announcements/create")}
// // //           style={{
// // //             marginTop: "10px",
// // //             padding: "10px",
// // //             cursor: "pointer",
// // //           }}
// // //         >
// // //           + Create Announcement
// // //         </button>
// // //       )}

// // //     </div>
// // //   );
// // // }

// // // export default Dashboard;


// // // // // import React, { useEffect, useState } from "react";
// // // // // import axios from "axios";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // // Reuse your Card component
// // // // // import Card from "./uicomp/card";
// // // // // import DashboardButton from "./uicomp/DashboardButton";

// // // // // // Chart.js imports
// // // // // import { Line } from "react-chartjs-2";
// // // // // import {
// // // // //   Chart as ChartJS,
// // // // //   CategoryScale,
// // // // //   LinearScale,
// // // // //   PointElement,
// // // // //   LineElement,
// // // // //   Title,
// // // // //   Tooltip,
// // // // //   Legend
// // // // // } from "chart.js";

// // // // // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// // // // // function Dashboard() {
// // // // //   const [role, setRole] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const fetchSession = async () => {
// // // // //       try {
// // // // //         const res = await axios.get("http://localhost:5000/validate-session", { withCredentials: true });
// // // // //         if (!res.data.logged_in) {
// // // // //           navigate("/login");
// // // // //         } else {
// // // // //           setRole(res.data.role);
// // // // //         }
// // // // //       } catch (err) {
// // // // //         navigate("/login");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchSession();
// // // // //   }, [navigate]);

// // // // //   if (loading) return <p>Loading dashboard...</p>;

// // // // //   // Dummy stats for now
// // // // //   const stats = [
// // // // //     { title: "Total Complaints", value: 25, icon: "📄" },
// // // // //     { title: "Resolved Complaints", value: 15, icon: "✅" },
// // // // //     { title: "Pending Complaints", value: 10, icon: "⏳" },
// // // // //     { title: "Announcements", value: 8, icon: "📢" }
// // // // //   ];

// // // // //   const chartData = {
// // // // //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
// // // // //     datasets: [
// // // // //       {
// // // // //         label: "Complaints Registered",
// // // // //         data: [5, 8, 6, 10, 7, 12],
// // // // //         borderColor: "#00bfff",
// // // // //         backgroundColor: "rgba(0, 191, 255, 0.2)",
// // // // //         tension: 0.4,
// // // // //       },
// // // // //     ],
// // // // //   };

// // // // //   const chartOptions = {
// // // // //     responsive: true,
// // // // //     plugins: { legend: { position: "top", labels: { color: "#fff" } } },
// // // // //     scales: {
// // // // //       x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
// // // // //       y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
// // // // //     },
// // // // //   };

// // // // //   return (
// // // // //     <div style={{
// // // // //       minHeight: "100vh",
// // // // //       background: "linear-gradient(to right, #0a1d51, #1f2a48)",
// // // // //       color: "#fff",
// // // // //       padding: "30px"
// // // // //     }}>
// // // // //       <h1>Welcome to NexusCare Dashboard</h1>
// // // // //       <h3>Your Role: {role}</h3>

// // // // //       {/* Stat Cards */}
// // // // //       <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
// // // // //         {stats.map((s, idx) => <Card key={idx} {...s} />)}
// // // // //       </div>

// // // // //       {/* Chart */}
// // // // //       <div style={{ marginTop: "30px", backgroundColor: "#142b70", padding: "20px", borderRadius: "10px" }}>
// // // // //         <h3>Monthly Complaints Trend</h3>
// // // // //         <Line data={chartData} options={chartOptions} />
// // // // //       </div>

// // // // //       {/* Buttons */}
// // // // //       <div style={{ marginTop: "30px" }}>
// // // // //         {/* Only non-admin can register complaints */}
// // // // //         {role !== "Admin" && (
// // // // //           <DashboardButton text="Register Complaint" onClick={() => navigate("/complaints")} />
// // // // //         )}

// // // // //         {/* Admin-only */}
// // // // //         {role === "Admin" && (
// // // // //           <DashboardButton text="View Complaint Audit Logs" onClick={() => navigate("/complaints/audit")} />
// // // // //         )}

// // // // //         <DashboardButton text="View Announcements" onClick={() => navigate("/announcements")} />

// // // // //         {role === "Admin" && (
// // // // //           <DashboardButton text="+ Create Announcement" onClick={() => navigate("/announcements/create")} />
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Dashboard;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // import AdminDashboard from "./AdminDashboard";
// // import UserDashboard from "./UserDashboard";

// // export default function Dashboard() {
// //   const [role, setRole] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchSession = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/validate-session", { withCredentials: true });
// //         if (!res.data.logged_in) {
// //           navigate("/login");
// //         } else {
// //           setRole(res.data.role);
// //         }
// //       } catch (err) {
// //         navigate("/login");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchSession();
// //   }, [navigate]);

// //   if (loading) return <p>Loading dashboard...</p>;

// //   return (
// //     <div style={{
// //       minHeight: "100vh",
// //       background: "linear-gradient(to right, #0a1d51, #1f2a48)",
// //       color: "#fff",
// //       padding: "30px"
// //     }}>
// //       <h1>Welcome to NexusCare Dashboard</h1>
// //       <h3>Your Role: {role}</h3>

// //       {role === "Admin" ? <AdminDashboard /> : <UserDashboard role={role} />}
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import AdminDashboard from "./AdminDashboard";
// import UserDashboard from "./UserDashboard";

// export default function Dashboard() {
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/validate-session", { withCredentials: true });
//         if (!res.data.logged_in) {
//           navigate("/login");
//         } else {
//           setRole(res.data.role);
//         }
//       } catch (err) {
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSession();
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   if (loading) return <p>Loading dashboard...</p>;

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #0a1d51, #1f2a48)",
//         color: "#fff",
//         padding: "30px",
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h1>Welcome to NexusCare Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           style={{
//             backgroundColor: "#00bfff",
//             color: "#0a1d51",
//             border: "none",
//             padding: "8px 15px",
//             borderRadius: "12px",
//             cursor: "pointer",
//             fontWeight: "bold",
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       <h3>Your Role: {role}</h3>

//       {role === "Admin" ? <AdminDashboard /> : <UserDashboard role={role} />}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import AdminDashboard from "./AdminDashboard";
// import UserDashboard from "./UserDashboard";

// export default function Dashboard() {
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [logDownloading, setLogDownloading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/validate-session", { withCredentials: true });
//         if (!res.data.logged_in) {
//           navigate("/login");
//         } else {
//           setRole(res.data.role);
//         }
//       } catch (err) {
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSession();
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   // Download server logs
//   const downloadLogs = async () => {
//     if (role !== "Admin") {
//       alert("Access Denied: Only admins can download logs");
//       return;
//     }
//     setLogDownloading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/admin/download-logs", {
//         responseType: "blob", // important for file download
//         withCredentials: true,
//       });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "server.log");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error("Download failed:", err);
//       alert("Failed to download logs");
//     } finally {
//       setLogDownloading(false);
//     }
//   };

//   if (loading) return <p>Loading dashboard...</p>;

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #0a1d51, #1f2a48)",
//         color: "#fff",
//         padding: "30px",
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h1>Welcome to NexusCare Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           style={{
//             backgroundColor: "#00bfff",
//             color: "#0a1d51",
//             border: "none",
//             padding: "8px 15px",
//             borderRadius: "12px",
//             cursor: "pointer",
//             fontWeight: "bold",
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       <h3>Your Role: {role}</h3>

//       {/* Admin-only Download Logs Card */}
//       {role === "Admin" && (
//         <div
//           style={{
//             margin: "20px 0",
//             padding: "20px",
//             backgroundColor: "#0f245f",
//             borderRadius: "12px",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             maxWidth: "400px",
//             cursor: "pointer",
//           }}
//           onClick={downloadLogs}
//         >
//           <div>
//             <h4 style={{ margin: "0 0 5px 0", color: "#00bfff" }}>Server Logs</h4>
//             <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
//               Download latest server log file
//             </p>
//           </div>
//           <button
//             disabled={logDownloading}
//             style={{
//               padding: "8px 12px",
//               borderRadius: "8px",
//               border: "none",
//               backgroundColor: "#00bfff",
//               color: "#0a1d51",
//               fontWeight: "bold",
//               cursor: "pointer",
//             }}
//           >
//             {logDownloading ? "Downloading..." : "Download"}
//           </button>
//         </div>
//       )}

//       {role === "Admin" ? <AdminDashboard /> : <UserDashboard role={role} />}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logDownloading, setLogDownloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/validate-session", { withCredentials: true });
        if (!res.data.logged_in) {
          navigate("/login");
        } else {
          setRole(res.data.role);
        }
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Download server logs
  const downloadLogs = async () => {
    if (role !== "Admin") {
      alert("Access Denied: Only admins can download logs");
      return;
    }
    setLogDownloading(true);
    try {
      const res = await axios.get("http://localhost:5000/admin/download-logs", {
        responseType: "blob",
        withCredentials: true,
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "server.log");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download logs");
    } finally {
      setLogDownloading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0a1d51, #1f2a48)",
        color: "#fff",
        padding: "30px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Welcome to NexusCare</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#00bfff",
            color: "#0a1d51",
            border: "none",
            padding: "8px 15px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      <h3>Your Role: {role}</h3>

      {/* Server Logs Card - visible to all */}
      <div
        style={{
          margin: "20px 0",
          padding: "20px",
          backgroundColor: "#0f245f",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "400px",
          cursor: "pointer",
        }}
        onClick={downloadLogs}
      >
        <div>
          <h4 style={{ margin: "0 0 5px 0", color: "#00bfff" }}>Server Logs</h4>
          <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
            Download latest server log file
          </p>
          {role !== "Admin" && <p style={{ color: "#ff4d4d", fontSize: "12px", marginTop: "5px" }}>CRITICAL</p>}
        </div>
        <button
          disabled={logDownloading}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#00bfff",
            color: "#0a1d51",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {logDownloading ? "Downloading..." : "Download"}
        </button>
      </div>

      {/* Role-based dashboards */}
      {role === "Admin" ? <AdminDashboard /> : <UserDashboard role={role} />}
    </div>
  );
}
