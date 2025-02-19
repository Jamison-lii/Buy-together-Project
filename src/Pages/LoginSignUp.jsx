import React, { useState } from "react";
import "./Styles/LoginSignUp.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
    profile_pic: null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profile_pic: e.target.files[0] }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...", formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Show Name Field Only for Signup */}
          {!isLogin && (
            <div className="input-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required={!isLogin} />
            </div>
          )}

          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          {/* Show Extra Fields Only for Signup */}
          {!isLogin && (
            <>
              <div className="input-group">
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Phone Number:</label>
                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Profile Picture:</label>
                <input type="file" onChange={handleFileChange} accept="image/*" />
              </div>
            </>
          )}

          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Not registered?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? "Sign up here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
