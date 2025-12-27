// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AuditLogList({ resourceType, isAdmin }) {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const url = isAdmin 
//           ? "http://localhost:5000/audit-logs" 
//           : `http://localhost:5000/audit-logs?resource_type=${resourceType}`;

//         const res = await axios.get(url, { withCredentials: true });
//         setLogs(res.data);
//       } catch (err) {
//         console.error("Error fetching audit logs:", err);
//         alert("Failed to load audit logs");
//       }
//     };
//     fetchLogs();
//   }, [resourceType, isAdmin]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h3>{isAdmin ? "All" : resourceType} Audit Logs</h3>
//       {logs.length === 0 ? (
//         <p>No logs found.</p>
//       ) : (
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             textAlign: "left",
//           }}
//         >
//           <thead>
//             <tr>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>User ID</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Action</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>User</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Resource</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Resource ID</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Old Value</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>New Value</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Timestamp</th>
//             </tr>
//           </thead>
//           <tbody>
//             {logs.map((log) => {
//               const isLoginLogout = log.action_type === "LOGIN" || log.action_type === "LOGOUT";
//               return (
//                 <tr key={log.id}>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>{log.id}</td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>{log.user_id}</td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>{log.action_type}</td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>{log.user_name || "Unknown User"}</td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>{log.resource_type || (isLoginLogout ? "User Action" : "General")}</td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>{isLoginLogout ? "Not Applicable" : log.resource_id || "Not Applicable"}</td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                     {isLoginLogout ? "No previous value" : log.old_value ? JSON.stringify(log.old_value) : "No previous value"}
//                   </td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                     {isLoginLogout ? "No new value" : log.new_value ? JSON.stringify(log.new_value) : "No new value"}
//                   </td>
//                   <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                     {new Date(log.created_at).toLocaleString()}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AuditLogList;


import React, { useEffect, useState } from "react";
import axios from "axios";

function AuditLogList({ resourceType, isAdmin }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const url = isAdmin 
          ? "http://localhost:5000/audit-logs" 
          : `http://localhost:5000/audit-logs?resource_type=${resourceType}`;

        const res = await axios.get(url, { withCredentials: true });
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching audit logs:", err);
        alert("Failed to load audit logs");
      }
    };
    fetchLogs();
  }, [resourceType, isAdmin]);

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#0a1d51", color: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "'Segoe UI', sans-serif", color: "#00bfff" }}>
        {isAdmin ? "All" : resourceType} Audit Logs
      </h2>

      {logs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#b0c4de" }}>No logs found.</p>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: "10px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1000px",
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            <thead style={{ backgroundColor: "#142b70", color: "#00bfff" }}>
              <tr>
                {["ID", "User ID", "Action", "User", "Resource", "Resource ID", "Old Value", "New Value", "Timestamp"].map((header) => (
                  <th key={header} style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #00bfff" }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => {
                const isLoginLogout = log.action_type === "LOGIN" || log.action_type === "LOGOUT";
                return (
                  <tr
                    key={log.id}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#0f245f" : "#142b70",
                      color: "#e0e0e0",
                      transition: "background-color 0.2s",
                    }}
                  >
                    <td style={{ padding: "8px" }}>{log.id}</td>
                    <td style={{ padding: "8px" }}>{log.user_id}</td>
                    <td style={{ padding: "8px" }}>{log.action_type}</td>
                    <td style={{ padding: "8px" }}>{log.user_name || "Unknown User"}</td>
                    <td style={{ padding: "8px" }}>{log.resource_type || (isLoginLogout ? "User Action" : "General")}</td>
                    <td style={{ padding: "8px" }}>{isLoginLogout ? "Not Applicable" : log.resource_id || "Not Applicable"}</td>
                    <td style={{ padding: "8px", wordBreak: "break-word" }}>
                      {isLoginLogout ? "No previous value" : log.old_value ? JSON.stringify(log.old_value) : "No previous value"}
                    </td>
                    <td style={{ padding: "8px", wordBreak: "break-word" }}>
                      {isLoginLogout ? "No new value" : log.new_value ? JSON.stringify(log.new_value) : "No new value"}
                    </td>
                    <td style={{ padding: "8px" }}>{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AuditLogList;
