import React, { useState } from 'react'
import Search from '../Components/Search/Search'
import './Styles/Campaigns.css'

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
      <Search  placeholder= '...Search Campaigns'/>
      </div>

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
      
    </div>
  )
}

export default Campaigns