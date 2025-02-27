import React, { useState } from 'react';
import './Styles/CampaignModalities.css';

const CampaignModalities = () => {
  const [userId, setUserId] = useState('');
  const [units, setUnits] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    console.log(`User ID: ${userId}, Units: ${units}`);
  };

  return (
    <div>
      <h2>Campaign Modality</h2>

      <form className="input-form" onSubmit={handleSubmit}>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId} // ✅ Controlled Input
          onChange={(e) => setUserId(e.target.value)} // ✅ Updates state
          placeholder="Enter User ID"
          required
        />

        <label htmlFor="units">Number of Units:</label>
        <input
          type="number"
          id="units"
          value={units} // ✅ Controlled Input
          onChange={(e) => setUnits(e.target.value)} // ✅ Updates state
          placeholder="Enter Quantity"
          min="1"
          required
        />

        <button type="submit">Proceed</button>
      </form>
    </div>
  );
};

export default CampaignModalities;
