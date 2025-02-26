import React from 'react'
import './Styles/Home.css'
import { Link } from 'react-router-dom'
import all_product from '../Components/1RenderingAssets/all_product'
import Card from '../Components/Cards/Card'
import { useNavigate } from 'react-router-dom'
import new_collections from '../Components/1RenderingAssets/new_collections'

const Home = () => {
  const navigate = useNavigate()
   return (
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

      <div className="top">
        <p>Top</p>
    {/*<hr />*/ }    
      </div>
     <div>
      <div className="card1">
      {new_collections.map((p) =>{
        return      <div key={p.id} onClick={() => navigate(`/campaign/${p.id}`)}>
               <Card key={p.id} image={p.image} name={p.name} new_price={p.new_price} />
             </div>
         })}
      </div>
      <div className="card2"></div>
     </div>
   
    </div>
  )
}

export default Home