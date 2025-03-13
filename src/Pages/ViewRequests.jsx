import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSearch } from "../Context/SearchContext";
import "./Styles/viewRequests.css";

const ViewRequests = () => {
  const [activeTab, setActiveTab] = useState("approved"); // Default tab
  const [loading, setLoading] = useState(true); // Loading state
  const [members, setMembers] = useState([]); // State to store members
  const { camp } = useSearch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (camp) {
      display();
    }
  }, [camp]);

  // Fetch members from the API
  const display = async () => {
    const url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${camp.id}/participants`;

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
      }else{
       
      }

      const data = await response.json();
      setMembers(data.data); // Update members state with fetched data
    } catch (error) {
      console.error("Error fetching purchase goal:", error);
      toast.error("Failed to fetch members. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to approve a pending member
  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${camp.id}/approve/${id}`,
        {
          method: "POST", // or 'PUT' depending on your API
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      }).then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
      });

    //   if (!response.ok) {
    //     throw new Error("Failed to approve member");
    //   }else{
    //     console.log("this is the response", response);
    //   }

      // Update the local state to reflect the change
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id ? { ...member, status: "approved" } : member
        )
      );

      

      toast.success("Member approved successfully!");
    } catch (error) {
      console.error("Error approving member:", error);
      toast.error("Failed to approve member. Please try again.");
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await fetch(
        `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${camp.id}/decline/${id}`,
        {
          method: "POST", // or 'PUT' depending on your API
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve member");
      }else{
        console.log("this is the response", response);
      }

      // Update the local state to reflect the change
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id ? { ...member, status: "approved" } : member
        )
      );

      toast.success("Member declined successfully!");
    } catch (error) {
      console.error("Error declining member:", error);
      toast.error("Failed to decline member. Please try again.");
    }
  };

  // Filter members based on the active tab
  const filteredMembers = members.filter((member) => member.status === activeTab);

  console.log("All members",members);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div className="members-container">
        <h2 className="members-title">Members</h2>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => handleTabChange("approved")}
          >
            Approved
          </button>
          <button
            className={`tab-button ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => handleTabChange("pending")}
          >
            Pending
          </button>
          <button
            className={`tab-button ${activeTab === "declined" ? "active" : ""}`}
            onClick={() => handleTabChange("declined")}
          >
            Declined
          </button>
        </div>
        <div className="members-list">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-header">
                  <h3 className="member-name">{member.name}</h3>
                  <span className={`member-status ${member.status}`}>
                    {member.status}
                  </span>
                </div>
                <div className="member-details">
                  <p>
                    <strong>Email:</strong> {member.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {member.phone_number}
                  </p>
                  <p>
                    <strong>Address:</strong> {member.address}
                  </p>
                  <p>
                    <strong>Joined At:</strong> {member.joined_at}
                  </p>
                </div>
                {member.status === "pending" && (
                    <>
                  <button
                    className="approve-button"
                    onClick={() => handleApprove(member.id)}
                  >
                    Approve
                  </button>

                  <button
                    className="decline-button"
                    onClick={() => handleDecline(member.id)}
                  >
                    Decline
                  </button>

                  </>
                )}
              </div>
            ))
          ) : (
            <p className="no-members">No members found.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewRequests;