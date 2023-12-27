import React from 'react';
import './menubutton.css'
import menu from '../images/menu1.png';

const MenuButton = ({ onClick, isOpen }) => {
  return (
    <div style={{textAlign:"right"}}>
    <button className='menuButton' id="sidebarCollapse" onClick={onClick}>
      <img src={menu} alt='menu'/>
    </button>
    </div>
  );
};

export default MenuButton;
