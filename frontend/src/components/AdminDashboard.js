// import React from "react";
// import Card from "./uicomp/card";
// import DashboardButton from "./uicomp/DashboardButton";

// // Chart.js imports
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function AdminDashboard() {
//   const stats = [
//     { title: "Total Complaints", value: 25, icon: "📄" },
//     { title: "Resolved Complaints", value: 15, icon: "✅" },
//     { title: "Pending Complaints", value: 10, icon: "⏳" },
//     { title: "Announcements", value: 8, icon: "📢" }
//   ];

//   const chartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Complaints Trend",
//         data: [5, 8, 6, 10, 7, 12],
//         borderColor: "#00bfff",
//         backgroundColor: "rgba(0, 191, 255, 0.2)",
//         tension: 0.4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: { legend: { position: "top", labels: { color: "#fff" } } },
//     scales: {
//       x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
//       y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
//     },
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
//         {stats.map((s, idx) => <Card key={idx} {...s} />)}
//       </div>

//       <div style={{ marginTop: "30px", backgroundColor: "#142b70", padding: "20px", borderRadius: "10px" }}>
//         <h3>Monthly Complaints Trend</h3>
//         <Line data={chartData} options={chartOptions} />
//       </div>

//       <div style={{ marginTop: "30px" }}>
//         <DashboardButton text="View Complaint Audit Logs" onClick={() => window.location.href = "/complaints/audit"} />
//         <DashboardButton text="View Announcements" onClick={() => window.location.href = "/announcements"} />
//         <DashboardButton text="+ Create Announcement" onClick={() => window.location.href = "/announcements/create"} />
//       </div>
//     </div>
//   );
// }
import React from "react";
import Card from "./uicomp/card";

// Chart.js imports
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const actionCards = [
    { title: "View Audit Logs", icon: "📜", onClick: () => window.location.href = "/complaints/audit" },
    { title: "View Complaints", icon: "📄", onClick: () => window.location.href = "/complaints/admin" },
    { title: "View Announcements", icon: "📢", onClick: () => window.location.href = "/announcements" },
    { title: "Announce to team", icon: "➕", onClick: () => window.location.href = "/announcements/create" },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Complaints Trend",
        data: [5, 8, 6, 10, 7, 12],
        borderColor: "#00bfff",
        backgroundColor: "rgba(0, 191, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top", labels: { color: "#fff" } } },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  return (
    <div>
      {/* Action Cards in single responsive row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {actionCards.map((card, idx) => (
          <div key={idx} style={{ flex: 1, minWidth: "180px" }}>
            <Card {...card} />
          </div>
        ))}
      </div>

      {/* Monthly Complaints Trend */}
      <div style={{ marginTop: "30px", backgroundColor: "#142b70", padding: "20px", borderRadius: "10px" }}>
        <h3>Monthly Complaints Trend</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
