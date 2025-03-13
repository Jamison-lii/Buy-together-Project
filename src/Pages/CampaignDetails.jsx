import React, { useEffect, useState } from 'react';
import { useSearch } from '../Context/SearchContext';
import DetailsCard from '../Components/DetailsCard/DetailsCard';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

const CampaignDetails = () => {
  const navigate = useNavigate();

  const { camp, setCamp } = useSearch();
  const [campaignData, setCampaignData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   const user = JSON.parse(localStorage.getItem("user")) || {};

  console.log("this is that info of the user that you wanted",user);

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

      console.log(response); 
      toast.success("joined successfully");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Purchase Goal:", data);
      setCampaignData(data);
      console.log("This is campaign data",campaignData);
    } catch (error) {
      console.error("Error fetching purchase goal:", error);
      setError("❌ Failed to load campaign details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading campaign details...</p>;
  if (error) return <p>{error}</p>;
  if (!campaignData) return <p>No campaign data available.</p>;
   
  const campEndDate = campaignData.end_date ? camp.end_date.split("T")[0] : "";
  const DateOfToday = new Date();
  const endDate = new Date(campEndDate);
  console.log(DateOfToday);

  const handleJoin= async() => {
    const Url= `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${campaignData.data.id}/join`
    const token = localStorage.getItem("token");
    //const user = localStorage.getItem("user");
       
    if(DateOfToday > endDate){
      console.log("Campaign has ended")
      toast.error("Sorry Campaign ended ");
    }
    else{
    try {
      const response = await fetch(Url, {
          
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },

      });

      const data = await response.json();
      console.log("API Response:", data);
      if (response.ok){
        console.log("Joined");
      }
    }catch (error) {
      console.error("Error:", error);

  }
}
}



   

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
        />

        {
         user.id == camp.created_by.id?
        <button onClick={()=>{navigate("/viewParticipants")}} className="createCampaignBtn">
          View Requests
        </button>
          :<button onClick={ handleJoin  }className="createCampaignBtn">
          Join Campaign
        </button>
        }
      </div>
      {console.log("This is camp from the home page:", camp)}

      <ToastContainer/>
    
    </div>
  );
};

export default CampaignDetails;
