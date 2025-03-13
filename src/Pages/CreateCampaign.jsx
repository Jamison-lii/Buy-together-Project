import React, { useState, useEffect } from "react";
import { useSearch } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { selectedProd } = useSearch();

  const [formData, setFormData] = useState({
    campaignName: "",
    description: "",
    target_amount: "",
    amount_per_person: "",
    // targetPeople: "",
    // minTargetAmount: "",
    group_link: "",
    start_date: "",
    end_date: "",
    //  product: null,
    product_name: "",
    product_description: "",
    product_unit_price: "",
    product_bulk_price: "",
    product_quantity: "",
    product_image: null,
  });

  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   if (selectedProd) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       product: selectedProd,
  //       product_name: selectedProd.name || "",
  //       product_description: selectedProd.description || "",
  //       product_unit_price: selectedProd.new_price || "",
  //       product_bulk_price: selectedProd.old_price || "",
  //       product_quantity: selectedProd.quantity || "",
  //       product_image: selectedProd.image || null,
  //     }));
  //   }
  // }, [selectedProd]);

  useEffect(() => {
    setFormData((prev) => ({
      product_name: formData.product_name,
      product_description: formData.product_description,
      product_unit_price: formData.product_unit_price,
      product_bulk_price: formData.product_bulk_price,
      product_quantity: formData.product_quantity,
      // product_image: formData.product_image,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        console.log("invalid file type");
      }
      setFormData({
        ...formData,
        product_image: file,
      });
    }
    // setFormData({ ...formData, product_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    e.preventDefault();
    console.log("submitting");
    if (
      !formData.campaignName ||
      //!formData.targetPeople ||
      //!formData.minTargetAmount ||
      !formData.start_date ||
      !formData.product_quantity ||
      !formData.end_date
      //!formData.product
    ) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    await createPurchaseGoal(); // ✅ Calls API function
  };

  async function createPurchaseGoal() {
    const Url =
      "https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals";
    const token = localStorage.getItem("token");

    console.log("creating");

    if (!token) {
      setMessage("⚠️ User not authenticated. Please log in.");
      return;
    }

    const campaignData = new FormData();
    // Append each field manually from formData to campaignData
    campaignData.append("title", formData.campaignName);
    console.log("description:", formData.description);
    campaignData.append("description", formData.description);
    console.log("description1:", formData.description);
    campaignData.append("target_amount", formData.target_amount);
    campaignData.append("amount_per_person", formData.amount_per_person);
    // campaignData.append("targetPeople", formData.targetPeople);
    // campaignData.append("minTargetAmount", formData.minTargetAmount);
    campaignData.append("group_link", formData.group_link);
    campaignData.append("start_date", formData.start_date);
    campaignData.append("end_date", formData.end_date);
    campaignData.append("product_quantity", formData.product_quantity);

    // Append product-related fields if available
    if (formData.product_name)
      campaignData.append("product_name", formData.product_name);
    if (formData.product_description)
      campaignData.append("product_description", formData.product_description);
    if (formData.product_unit_price)
      campaignData.append("product_unit_price", formData.product_unit_price);
    if (formData.product_bulk_price)
      campaignData.append("product_bulk_price", formData.product_bulk_price);

    // Append the product image if it's available

    console.log("product image:", formData.product_image);
    if (formData.product_image) {
      campaignData.append("product_image", formData.product_image);
    }
    console.log("product image:", formData.product_image);

    console.log(campaignData); // For debugging: logs the FormData

    // After appending all formData fields to campaignData, log them properly
    campaignData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await fetch(Url, {
        // mode:"no-cors",
        method: "POST",
        headers: {
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,

          Accept: "application/json",
        },
        body: campaignData,
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        setMessage("✅ Campaign Created Successfully!");
        toast.success("Campaign Created Successfully!");
        setFormData({
          campaignName: "",
          description: "",
          target_amount: "",
          amount_per_person: "",
          // targetPeople: "",
          // minTargetAmount: "",
          group_link: "",
          start_date: "",
          end_date: "",
          // product: null,
          product_name: "",
          product_description: "",
          product_unit_price: "",
          product_bulk_price: "",
          product_quantity: "",
          product_image: "",
        });

        // navigate("/");
      } else {
        setMessage(data.message || "❌ Failed to create campaign.");
        toast.error("Failed to create campaign");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong. Try again.");
    }
  }

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
        <textarea
          name="description"
          placeholder="Campaign Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="product_name"
          placeholder="Product Name"
          value={formData.product_name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="product_description"
          placeholder="Product Description"
          value={formData.product_description}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="product_unit_price"
          placeholder="Unit Price"
          value={formData.product_unit_price}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="product_bulk_price"
          placeholder="Bulk Price"
          value={formData.product_bulk_price}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="target_amount"
          placeholder="Total Amount"
          value={formData.target_amount}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="amount_per_person"
          placeholder="Amount Per Person"
          value={formData.amount_per_person}
          onChange={handleChange}
          required
          style={styles.input}
        />
        {/* <input
          type="number"
          name="targetPeople"
          placeholder="Target Number of People"
          value={formData.targetPeople}
          onChange={handleChange}
          required
          style={styles.input}
        /> */}
        {/* <input
          type="number"
          name="minTargetAmount"
          placeholder="Minimum Target Amount"
          value={formData.minTargetAmount}
          onChange={handleChange}
          required
          style={styles.input}
        /> */}
        <input
          type="number"
          name="product_quantity"
          placeholder="Product Quantity"
          value={formData.product_quantity}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="group_link"
          placeholder="Group Link"
          value={formData.group_link}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          placeholder="Start Date"
          onChange={handleChange}
          required
          style={styles.dateInput}
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          placeholder="End Date"
          onChange={handleChange}
          required
          style={styles.dateInput}
        />
        {/* <div style={styles.productContainer}>
          <p style={styles.productText}>
            Selected Product: <strong>{formData.product_name || "None"}</strong>
          </p>
          <button
            onClick={() => navigate("/createCampaign/selectProduct")}
            type="button"
            style={styles.productButton}
          >
            Select Product
          </button>
        </div> */}
        <input
          type="file"
          accept=".jpeg,.png,.jpg"
          name="product_image"
          style={styles.input}
          onChange={handleFileChange}
        />
        <button type="submit" onClick={handleSubmit} style={styles.button}>
          Create Campaign
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #444",
    fontSize: "16px",
  },
  dateInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #444",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#000",
  },
  productContainer: { marginTop: "15px", textAlign: "center" },
  productText: { fontSize: "16px", fontWeight: "bold" },
  productButton: {
    padding: "8px 12px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: { color: "lightgreen" },
};

export default CreateCampaign;
