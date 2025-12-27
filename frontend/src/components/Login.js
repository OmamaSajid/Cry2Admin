// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login(email, password);
//       alert(res.message); // optional message from backend
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "50px auto" }}
//     >
//       <h2>Login</h2>
//       <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       <button type="submit" style={{ marginTop: "10px" }}>Login</button>
//       <p>
//         Don't have an account?{" "}
//         <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/register")}>Register</span>
//       </p>
//     </form>
//   );
// }

// export default Login;


import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null); // ✅ message state
  const [msgType, setMsgType] = useState("success"); // "success" or "error"
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NexusCare LOGIN";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      setMsg(res.message || "Login successful");
      setMsgType("success");

      // Redirect after 1.5s
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
      setMsgType("error");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0a1f44, #001f3f)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        position: "relative"
      }}>
        <h2 style={{ color: "#001f3f", marginBottom: "30px" }}>Login</h2>

        {/* ✅ Message Banner */}
        {msg && (
          <div style={{
            marginBottom: "20px",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: msgType === "success" ? "#d4edda" : "#f8d7da",
            color: msgType === "success" ? "#155724" : "#721c24",
            border: `1px solid ${msgType === "success" ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none"
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#001f3f",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s"
            }}
            onMouseEnter={e => e.target.style.backgroundColor = "#0a3d91"}
            onMouseLeave={e => e.target.style.backgroundColor = "#001f3f"}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "20px", color: "#001f3f" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#0a3d91", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
