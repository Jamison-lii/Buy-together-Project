import React, { useState, useEffect } from "react";
import { useSearch } from "../Context/SearchContext"; // 🔹 Get selected product
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { selectedProd } = useSearch(); // 🔹 Get selected product from context

  const [formData, setFormData] = useState({
    campaignName: "",
    targetPeople: "",
    minTargetAmount: "",
    deadline: "",
    product: null, // 🔹 Initialize product as null
  });

  const [message, setMessage] = useState("");

  // ✅ Use Effect to update formData when a product is selected
  useEffect(() => {
    if (selectedProd) {
      setFormData((prev) => ({
        ...prev,
        product: selectedProd, // ✅ Update formData with selected product
      }));
    }
  }, [selectedProd]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      product: null,
    });
  };

  return (
    <div style={styles.container}> 
      <h2>Create a Group Buying Campaign</h2>
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
          style={styles.dateInput}  
        />

        {/* ✅ Display Selected Product */}
        <div style={styles.productContainer}>
          <p style={styles.productText}>Selected Product: <strong>{formData.product ? formData.product.name : "None"}</strong></p>
          <button onClick={() => navigate('/createCampaign/selectProduct')} type="button" style={styles.productButton}>Select Product</button>
        </div>

        <button type="submit" style={styles.button}>Create Campaign</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #444", fontSize: "16px" },
  dateInput: { padding: "10px", borderRadius: "5px", border: "1px solid #444", fontSize: "16px", backgroundColor: "#fff", color: "#000" },
  productContainer: { marginTop: "15px", textAlign: "center" },
  productText: { fontSize: "16px", fontWeight: "bold" },
  productButton: { padding: "8px 12px", background: "black", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  button: { marginTop: "20px", padding: "10px", background: "black", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  message: { color: "lightgreen" },
};

export default CreateCampaign;
