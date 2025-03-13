import React from 'react'
import './Styles/UpdateCampaign.css'
import { useSearch } from '../Context/SearchContext'
import { useState, useEffect } from 'react'
const UpdateCampaign = () => {

    const [message, setMessage] = useState("");

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

    const { camp } = useSearch();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value || "" });
      };

    const handleSubmit = async (e) =>{

        e.preventDefault();
        console.log("submitting");
    if (
      !formData.campaignName ||
      //!formData.targetPeople ||
      //!formData.minTargetAmount ||
      !formData.start_date ||
      !formData.product_quantity ||
      !formData.end_date||
      !formData.description||
      !formData.target_amount||
      !formData.amount_per_person||
      !formData.product_name||
      !formData.product_description||
      !formData.product_unit_price||
      !formData.product_bulk_price||
      !formData.product_quantity||
      !formData.product_image
      //!formData.product
    ) {
      setMessage("⚠️ All fields are required!");
      return;
    }

        await updatePurchaseGoal();
    } ;

    useEffect(() => {
        if (camp) {
            const startDate = camp.start_date ? camp.start_date.split("T")[0] : "";
    const endDate = camp.end_date ? camp.end_date.split("T")[0] : "";
          setFormData((prev) => ({
            ...prev,
            campaignName: camp.title || "",
            description: camp.description || "",
            target_amount: camp.target_amount || "",
            amount_per_person: camp.amount_per_person || "",
            group_link: camp.group_link || "",
            start_date: startDate || "",
            end_date: endDate || "",
            product_name: camp.product.name || "",
            product_description: camp.product.description || "",
            product_unit_price: camp.product.unit_price || "",
            product_bulk_price: camp.product.bulk_price || "",
            product_quantity: camp.product.quantity || "",
            product_image: camp.product.image || null,
          }));
        }
      }, [camp]);

   async function updatePurchaseGoal(){
      const Url= `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${camp.id}`
      const token = localStorage.getItem("token");

      const campaignData = new FormData();
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
  
      console.log(Url);
       
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

      console.log("from form",formData);
      for (let [key, value] of campaignData.entries()) {
        console.log("from cam data",key, value);
      }

      console.log("This is the campaign data", campaignData);

      try {
        const response = await fetch(Url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: campaignData,
        });

        
  
        const data = await response.json();
        console.log("API Response:", data);
  
        if (response.ok) {
          setMessage("✅ Campaign Created Successfully!");
          // setFormData({
          //   campaignName: "",
          //   description: "",
          //   target_amount: "",
          //   amount_per_person: "",
          //   // targetPeople: "",
          //   // minTargetAmount: "",
          //   group_link: "",
          //   start_date: "",
          //   end_date: "",
          //   // product: null,
          //   product_name: "",
          //   product_description: "",
          //   product_unit_price: "",
          //   product_bulk_price: "",
          //   product_quantity: "",
          //   product_image: "",
          // });
  
          // navigate("/");
        } else {
          setMessage(data.message || "❌ Failed to create campaign.");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("❌ Something went wrong. Try again.");
      }

   }



  return (
    <div style={styles.container}>
       
        
        <p style={styles.update}>Update</p>

<form onSubmit={handleSubmit} style={styles.form}>
  {/* Campaign Name */}
  <label style={styles.label}>Campaign Name</label>
  <input
    type="text"
    name="campaignName"
    placeholder="Campaign Name"
    value={formData.campaignName}
    onChange={handleChange}
    required
    style={styles.input}
  />

  {/* Campaign Description */}
  <label style={styles.label}>Campaign Description</label>
  <textarea
    name="description"
    placeholder="Campaign Description"
    value={formData.description}
    onChange={handleChange}
    required
    style={styles.input}
  />

  {/* Product Name */}
  <label style={styles.label}>Product Name</label>
  <input
    name="product_name"
    placeholder="Product Name"
    value={formData.product_name}
    onChange={handleChange}
    required
    style={styles.input}
  />

  {/* Product Description */}
  <label style={styles.label}>Product Description</label>
  <textarea
    name="product_description"
    placeholder="Product Description"
    value={formData.product_description}
    onChange={handleChange}
    required
    style={styles.input}
  />

  {/* Unit Price */}
  <label style={styles.label}>Unit Price</label>
  <input
    type="number"
    name="product_unit_price"
    placeholder="Unit Price"
    value={formData.product_unit_price}
    onChange={handleChange}
    required
    style={styles.input}
  />

  {/* Bulk Price */}
  <label style={styles.label}>Bulk Price</label>
  <input
    type="number"
    name="product_bulk_price"
    placeholder="Bulk Price"
    value={formData.product_bulk_price}
    onChange={handleChange}
    required
    style={styles.input}
  />

  {/* Total Amount */}
  <label style={styles.label}>Total Amount</label>
  <input
    type="number"
    name="target_amount"
    placeholder="Total Amount"
    value={formData.target_amount}
    onChange={handleChange}
    required
    style={styles.input}
  />

  {/* Amount Per Person */}
  <label style={styles.label}>Amount Per Person</label>
  <input
    type="number"
    name="amount_per_person"
    placeholder="Amount Per Person"
    value={formData.amount_per_person}
    onChange={handleChange}
    required
    style={styles.input}
  />

  {/* Product Quantity */}
  <label style={styles.label}>Product Quantity</label>
  <input
    type="number"
    name="product_quantity"
    placeholder="Product Quantity"
    value={formData.product_quantity}
    onChange={handleChange}
    required
    style={styles.input}
  />

  {/* Group Link */}
  <label style={styles.label}>Group Link</label>
  <input
    type="text"
    name="group_link"
    placeholder="Group Link"
    value={formData.group_link}
    onChange={handleChange}
    style={styles.input}
  />

  {/* Start Date */}
  <label style={styles.label}>Start Date</label>
  <input
    type="date"
    name="start_date"
    value={formData.start_date}
    placeholder="Start Date"
    onChange={handleChange}
    required
    style={styles.dateInput}
  />

  {/* End Date */}
  <label style={styles.label}>End Date</label>
  <input
    type="date"
    name="end_date"
    value={formData.end_date}
    placeholder="End Date"
    onChange={handleChange}
    required
    style={styles.dateInput}
  />

  {/* Product Image */}
  <label style={styles.label}>Product Image</label>
  <input
    type="file"
    accept=".jpeg,.png,.jpg"
    name="product_image"
    style={styles.input}
    onChange={handleFileChange}
  />

  {/* Submit Button */}
  <button type="submit" onClick={handleSubmit} style={styles.button}>
    Update Campaign
  </button>
</form>

        {console.log(camp)}
    </div>

  )
}

const styles = {
    container: {
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      textAlign: "center",
    },

     update: {
        fontWeight: "600px"
     },

    form: { display: "flex", flexDirection: "column", gap: "10px" },
    label: {
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "5px",
      textAlign: "left",
    },
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

export default UpdateCampaign