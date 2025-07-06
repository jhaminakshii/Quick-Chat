import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
  const[token, setToken] = useState(localStorage.getItem("token"));

  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // Check if user is authenticated and if so, set the user data and connect the socket
  // const checkAuth1 = async () => {
  //   try {
  //     const { data } = await axios.get("/api/auth/check");
  //     if (data.success) {
  //       setAuthUser(data.user);
  //       connectSocket(data.user);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("/api/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setToken(token);
        setAuthUser(res.data.user); // depends on your backend response
      }
    } catch (error) {
      console.error("Auth check failed:", error.message);
      setToken(null);
      setAuthUser(null);
      localStorage.removeItem("token");
    }
  };


  // Login function to handle user authentication and socket connection
  const login = async (state, credentials) => {
    try {
      const response = await axios.post(`/api/auth/${state}`, credentials);
      const data = response.data;
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        // axios.defaults.headers.common["token"] = data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout function to handle user logout and socket disconnection
    const logout = async()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        // axios.defaults.headers.common["token"] = null;
        delete axios.defaults.headers.common["Authorization"];
        // or axios.defaults.headers.common["Authorization"] = null;
        toast.success("Logged out successfully")
        socket.disconnect();
    }

// Update profile function to handle user profile updates
    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/api/auth/update-profile", body, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
            if(data.success){
              setAuthUser(data.user)  
              toast.success("Profile updated successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }



  // Connect socket function to handle socket connection and online user updates
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  useEffect(() => {
    if (token) {
      // axios.defaults.headers.common["token"] = token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    }
    checkAuth();
  }, []);

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}