import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true); // to track initial session check

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        {
          withCredentials: true, // important for sending/receiving session cookies
        }
      );

      if (res.status === 200 && res.data.role) {
        const loggedInUser = { email, role: res.data.role };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        return res.data;
      } else {
        throw new Error("Login failed: invalid response");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check session function
  const checkSession = async () => {
    try {
      const res = await axios.get("http://localhost:5000/validate-session", {
        withCredentials: true,
      });

      if (res.status === 200 && res.data.logged_in) {
        const sessionUser = { email: res.data.user_id, role: res.data.role };
        setUser(sessionUser);
        localStorage.setItem("user", JSON.stringify(sessionUser));
      } else {
        logout();
      }
    } catch (err) {
      console.error("Session check failed:", err);
      logout();
    } finally {
      setLoading(false); // finished checking session
    }
  };

  // Run session check on mount
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
