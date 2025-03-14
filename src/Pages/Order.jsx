import React, { useEffect, useState } from 'react';
import './Styles/Order.css';
import { toast, ToastContainer } from 'react-toastify';
import { useSearch } from '../Context/SearchContext';

const Order = () => {
  const [menu, setMenu] = useState('AllOrders');
  const [purchaseGoals, setPurchaseGoals] = useState([]);
  const [members, setMembers] = useState({}); // Store participants by purchase goal ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const {order} = useSearch();

  // Fetch participants for a specific purchase goal
  {/*const display = async (campaignId) => {
    const url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${campaignId}/participants`;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      const data = await response.json();
      setMembers((prevMembers) => ({
        ...prevMembers,
      [campaignId]: data.data, // Store participants by purchase goal ID
      }));
      members.forEach((member)=>{
        console.log("yessss Memberss:",member)
      })
    } catch (error) {
      console.error("Error fetching participants:", error);
    //  toast.error("Failed to fetch members. Please try again.");
    }
  };

  // Fetch all purchase goals
  const fetchPurchaseGoals = async () => {
    const url = "https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Purchase Goals:", data.data); // Debugging log
      setPurchaseGoals(data.data); // Update purchase goals state

      // Fetch participants for each purchase goal
      data.data.forEach((purchaseGoal) => {
        display(purchaseGoal.id);
      });
    } catch (error) {
      console.error("Error fetching purchase goals:", error);
      setError("❌ Failed to load purchase goals.");
      toast.error("Failed to load purchase goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseGoals();
  }, []);

  if (loading) return <p>Loading purchase goals...</p>;
  if (error) return <p>{error}</p>;*/}

  return (
    <div className="order">
      {console.log("Here is orders",order)}
      <p className="heading">Orders</p>
      <div className="OpenText_">
        <p>View all of your Co-Cart orders with ease.</p>
      </div>
      <div className="Order-categories">
        <div className="sections">
          <div className="AllOrders" onClick={() => setMenu('AllOrders')}>
            All Orders
            {menu === 'AllOrders' ? <hr /> : <></>}
          </div>
          {/* <div className="InProcess" onClick={() => setMenu('InProcess')}>
            In Process
            {menu === 'InProcess' ? <hr /> : <></>}
          </div> */}
          <div className="Done" onClick={() => setMenu('Done')}>
            Done
            {menu === 'Done' ? <hr /> : <></>}
          </div>
        </div> 
      </div>

      <div className="order-card">
      <div className="order-header">
        <h3 className="order-title">Playstation Order</h3>
        <span className="order-status">open</span>
      </div>
      <div className="order-details">
        <p className="order-id">Order ID: 45</p>
        <p className="order-date">Date: Today</p>
        <p className="order-amount">Amount: 1</p>
      </div>
      <div className="order-footer">
        <button className="order-action">Pay</button>
        <button className="order-action1">Delete Order</button>
      </div>
    </div>

      <ToastContainer />
    </div>
  );
};

export default Order;