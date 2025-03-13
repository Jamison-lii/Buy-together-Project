import React, { useState, useEffect } from "react";
import Search from "../Components/Search/Search";
import "./Styles/Campaigns.css";
import Card from "../Components/Cards/Card";
import all_product from "../Components/1RenderingAssets/all_product";
import new_collections from "../Components/1RenderingAssets/new_collections";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../Context/SearchContext";

const Campaigns = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { camp, setCamp } = useSearch();
  const [menu, setMenu] = useState("ForYou");

  const handleDelete = async () => {
    const Url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${camp.id}`;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(Url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Campaign deleted successfully");
        console.log(data);
        // Refresh the campaigns list after deletion
        fetchPurchaseGoal();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchPurchaseGoal = async () => {
    const url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals`;

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
      console.log("Fetched Purchase Goals:", data);
      setAllCampaigns(data.data);
    } catch (error) {
      console.error("Error fetching purchase goals:", error);
      setError("❌ Failed to load campaign details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseGoal();
  }, []);

  if (loading) return <p>Loading campaign details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="all">
        <p className="heading1">Campaigns</p>
        <div className="openText">
          <p className="openText1">Get up to 50% off on</p>
          <p className="openText2"> Bulk Purchases</p>
        </div>
        <div className="containerforSearch">
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
              My Campaigns
              {menu === "MyCampaigns" ? <hr /> : <></>}
            </div>
          </div>

          {menu === "ForYou" ? (
            <div className="cards-container">
              {allCampaigns.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {{ setCamp(product);
                    navigate(`/campaign/${product.id}`);
                  }}}
                >
                  <Card
                    key={product.id}
                    image={product.product?.image}
                    name={product.title}
                    new_price={product.product?.bulk_price}
                  />
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}

          {menu === "InProcess" ? <div></div> : <></>}

          {menu === "MyCampaigns" ? (
            <div className="cards-container">
              {allCampaigns.map((product) => {
                if (user.name === product.created_by.name) {
                  return (
                    <div key={product.id}>
                      <div
                        onClick={() => {
                          setCamp(product);
                          navigate(`/campaign/${product.id}`);
                        }}
                      >
                        <Card
                          key={product.id}
                          image={product.product?.image}
                          name={product.title}
                          new_price={product.product?.bulk_price}
                        />
                      </div>
                      {/* Render the two-buttons div only for the user's campaigns */}
                      <div className="two-buttons">
                        <div className="button1">
                          <p>Pay</p>
                        </div>
                        <div
                          onClick={() => {
                            setCamp(product);
                            navigate(`/updateCampaign`);
                          }}
                          className="button2"
                        >
                          <p>Update</p>
                        </div>
                        <div className="button3" onClick={()=>{setCamp(product); handleDelete()}}> 
                          <p>Delete</p> 
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null; // Skip rendering for campaigns not created by the user
                }
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;