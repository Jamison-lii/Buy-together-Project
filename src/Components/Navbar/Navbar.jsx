import React, { useState } from 'react';
import './Navbar.css';
import menu1 from '../Assets/icon-menu.svg';
import close from '../Assets/icon-menu-close.svg';
import logo from  '../Assets/logo1.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  function handleToggle() {
    setShowMenu(prev => !prev); // ✅ Correctly toggling state
  }

  const [menu, setMenu] = useState("Home");

  return (
    <>
      <div className='navbar'>
        <div className='mt-4 ml-5 font-bold text-xl flex '>
          <img className="logo" src={logo} alt="logo" />
          <p className='logo-text'>GroupBuy</p>
        </div>
      <div className="navlinks-section">
        <div className='menu'>
          {/* ✅ Pass function reference, not function call */}
          <img className='menu_icon' onClick={handleToggle} src={menu1} alt="Menu Icon" />

          <ul className='list-items-lg '>
            
            <li onClick={() => {setMenu("Home")}} style={{listStyle: 'none'}}> <Link style={{textDecoration: 'none'}} to='/'>Home</Link> {menu==="Home"?<hr/>:<></>}</li>
            
            <li onClick={() => {setMenu("Products")}}> <Link style={{textDecoration: 'none'}} to='/products'>Products</Link>{menu==="Products"?<hr/>:<></>} </li>
           
            <li onClick={() => {setMenu("Campaigns")}}> <Link style={{textDecoration: 'none'}} to='/campaigns'>Campaigns</Link>{menu==="Campaigns"?<hr/>:<></>} </li>
           
            <li onClick={() => {setMenu("Orders")}}> <Link style={{textDecoration: 'none'}} to='/order'>Order</Link> {menu==="Orders"?<hr/>:<></>}  </li>
            
            <li onClick={() => {setMenu("Profile")}}> <Link style={{textDecoration: 'none'}} to='/profile'>Profile</Link> {menu==="Profile"?<hr/>:<></>}</li>
           
            
          </ul>
         
          </div>
        </div>
      </div>
      <hr className='line' />
      {showMenu ? showMenu && (
           
           <div className='drawer'>
            <img className='menu_icon' onClick={handleToggle} src={close} alt="Menu Icon" />
            <ul className='list-items '>
            <hr />
            <li > <Link style={{textDecoration: 'none'}} to='/'>Home</Link></li>
            <hr />
            <li> <Link style={{textDecoration: 'none'}} to='/products'>Products</Link> </li>
            <hr />
            <li> <Link style={{textDecoration: 'none'}} to='/campaigns'>Campaigns</Link> </li>
            <hr />
            <li> <Link style={{textDecoration: 'none'}} to='/order'>Order</Link> </li>
            <hr />
            <li> <Link style={{textDecoration: 'none'}} to='/profile'>Profile</Link> </li>
            <hr />

            <li> <Link style={{textDecoration: 'none'}} to='/auth'>Login/SignUp</Link> </li>
            <hr />
            <li> <Link style={{textDecoration: 'none'}} to='/'>Other</Link> </li>
            <hr />
            
          </ul>
           </div>
          )
          :
          <>
          </>
          
          }
    </>
  );
}

export default Navbar;
