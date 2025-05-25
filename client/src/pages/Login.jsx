import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/login",
          formData
        );
        localStorage.setItem("auth", JSON.stringify(response.data.token));
        setToken(JSON.stringify(response.data.token));
        toast.success("Login successful");
        navigate("/dashboard");
        window.location.reload();
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          const errorMessage = err.response.data.msg;
          if (errorMessage === "Bad password") {
            toast.error("Incorrect password, Please try again");
          } else if (errorMessage === "Bad credentials") {
            toast.error("User does not exist");
          } else {
            toast.error(errorMessage);
          }
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="purple-gradient"></div>
      </div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="logo-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img src={Logo} alt="Logo" className="logo" />
          <h1 className="brand-title">Welcome Back</h1>
          <p className="brand-subtitle">Please enter your details</p>
        </motion.div>

        <motion.form
          onSubmit={handleLoginSubmit}
          className="login-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              required
            />
          </div>

          <div className="input-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </motion.form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
