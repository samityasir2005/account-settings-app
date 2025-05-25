import React, { useContext, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../usercontext/UserContext";
import defaultProfilePic from "../assets/profile-pictures/default.jpg";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import axios from "axios";

const Dashboard = () => {
  const { user, token, setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token, navigate]);

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);

    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/delete-account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Clear user data and token
        localStorage.removeItem("auth");
        setUser(null);
        setToken("");

        // Close modal
        setShowDeleteModal(false);

        // Show success message and redirect
        toast.success("Account deleted successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Delete account error:", error);

      if (error.response && error.response.data) {
        toast.error(error.response.data.msg || "Failed to delete account");
      } else {
        toast.error("An error occurred while deleting account");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (!deleteLoading) {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <Link to="/logout" className="logout-link">
          Logout
        </Link>
      </div>

      <div className="dashboard-content">
        {user ? (
          <div className="user-info">
            <div className="profile-section">
              <img
                src={defaultProfilePic}
                alt="Profile"
                className="profile-pic"
              />
              <div className="user-details">
                <h2>User Information</h2>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
              </div>
            </div>

            {/* Add delete account section with minimal styling */}
            <div className="account-actions">
              <button className="delete-account-btn" onClick={openDeleteModal}>
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <div className="loading">
            <p>Loading user data...</p>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteAccount}
        loading={deleteLoading}
      />
    </div>
  );
};

export default Dashboard;
