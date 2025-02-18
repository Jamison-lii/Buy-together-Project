import React from 'react'
import Search from '../Components/Search/Search.jsx'
import Categories from '../Components/Categories/Categories.jsx'
import './Styles/Products.css'

const Products = () => {
  return (
    <div>
        <div className="heading2">
          Products
        </div>

        <div className="head-description">
          Find the latest products just for you 
        </div>
       <Search placeholder= '...Search Products'/> 
       <Categories/>
    </div>
  )
}

export default Products