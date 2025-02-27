import React from 'react'
import { useSearch } from '../Context/SearchContext'
import DetailsCard from '../Components/DetailsCard/DetailsCard';
import { useNavigate } from 'react-router-dom';

const CampaignDetails = () => {
  const navigate = useNavigate();
  const {camp} = useSearch();
  return (
    <div>
       <div  className="camp-details-container">
          <DetailsCard  id={camp.id} image={camp.image} name={camp.name} new_price={camp.new_price} category={camp.category} discount={camp.discount} criteria={camp.criteria} maxNumOfParticipants={camp.maxNumOfParticipants} presentNumOfParticipants={camp.presentNumOfParticipants} deadline={camp.deadline} creator={camp.creator} /> 
       <button onClick={() =>{  navigate(`/campaign/${camp.id}/modalities`)}}  className='createCampaignBtn'>Join Campaign</button> 
    </div>
   </div> 
  )
}

export default CampaignDetails

