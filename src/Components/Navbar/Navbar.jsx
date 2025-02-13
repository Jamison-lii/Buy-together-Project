import React, { useState } from 'react';
import './Navbar.css';
import menu from '../Assets/icon-menu.svg';
import close from '../Assets/icon-menu-close.svg';
import logo from  '../Assets/logo1.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  function handleToggle() {
    setShowMenu(prev => !prev); // ✅ Correctly toggling state
  }

  return (
    <>
      <div className='navbar'>
        <div className='mt-4 ml-5 font-bold text-xl flex '>
          <img className="logo" src={logo} alt="logo" />
          <p className='logo-text'>GroupBuy</p>
        </div>

        <div className='menu'>
          {/* ✅ Pass function reference, not function call */}
          <img className='menu_icon' onClick={handleToggle} src={menu} alt="Menu Icon" />
         
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
