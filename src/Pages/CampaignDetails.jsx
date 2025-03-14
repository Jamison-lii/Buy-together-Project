import React, { useEffect, useState } from 'react';
import { useSearch } from '../Context/SearchContext';
import DetailsCard from '../Components/DetailsCard/DetailsCard';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const CampaignDetails = () => {
  const navigate = useNavigate();
  const { camp, setCamp, order, setOrder } = useSearch();
  const [campaignData, setCampaignData] = useState(null);
  const [members, setMembers] = useState([]); // Initialize as an empty array
  const [specificUser, setSpecificUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user")) || {};


  // Fetch campaign details only if `camp` exists
  useEffect(() => {
    if (camp && camp.id) {
      fetchPurchaseGoalById(camp.id);
      setCamp(camp);
    } else {
      setLoading(false);
      setError("No campaign selected.");
    }
  }, [camp]);

  
  

  const fetchPurchaseGoalById = async (id) => {
    const url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${id}`;

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
      setCampaignData(data);
    } catch (error) {
      console.error("Error fetching purchase goal:", error);
      setError("❌ Failed to load campaign details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch participants when campaignData is available
  useEffect(() => {
    if (campaignData && campaignData.data && campaignData.data.id) {
      display(campaignData.data.id);
    }
  }, [campaignData]);

  const display = async (campaignId) => {
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
      setMembers(data.data); // Update members state with fetched data

      // Log members after state update
      data.data.forEach((member) => {
        console.log("Here", member);

        if (user.id == member.id && member.status == "approved") {
          setSpecificUser(true);
        }
      });
    } catch (error) {
      console.error("Error fetching participants:", error);
     // toast.error("Failed to fetch members. Please try again.");
    }
  };

  if (loading) return <p>Loading campaign details...</p>;
  if (error) return <p>{error}</p>;
  if (!campaignData) return <p>No campaign data available.</p>;

  const campEndDate = campaignData.end_date ? campaignData.end_date.split("T")[0] : "";
  const DateOfToday = new Date();
  const endDate = new Date(campEndDate);

  const handleJoin = async () => {
    const Url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${campaignData.data.id}/join`;
    const token = localStorage.getItem("token");
    
    setOrder((prevOrders) => {
      console.log("prevOrders:", prevOrders);
      return [...prevOrders, campaignData.data];
    });
    console.log("this is the order id",order);
     
    if (DateOfToday > endDate) {
      console.log("Campaign has ended");
      toast.error("Sorry Campaign ended");
    } else {
      try {
        const response = await fetch(Url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Joined successfully");
        } else {
          toast.error("Error on joining");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleStatus = async () => {
    const Url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${campaignData.data.id}/change-status`;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(Url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Status changed successfully");
      } else {
        toast.error("Error on changing campaign status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="camp-details-container">
        <DetailsCard
          id={campaignData.data.id}
          image={campaignData.data.product?.image}
          name={campaignData.data.title}
          new_price={campaignData.data.product?.unit_price}
          category={campaignData.data.category}
          discount={campaignData.data.product?.bulk_price}
          description={campaignData.data.description}
          maxNumOfParticipants={campaignData.data.maxNumOfParticipants}
          presentNumOfParticipants={campaignData.data.number_of_participants}
          deadline={campaignData.data.end_date}
          creator={campaignData.data.created_by?.name}
          status={campaignData.data.status}
        />
        {specificUser ? (
          <div className='ml-12 mb-10'>
          <a
            href={campaignData.data.group_link}
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // Security best practice
            
          >
            Group Link: {campaignData.data.group_link}
          </a>
          </div>
        ) : (
          <></>
        )}

        {user.id === camp.created_by.id ? (
          <>
            <button onClick={() => navigate("/viewParticipants")} className="createCampaignBtn">
              View Requests
            </button>
            {campaignData.data.status === "open" ? (
              <button onClick={handleStatus} className="createCampaignBtn">
                Close Campaign
              </button>
            ) : (
              <button onClick={handleStatus} className="createCampaignBtn">
                Open Campaign
              </button>
            )}
          </>
        ) : (
          <button onClick={handleJoin} className="createCampaignBtn">
            Join Campaign
          </button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default CampaignDetails;