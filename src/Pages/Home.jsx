import React from 'react'
import './Styles/Home.css'
import { Link } from 'react-router-dom'
import all_product from '../Components/1RenderingAssets/all_product'
import Card from '../Components/Cards/Card'
import { useNavigate,} from 'react-router-dom'
import new_collections from '../Components/1RenderingAssets/new_collections'
import { useSearch } from '../Context/SearchContext'
import  hero_image from '../Components/1RenderingAssets/hero_image.png'
import { useState, useEffect } from 'react'

const Home = () => {
  const { setCamp, camp } = useSearch();
  const navigate = useNavigate()   


    ////////////////////////////////////
    const [purchaseGoals, setPurchaseGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPurchaseGoals();
  }, []);

  const fetchPurchaseGoals = async () => {
    const url = "https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals";
   // const token = localStorage.getItem("token"); // Assuming authentication is required

    // if (!token) {
    //   setError("⚠️ User not authenticated. Please log in.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`, // Pass the token for authentication
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Purchase Goals:", data); // Debugging log
      setPurchaseGoals(data); // Assuming data is an array
    } catch (error) { 
      console.error("Error fetching purchase goals:", error);
      setError("❌ Failed to load purchase goals.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading purchase goals...</p>;
  if (error) return <p>{error}</p>;


    //////////////////////////////////////



   return (
    <div>
     <div className='contforleftpart'> 
      <div>
      <div className="openMessage">
        Join Group Buying Campaigns  -Buy More Pay less
       
      </div>
      <div className="homeContent">
        <h1> Get massive discounts by Joining Group Buying Campaigns.</h1>
        
      </div> 
     <div className='Trial'> 
      <Link style={{textDecoration: 'none'}} to='/createCampaign'> <button className='seeCampaigns-btn'>Create Campaigns</button> </Link>
      </div>
      </div>
      <div className="heroimage">
        <img src={hero_image} alt="" />
      </div>
       
      </div>

     
      <div className="top">
        <p>Some ongoing campaigns below :</p>
    {/*<hr />*/ }    
      </div>
     <div className="cardRenderSection">
      <div className="card1">
       {purchaseGoals.data.map((p) =>{
        return      <div key={p.id} onClick={() => { console.log("Setting camp:", p); setCamp(p); navigate(`/campaign/${p.id}`)}}>
               <Card key={p.id} image={p.product?.image} name={p.title} new_price={p.product?.unit_price} />
             </div>
         })} 
         {console.log(camp)}  
      </div>
      <div className="card2"></div>
     </div>
   
    </div>
  )
}

export default Home