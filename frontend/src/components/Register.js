// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");
//   const [role,setRole] = useState("Resident");
//   const [secQ,setSecQ] = useState("");
//   const [secA,setSecA] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//       const res = await axios.post("http://localhost:5000/register", {
//         name,email,password,role,security_question:secQ,security_answer:secA
//       }, {withCredentials:true});
//       alert(res.data.message);
//       navigate("/login");
//     } catch(err){
//       alert(err.response.data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", maxWidth:"400px", margin:"50px auto" }}>
//       <h2>Register</h2>
//       <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
//       <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
//       <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
//       <select value={role} onChange={e=>setRole(e.target.value)}>
//         <option value="Resident">Resident</option>
//         <option value="Admin">Admin</option>
//         <option value="Medical">Medical Assistant</option>
//         <option value="Security">Security Staff</option>
//       </select>
//       <input placeholder="Security Question" value={secQ} onChange={e=>setSecQ(e.target.value)} required/>
//       <input placeholder="Answer" value={secA} onChange={e=>setSecA(e.target.value)} required/>
//       <button type="submit" style={{marginTop:"10px"}}>Register</button>
//     </form>
//   );
// }

// export default Register;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Resident");
  const [secQ, setSecQ] = useState("");
  const [secA, setSecA] = useState("");
  const [msg, setMsg] = useState(null);
  const [msgType, setMsgType] = useState("success");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NexusCare REGISTER";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/register",
        {
          name,
          email,
          password,
          role,
          security_question: secQ,
          security_answer: secA
        },
        { withCredentials: true }
      );
      setMsg(res.data.message || "Registered successfully!");
      setMsgType("success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed");
      setMsgType("error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0a1f44, #001f3f)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "450px",
          textAlign: "center",
          position: "relative"
        }}
      >
        <h2 style={{ color: "#001f3f", marginBottom: "30px" }}>Register</h2>

        {/* Message Banner */}
        {msg && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: msgType === "success" ? "#d4edda" : "#f8d7da",
              color: msgType === "success" ? "#155724" : "#721c24",
              border: `1px solid ${msgType === "success" ? "#c3e6cb" : "#f5c6cb"}`
            }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none"
            }}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none"
            }}
          >
            <option value="Resident">Resident</option>
            <option value="Admin">Admin</option>
            <option value="Medical">Medical Assistant</option>
            <option value="Security">Security Staff</option>
          </select>
          <input
            placeholder="Security Question"
            value={secQ}
            onChange={(e) => setSecQ(e.target.value)}
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
            placeholder="Answer"
            value={secA}
            onChange={(e) => setSecA(e.target.value)}
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
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0a3d91")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#001f3f")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
