// import { useState } from "react";
// import axios from "axios";

// export default function CreateAnnouncement() {
//     const [title, setTitle] = useState("");
//     const [message, setMessage] = useState("");
//     const [msg, setMsg] = useState("");

//     const create = async () => {
//         try {
//             const res = await axios.post(
//                 "http://localhost:5000/announcements", // ✅ backend URL
//                 { title, message },
//                 { withCredentials: true } // ✅ send session cookie
//             );
//             setMsg("Created Successfully!");
//         } catch (err) {
//             setMsg(err.response?.data?.error || "Error");
//             console.error(err);
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Create Announcement</h2>
            
//             {msg && <p>{msg}</p>}
            
//             <input 
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={e => setTitle(e.target.value)}
//             />

//             <textarea
//                 placeholder="Message"
//                 value={message}
//                 onChange={e => setMessage(e.target.value)}
//             />

//             <button onClick={create}>Create</button>
//         </div>
//     );
// }


import { useState } from "react";
import axios from "axios";

export default function CreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");

  const create = async () => {
    try {
      await axios.post(
        "http://localhost:5000/announcements",
        { title, message },
        { withCredentials: true }
      );
      setMsg("Created Successfully!");
      setTitle("");
      setMessage("");
    } catch (err) {
      setMsg(err.response?.data?.error || "Error");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        backgroundColor: "#0a1d51",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#142b70",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
          color: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#00bfff" }}>
          Create Announcement
        </h2>

        {msg && (
          <p
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: msg.includes("Error") ? "#ff4d4f" : "#00ff99",
              fontWeight: "bold",
            }}
          >
            {msg}
          </p>
        )}

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            backgroundColor: "#0f245f",
            color: "#fff",
          }}
        />

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Message</label>
        <textarea
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          style={{
            width: "100%",
            padding: "12px 15px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            backgroundColor: "#0f245f",
            color: "#fff",
            resize: "vertical",
            marginBottom: "25px",
          }}
        />

        <button
          onClick={create}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#00bfff",
            color: "#0a1d51",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Create
        </button>
      </div>
    </div>
  );
}
