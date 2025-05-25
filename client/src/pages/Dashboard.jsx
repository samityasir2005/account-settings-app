// src/Dashboard.jsx
import React, { useContext, useEffect } from "react";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../usercontext/UserContext";
import defaultProfilePic from "../assets/profile-pictures/default.jpg";

const Dashboard = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <Link to="/logout" className="logout-button">
          Logout
        </Link>
      </div>
      <div className="user-profile">
        {user ? (
          <>
            <img
              src={defaultProfilePic}
              alt="Profile"
              className="profile-pic"
            />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
