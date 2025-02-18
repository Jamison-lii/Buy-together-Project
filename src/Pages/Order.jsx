import React from 'react'
import './Styles/Order.css'

const Order = () => {

  const [menu, setMenu] = React.useState('AllOrders');

  return (
    <div className='order'>

        <p className='heading'>Orders</p>
       <div className="OpenText">
         <p>Track and Manage your orders with ease.</p>
        {/* <p>Meet up with deadlines</p>*/}
       </div>
       <div className="Order-categories">

       <div className="sections">
        <div className="AllOrders"  onClick={()=> {setMenu('AllOrders')}}>
          All Orders
         {menu ==='AllOrders' ? <hr/> : <></>}
        </div>
        <div className="InProcess" onClick={()=> {setMenu('InProcess')}} >
          In Process
          {menu ==='InProcess' ? <hr/> : <></>}
        </div>

        <div className="Done" onClick={()=> {setMenu('Done')}} >
          Done
          {menu ==='Done' ? <hr/> : <></>}
        </div>
      </div>

       </div>
    </div>
  )
}

export default Order