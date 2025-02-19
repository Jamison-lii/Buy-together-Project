import React from 'react'
import  './Styles/Profile.css'
import profile from '../Components/Assets/Profile.png'

const Profile = () => {
  return (
    <div>
      <div className="img-container">
        <img src={profile} alt="" />
        <h2>Jamison Lii</h2>
      </div>
     

      <div className="categories-container">
    <div className="categories">
       <div className="varieties">
        Orders
       </div>

       <div className="varieties">
        Help Center
       </div>
 
     </div>
    </div>

     <div className="info-div">
       <hr />
    <div className="info">
      <div className="Address">
        Address
      </div>
      <div className="Address-Info">
        <p>123 Main St</p>
        <p>City, State, Zip</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: jamison@example.com</p>
        <p>Website: www.example.com</p>
        
      </div>
    </div>
     <hr />
     </div>  



     <div className="info-div1">
     {/*  <hr />*/}
    <div className="info1">
      <div className="Address1">
        Personal Info
      </div>
      <div className="Address-Info1">
        <p>Name: Jamison Lii</p>
        <p>Date of Birth: 1990-01-01</p>
        <p>Gender: Male</p>
        <p>Occupation: Software Engineer</p>
        <p>Hobbies: Reading, Painting</p>
        
      </div>
    </div>
     <hr />
     </div>  



     <div className="info-div1">
     {/*  <hr />*/}
    <div className="info2">
      <div className="Address1">
        Payment Details
      </div>
      <div className="Address-Info1">
        <p>Credit Card: 1234 5678 9012 3456</p>
        <p>Expiration: MM/YY</p>
        <p>CVV: 123</p>
        <p>Billing Address: 123 Main St</p>
        <p>City, State, Zip</p>
        
        
      </div>
    </div>
     <hr />
     </div>  


    </div>
  )
}

export default Profile