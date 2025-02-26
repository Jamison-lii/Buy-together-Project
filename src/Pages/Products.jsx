import React from 'react'
import Search from '../Components/Search/Search.jsx'
import Categories from '../Components/Categories/Categories.jsx'
import './Styles/Products.css'
import { useState } from 'react'
import { useSearch } from '../Context/SearchContext.jsx'
import CardProduct from '../Components/ProductCard/CardProduct.jsx'


const Products = () => {

  const { searchResults } = useSearch();
  return (
    <div className='product-page-container'>
    
        <div className="heading2">
          Products
        </div>
        
        <div className="head-description">
          Find the latest products just for you 
        </div>

        <div className="searchComponent">
          <Search /> 
        </div>
      <div className="cat-cont">
       <Categories/> 

       </div>

       

       
       </div> 

  )
}

export default Products