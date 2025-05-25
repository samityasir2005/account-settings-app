import React from "react";
import "../styles/Landing.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/back.jpg";
const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Get Started with HoneyBadger clicked!");
    navigate("/login");
  };
  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="overlay">
        <motion.div
          className="content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="logo-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="brand-name">🍯🦡 HoneyBadger</h1>
          </motion.div>

          <motion.h2
            className="title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Fierce Digital Solutions
          </motion.h2>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Build a powerful online presence with our cutting-edge web
            development
          </motion.p>

          <motion.button
            className="get-started-btn"
            onClick={handleGetStarted}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(255, 193, 7, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>

          <motion.div
            className="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span className="feature"> &copy; Samit Yasir</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default Landing;
