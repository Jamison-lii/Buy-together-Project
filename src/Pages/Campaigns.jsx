import React, { useState, useEffect } from "react";
import Search from "../Components/Search/Search";
import "./Styles/Campaigns.css";
import Card from "../Components/Cards/Card";
import all_product from "../Components/1RenderingAssets/all_product";
import new_collections from "../Components/1RenderingAssets/new_collections";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
  const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user")) || {}; 
console.log("This is the token:", user);
console.log("This is the username:", user.name);

  console.log("This is the token:", user);
  console.log("This is the token:", user.name);
  const [allCampaigns, setAllCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [menu, setMenu] = useState("ForYou");

  const fetchPurchaseGoal = async () => {
    const url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Purchase Goal:", data);
      setAllCampaigns(data.data);
    } catch (error) {
      console.error("Error fetching purchase goal:", error);
      setError("❌ Failed to load campaign details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseGoal();
  }, []);

  console.log("all purchase goals:", allCampaigns);

  if (loading) return <p>Loading campaign details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="all ">
        <p className="heading1">Campaigns</p>
        <div className="openText">
          <p className="openText1">Get up to 50% off on</p>
          <p className="openText2"> Bulk Purchases</p>
        </div>
        <div className="containerforSearch">
          {/*  <Search  placeholder= '...Search Campaigns'/>*/}

          <div className="sections">
            <div
              className="foryou"
              onClick={() => {
                setMenu("ForYou");
              }}
            >
              For You
              {menu === "ForYou" ? <hr /> : <></>}
            </div>

            <div
              className="foryou"
              onClick={() => {
                setMenu("InProcess");
              }}
            >
              In Process
              {menu === "InProcess" ? <hr /> : <></>}
            </div>

            <div
              className="campaigns"
              onClick={() => {
                setMenu("MyCampaigns");
              }}
            >
              MyCampaigns
              {menu === "MyCampaigns" ? <hr /> : <></>}
            </div>
          </div>

          {menu === "ForYou" ? (
            <div className="cards-container">
              {allCampaigns.map((product) => {
                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/campaign/${product.id}`);
                    }}
                  >
                    <Card
                      key={product.id}
                      image={product.product?.image}
                      name={product.title}
                      new_price={product.product?.bulk_price}
                    />{" "}
                  </div>
                );
              })}
            </div>
          ) : (
            //  <div className='cards-container'>
            //     {new_collections.map((product) =>{
            //      return <Card key={product.id} image={product.image} name={product.name} new_price={product.new_price} />
            //  })}
            //</div>
            <></>
          )}

          {menu == "InProcess" ? <div></div> : <></>}

          {menu == "MyCampaigns" ? (
            
            <div className="cards-container">
             <div className="campaign-contain"> 
              {allCampaigns.map((product) => {
                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/campaign/${product.id}`);
                    }}
                  >
                    {console.log("this is product///////////:",product.created_by.name)}
                    {
                      user.name === product.created_by.name?<div>

                    <Card
                      key={product.id}
                      image={product.product?.image}
                      name={product.title}
                      new_price={product.product?.bulk_price}
                    />
                     <div className="two-buttons ">
                      <div className="button1 "><p>Pay</p></div>
                      <div className=" button2"><p>Update</p></div>
                     </div>
                    </div>:<></> }
                  </div>
                );
              })}
            </div> 
            
            </div>
          ) : (
            <></>
          )}
        </div>
        {console.log("username:",user.name)}

      
      </div>
    </div>
  );
};

export default Campaigns;
