import React from 'react'

const CardProduct = (prop) => {
  return (
    <div>
        <div className="cardContainer">
            <img src={prop.image} alt="Product" />
            <h4>{prop.name}</h4> 
            <h4>{prop.new_price}$</h4>
            </div>

    </div>
  )
}

export default CardProduct