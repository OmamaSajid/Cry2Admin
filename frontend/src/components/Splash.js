// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Splash() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/login");
//     }, 2000); // 2 seconds splash screen
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div style={{
//       display:"flex",
//       justifyContent:"center",
//       alignItems:"center",
//       height:"100vh",
//       fontSize:"3rem",
//       fontWeight:"bold",
//       color:"#007bff"
//     }}>
//       NexusCare
//     </div>
//   );
// }

// export default Splash;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000); // 3 seconds splash screen
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#142b70", // navy blue
      color: "#fff",
      fontSize: "3rem",
      fontWeight: "bold",
      flexDirection: "column",
      textAlign: "center",
      animation: "fadeIn 1.5s ease-in-out"
    }}>
      <div style={{ marginBottom: "10px" }}>NexusCare</div>
      <div style={{ fontSize: "1rem", color: "#a0c4ff" }}>Full-stack Platform</div>

      {/* Inline keyframes for fade-in */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default Splash;
