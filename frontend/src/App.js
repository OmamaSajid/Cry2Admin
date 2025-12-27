// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // import Splash from "./components/Splash";
// // import Login from "./components/Login";
// // import Register from "./components/Register";
// // import Dashboard from "./components/Dashboard";
// // import ComplaintPage from "./components/ComplaintPage";
// // import AuditLogList from "./components/AuditLogList";

// // import ProtectedRoute from "./components/ProtectedRoute";
// // import { AuthProvider } from "./context/AuthContext"; // ★ NEW IMPORT

// // function App() {
// //   return (
// //     <AuthProvider>  {/* ★ WRAP EVERYTHING */}
// //       <Router>
// //         <Routes>
// //           <Route path="/" element={<Splash />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />

// //           <Route
// //             path="/dashboard"
// //             element={
// //               <ProtectedRoute allowedRoles={['Resident', 'Admin', 'Medical', 'Security']}>
// //                 <Dashboard />
// //               </ProtectedRoute>
// //             }
// //           />

// //           <Route
// //             path="/complaints"
// //             element={
// //               <ProtectedRoute allowedRoles={['Resident', 'Admin']}>
// //                 <ComplaintPage />
// //               </ProtectedRoute>
// //             }
// //           />

// //           <Route
// //             path="/complaints/audit"
// //             element={
// //               <ProtectedRoute allowedRoles={['Admin']}>
// //                 <AuditLogList resourceType="Complaint" />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //   path="/announcements"
// //   element={
// //     <ProtectedRoute allowedRoles={['Resident', 'Admin', 'Medical', 'Security']}>
// //       <AnnouncementsList />
// //     </ProtectedRoute>
// //   }
// // />

// // <Route
// //   path="/announcements/create"
// //   element={
// //     <ProtectedRoute allowedRoles={['Admin']}>
// //       <CreateAnnouncement />
// //     </ProtectedRoute>
// //   }
// // />

// // <Route
// //   path="/announcements/edit/:id"
// //   element={
// //     <ProtectedRoute allowedRoles={['Admin']}>
// //       <EditAnnouncement />
// //     </ProtectedRoute>
// //   }
// // />

// //         </Routes>
// //       </Router>
// //     </AuthProvider>  // ★ CLOSE WRAP
// //   );
// // }

// // export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Splash from "./components/Splash";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import ComplaintPage from "./components/ComplaintPage";
// import AuditLogList from "./components/AuditLogList";

// import AnnouncementsList from "./components/AnnouncementsList";
// import CreateAnnouncement from "./components/CreateAnnouncement";
// import EditAnnouncement from "./components/EditAnnouncement";

// import ProtectedRoute from "./components/ProtectedRoute";
// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Splash />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={['Resident', 'Admin', 'Medical', 'Security']}>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />

//           {/* Complaint Module */}
//           <Route
//             path="/complaints"
//             element={
//               <ProtectedRoute allowedRoles={['Resident', 'Medical', 'Security']}>
//                 <ComplaintPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/complaints/audit"
//             element={
//               <ProtectedRoute allowedRoles={['Admin']}>
//                 <AuditLogList resourceType="Complaint" />
//               </ProtectedRoute>
//             }
//           />
//            <Route path="/complaints" element={<AdminComplaints />} />
//           {/* Announcement Module */}
//           <Route
//             path="/announcements"
//             element={
//               <ProtectedRoute allowedRoles={['Resident', 'Admin', 'Medical', 'Security']}>
//                 <AnnouncementsList />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/announcements/create"
//             element={
//               <ProtectedRoute allowedRoles={['Admin']}>
//                 <CreateAnnouncement />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/announcements/edit/:id"
//             element={
//               <ProtectedRoute allowedRoles={['Admin']}>
//                 <EditAnnouncement />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./components/Splash";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ComplaintPage from "./components/ComplaintPage";
import AdminComplaints from "./components/admincomplaint"; // ✅ Fixed import
import AuditLogList from "./components/AuditLogList";

import AnnouncementsList from "./components/AnnouncementsList";
import CreateAnnouncement from "./components/CreateAnnouncement";
import EditAnnouncement from "./components/EditAnnouncement";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Resident', 'Admin', 'Medical', 'Security']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Complaint Module */}
          <Route
            path="/complaints"
            element={
              <ProtectedRoute allowedRoles={['Resident', 'Medical', 'Security']}>
                <ComplaintPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints/admin"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints/audit"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AuditLogList resourceType="Complaint" />
              </ProtectedRoute>
            }
          />

          {/* Announcement Module */}
          <Route
            path="/announcements"
            element={
              <ProtectedRoute allowedRoles={['Resident', 'Admin', 'Medical', 'Security']}>
                <AnnouncementsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements/create"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <CreateAnnouncement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements/edit/:id"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <EditAnnouncement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
