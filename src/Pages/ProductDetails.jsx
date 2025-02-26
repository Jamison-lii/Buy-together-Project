import React from 'react'
import './Styles/ProductDetails.css'
import { useSearch } from '../Context/SearchContext'
import DetailsCard from '../Components/DetailsCard/DetailsCard'

const ProductDetails = () => {

  const { prod } = useSearch();
  return (
    <div>
      
        
          <div className="product-details-container">
          <DetailsCard id={prod.id} image={prod.image} name={prod.name} new_price={prod.new_price} category={prod.category} discount={prod.discount} criteria={prod.criteria} />
          <button className='createCampaignBtn'>Create Campaign</button>
        </div>
      
      
       
    </div>
  
  )
}

export default ProductDetails