import React, { useState } from "react";
import "./Styles/LoginSignUp.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    address: "",
    phone_number: "",
    profile_pic: null,
  });
  
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profile_pic: e.target.files[0] }));
  };

  // Validate Form Data
  const validateForm = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Invalid email format!";
    }
    
    if (!/^6\d{8}$/.test(formData.phone_number)) {
      return "Phone number must start with 6 and be 9 digits long!";
    }
    
    if (!isLogin && formData.password !== formData.password_confirmation) {
      return "Passwords do not match!";
    }
    
    return "";
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    const formDataToSend = new FormData();
  /*  Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });*/
    formDataToSend.append("email", formData.email);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("password_confirmation", formData.password_confirmation);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("address", formData.address);
  //  formDataToSend.append("profile_pic", formData.profile_pic);


    console.log({formData});
    console.log(isLogin);
    console.log({formDataToSend});

    const url = isLogin
      ? "https://rrn24.techchantier.site/buy-together-api/public/api/login"
      : "https://rrn24.techchantier.site/buy-together-api/public/api/register";

    try {
      const response = await fetch(url, {
        // mode:"no-cors",
        method: "POST",
        body: formDataToSend,
        header: {
          Accept: 'application/json',
          'Content-Type': "application/json"
        }
      });
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
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

          {!isLogin && (
            <>
              <div className="input-group">
                <label>Confirm Password:</label>
                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required={!isLogin} />
              </div>

              <div className="input-group">
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Phone Number:</label>
                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required maxLength="9" />
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
