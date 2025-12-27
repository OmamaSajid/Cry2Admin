// // import React from "react";
// // import Card from "./uicomp/ard";

// // export default function UserDashboard({ role }) {
// //   // Define actionable cards for user roles
// //   const cards = [
// //     {
// //       title: role === "Resident" ? "Register Complaint" : "View Assigned Complaints",
// //       description: role === "Resident"
// //         ? "Click here to create a new complaint."
// //         : "Check complaints assigned to you.",
// //       icon: "📄",
// //       onClick: () => window.location.href = "/complaints"
// //     },
// //     {
// //       title: "Announcements",
// //       description: "Click here to view community announcements.",
// //       icon: "📢",
// //       onClick: () => window.location.href = "/announcements"
// //     },
// //     {
// //       title: "Profile & Settings",
// //       description: "Update your profile or password.",
// //       icon: "⚙️",
// //       onClick: () => alert("Profile page coming soon!") // placeholder
// //     }
// //   ];

// //   return (
// //     <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
// //       {cards.map((c, idx) => (
// //         <Card 
// //           key={idx} 
// //           title={c.title} 
// //           value={c.description} 
// //           icon={c.icon}
// //           onClick={c.onClick} // navigation on card click
// //         />
// //       ))}
// //     </div>
// //   );
// // }


// import React from "react";
// import Card from "./uicomp/card";
// import DashboardButton from "./uicomp/DashboardButton";
// import { useNavigate } from "react-router-dom";

// export default function UserDashboard({ role }) {
//   const navigate = useNavigate();

//   // Stats cards (minimal for users)
//   const stats = [
//     { title: role === "Resident" ? "My Complaints" : "Assigned Complaints", value: "-", icon: "📄" },
//     { title: "Announcements", value: "-", icon: "📢" }
//   ];

//   return (
//     <div>
//       {/* Stat Cards */}
//       <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
//         {stats.map((s, idx) => <Card key={idx} {...s} />)}
//       </div>

//       {/* Buttons */}
//       <div style={{ marginTop: "30px" }}>
//         {/* Only non-admin can register complaints */}
//         {role !== "Admin" && (
//           <DashboardButton text="Register Complaint" onClick={() => navigate("/complaints")} />
//         )}

//         <DashboardButton text="View Announcements" onClick={() => navigate("/announcements")} />
//       </div>
//     </div>
//   );
// }


import React from "react";
import Card from "./uicomp/card";
import { useNavigate } from "react-router-dom";

export default function UserDashboard({ role }) {
  const navigate = useNavigate();

  // Define actionable cards
  const cards = [
    {
      title:  "Register Complaint",
      value: "Click here to create a new complaint." ,
      icon: "📄",
      onClick: () => navigate("/complaints") // ✅ use navigate
    },
    {
      title: "Announcements",
      value: "Click here to view community announcements.",
      icon: "📢",
      onClick: () => navigate("/announcements") // ✅ use navigate
    },
    {
      title: "Profile & Settings",
      value: "Update your profile or password.",
      icon: "⚙️",
      onClick: () => alert("Profile page coming soon!") // placeholder
    }
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
      {cards.map((c, idx) => (
        <Card
          key={idx}
          title={c.title}
          value={c.value}
          icon={c.icon}
          onClick={c.onClick} // ✅ navigation now works on card click
        />
      ))}
    </div>
  );
}
