import React from 'react'
import './DetailsCard.css'

const DetailsCard = (prop) => {
  return (
    <div className='details_'>
         <h1>{prop.name}</h1>
    <img src={prop.image} alt={prop.name} />
    <p className='p1'>Price: ${prop.new_price}</p>
    <p className='p2'>Category: {prop.category}</p>
    <p className='p3'>Discount: {prop.discount} %</p>
    <p className='p4'>Criteria: Discount of {prop.discount}% after every {prop.criteria} purchases</p>

    {  (prop.deadline)?

    <div>
        
    </div>
    :
    
    <></>}
    </div>
  )
}

export default DetailsCard