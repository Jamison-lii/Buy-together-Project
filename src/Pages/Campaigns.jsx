import React, { useState } from 'react'
import Search from '../Components/Search/Search'
import './Styles/Campaigns.css'
import Card from '../Components/Cards/Card'
import all_product from '../Components/1RenderingAssets/all_product'
import new_collections from '../Components/1RenderingAssets/new_collections'

const Campaigns = () => {

     const [menu, setMenu] = useState('ForYou')
     

  return (
    <div>
      <p className="heading1">
        Campaigns
      </p>
      <div className="openText">
        <p className='openText1'>Get up to 50% off on</p>
        <p className='openText2'> Bulk Purchases</p>
      </div>
      <div className='containerforSearch'>
    {/*  <Search  placeholder= '...Search Campaigns'/>*/}
     

      <div className="sections">
        <div className="foryou"  onClick={()=> {setMenu('ForYou')}}>
          For You
         {menu ==='ForYou' ? <hr/> : <></>}
         
        </div>
        <div className="campaigns" onClick={()=> {setMenu('MyCampaigns')}} >
          MyCampaigns
          {menu ==='MyCampaigns' ? <hr/> : <></>}
        </div>
      </div>

      {menu ==='ForYou' ? 
      <div>
         {all_product.map((product) =>{
             return <Card key={product.id} image={product.image} name={product.name} new_price={product.new_price} />
         })}
      </div>:

         <>
            {new_collections.map((product) =>{
             return <Card key={product.id} image={product.image} name={product.name} new_price={product.new_price} />
         })}
         </>

         }
      </div>  
    </div>
  )
}

export default Campaigns