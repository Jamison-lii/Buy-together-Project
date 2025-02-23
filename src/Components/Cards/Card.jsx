import React from 'react'
import prod_img from '../Assets/product_1.png'
import './Card.css'
import prod_img1 from '../Assets/product_10.png'
import prod_img2 from '../Assets/product_15.png'

const Card = (prop) => {
  return (
    <div>
        <div className="cardContainer">
            <img src={prop.image} alt="Product" />
            <h3>Group Name</h3>
            
            <h4>{prop.name}</h4> 
            <h4>{prop.new_price}$</h4>


           
         {/*   <button>Add to Cart</button>*/}
        </div>
    </div>
  )
}

export default Card