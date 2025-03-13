import React from 'react'
import './DetailsCard.css'

const DetailsCard = (prop) => {
  return (
    <div className='details_'>
         <h1>{prop.name}</h1>
    <img src={prop.image} alt={prop.name} />
    <p className='p1'>Price: {prop.new_price} CFA</p>
    <p className='p2'>Category: {prop.category}</p>
    <p className='p3'>Bulk Price: {prop.discount} CFA </p>
    <p className='p4'>Description: {prop.description}</p>

    {  (prop.deadline)?

    <div>
        <p className='p5'>Maximum number of Participants: {prop.maxNumOfParticipants}</p>
        <p className='p6'>Present number of Participants: {prop.presentNumOfParticipants}</p>
        {/* <p className='p7'>Maximum number of Participants: {prop.maxNumOfParticipants}</p> */}
        <p className='p8'>Campaign Ends: {prop.deadline}</p>
        <p className='p9'>Creator: {prop.creator}</p>
    </div>
    :
    
    <></>}
    </div>
  )
}

export default DetailsCard