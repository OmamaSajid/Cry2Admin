// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";

// // export default function EditAnnouncement() {
// //   const { id } = useParams();
// //   const [title, setTitle] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchAnnouncement = async () => {
// //       try {
// //         // ✅ Fetch a single announcement by ID from backend
// //         const res = await axios.get(`http://localhost:5000/announcements/${id}`, {
// //           withCredentials: true
// //         });
// //         setTitle(res.data.title);
// //         setMessage(res.data.message);
// //       } catch (err) {
// //         console.error("Error fetching announcement:", err);
// //         alert("Failed to fetch announcement");
// //       }
// //       setLoading(false);
// //     };

// //     fetchAnnouncement();
// //   }, [id]);

// //   const update = async () => {
// //     try {
// //       await axios.put(
// //         `http://localhost:5000/announcements/${id}`, // ✅ backend URL
// //         { title, message },
// //         { withCredentials: true } // ✅ include session cookie
// //       );
// //       alert("Updated successfully!");
// //     } catch (err) {
// //       console.error("Error updating announcement:", err);
// //       alert("Update failed!");
// //     }
// //   };

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <div className="container">
// //       <h2>Edit Announcement</h2>

// //       <input
// //         type="text"
// //         value={title}
// //         onChange={e => setTitle(e.target.value)}
// //         placeholder="Title"
// //       />

// //       <textarea
// //         value={message}
// //         onChange={e => setMessage(e.target.value)}
// //         placeholder="Message"
// //       />

// //       <button onClick={update}>Save Changes</button>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function EditAnnouncement() {
//   const { id } = useParams();
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnnouncement = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/announcements/${id}`, {
//           withCredentials: true
//         });
//         setTitle(res.data.title);
//         setMessage(res.data.message);
//       } catch (err) {
//         console.error("Error fetching announcement:", err);
//         alert("Failed to fetch announcement");
//       }
//       setLoading(false);
//     };

//     fetchAnnouncement();
//   }, [id]);

//   const update = async () => {
//     try {
//       await axios.put(
//         `http://localhost:5000/announcements/${id}`,
//         { title, message },
//         { withCredentials: true }
//       );
//       alert("Updated successfully!");
//     } catch (err) {
//       console.error("Error updating announcement:", err);
//       alert("Update failed!");
//     }
//   };

//   if (loading) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Loading...</p>;

//   return (
//     <div
//       style={{
//         maxWidth: "600px",
//         margin: "50px auto",
//         padding: "30px",
//         backgroundColor: "#0a1d51",
//         borderRadius: "15px",
//         boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
//         color: "#fff",
//         fontFamily: "'Segoe UI', sans-serif",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#00bfff" }}>Edit Announcement</h2>

//       <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Title</label>
//       <input
//         type="text"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//         placeholder="Enter title"
//         style={{
//           width: "100%",
//           padding: "12px 15px",
//           marginBottom: "20px",
//           borderRadius: "8px",
//           border: "none",
//           outline: "none",
//           fontSize: "16px",
//           backgroundColor: "#142b70",
//           color: "#fff",
//         }}
//       />

//       <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Message</label>
//       <textarea
//         value={message}
//         onChange={e => setMessage(e.target.value)}
//         placeholder="Enter message"
//         rows={6}
//         style={{
//           width: "100%",
//           padding: "12px 15px",
//           borderRadius: "8px",
//           border: "none",
//           outline: "none",
//           fontSize: "16px",
//           backgroundColor: "#142b70",
//           color: "#fff",
//           resize: "vertical",
//           marginBottom: "25px",
//         }}
//       />

//       <button
//         onClick={update}
//         style={{
//           width: "100%",
//           padding: "12px",
//           backgroundColor: "#00bfff",
//           color: "#0a1d51",
//           fontWeight: "bold",
//           fontSize: "16px",
//           border: "none",
//           borderRadius: "10px",
//           cursor: "pointer",
//           transition: "transform 0.2s",
//         }}
//         onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
//         onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
//       >
//         Save Changes
//       </button>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditAnnouncement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/announcements/${id}`, {
          withCredentials: true
        });
        setTitle(res.data.title);
        setMessage(res.data.message);
      } catch (err) {
        console.error("Error fetching announcement:", err);
        alert("Failed to fetch announcement");
      }
      setLoading(false);
    };

    fetchAnnouncement();
  }, [id]);

  const update = async () => {
    try {
      await axios.put(
        `http://localhost:5000/announcements/${id}`,
        { title, message },
        { withCredentials: true }
      );
      alert("Updated successfully!");
      navigate("/announcements"); // ✅ Navigate back after update
    } catch (err) {
      console.error("Error updating announcement:", err);
      alert("Update failed!");
    }
  };

  if (loading) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        backgroundColor: "#0a1d51", // ✅ Navy blue background
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
          backgroundColor: "#142b70", // Darker card background
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
          color: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#00bfff" }}>Edit Announcement</h2>

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter title"
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
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter message"
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
          onClick={update}
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
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
