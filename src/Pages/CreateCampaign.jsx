import React, { useState } from "react";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    targetPeople: "",
    minTargetAmount: "",
    deadline: "",
    product: "", // New field for product selection
  });

  const [message, setMessage] = useState("");

  const products = ["Laptop", "Smartphone", "Tablet", "Headphones", "Camera"];

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`Updated ${name}:`, value); // Debugging
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.campaignName || !formData.targetPeople || !formData.minTargetAmount || !formData.deadline || !formData.product) {
      setMessage("All fields are required!");
      return;
    }

    console.log("Campaign Data Submitted:", formData);
    setMessage("Campaign Created Successfully!");

    // Reset Form
    setFormData({
      campaignName: "",
      targetPeople: "",
      minTargetAmount: "",
      deadline: "",
      product: "",
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
          placeholder="Date"
          style={styles.dateInput}  
        />

        {/* New Product Selection Dropdown 
        <select
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select a Product</option>
          {products.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>
            */}
           <p style={styles.productText}>Selected Product: <strong>{formData.product || "None"}</strong></p>
          <button type="button" style={styles.productButton}>Select Product</button>

        
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
    productText:{
      color: "black",
    },
    productButton:{
      padding: "8px 12px", 
      background: "black", 
      color: "white", 
      border: "none", 
      borderRadius: "5px", 
      cursor: "pointer",
      width: "70%",
      marginLeft: "45px",
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
    dateInput: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #444",
      fontSize: "16px",
      backgroundColor: "#fff",
      color: "#000",
    },
    select: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #444",
      fontSize: "16px",
      backgroundColor: "transparent",
      color: "#fff",
    },
    button: {
      marginTop: "30px",
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

export default CreateCampaign;
