import React from 'react'
import './Styles/Home.css'
import { Link } from 'react-router-dom'
import all_product from '../Components/1RenderingAssets/all_product'
import Card from '../Components/Cards/Card'

const Home = () => {
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
      {all_product.map((product) =>{
             return <Card key={product.id} image={product.image} name={product.name} new_price={product.new_price} />
         })}
      </div>
      <div className="card2"></div>
     </div>
   
    </div>
  )
}

export default Home