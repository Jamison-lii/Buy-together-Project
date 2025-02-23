import React, { useState } from "react";



const createCampaign = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    targetPeople: "",
    minTargetAmount: "",
    deadline: "",
  });

  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate Fields
    if (!formData.campaignName || !formData.targetPeople || !formData.minTargetAmount || !formData.deadline) {
      setMessage("All fields are required!");
      return;
    }

    console.log("Campaign Data Submitted:", formData);
    setMessage("Campaign Created Successfully!");

    // Reset Form (Optional)
    setFormData({
      campaignName: "",
      targetPeople: "",
      minTargetAmount: "",
      deadline: "",
    });
  };

  return (
    <div style={styles.container}> 
        <div className="title" style={styles.title}>
            Campaign Creation
        </div>
      <h2>Start a Group Buying Campaign</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="campaignName"
          placeholder="Campaign Name"
          value={formData.campaignName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="targetPeople"
          placeholder="Target Number of People"
          value={formData.targetPeople}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="minTargetAmount"
          placeholder="Minimum Target Amount"
          value={formData.minTargetAmount}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Create Campaign</button>
      </form>
    </div>
  );
};

const styles = {
    title:{
      fontSize: "24px",
      fontWeight: "600",
      color: "black",
    },
    container: {
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      background: "transparent",
      borderRadius: "8px",
      color: "#fff",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #444",
      fontSize: "16px",
      backgroundColor: "transparent",
      color: "#fff",
    },
    button: {
      padding: "10px",
      background: "black",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    message: {
      color: "lightgreen",
    },
  };


export default createCampaign;