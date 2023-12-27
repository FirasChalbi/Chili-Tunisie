
import React, { useState } from 'react';
import MenuButton from './MenuButton';
import './welcome.css';


export const Welcome = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    const handleSidebarClose = () => {
      setSidebarOpen(false);
    };

  return (
    <section className='welcome'>
      <div className="logo">
        <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 296 154"><path fill="#5E9732" d="M256.7 91.4l-9.2-4.2c-6.4-2.8-14.5-6.3-14.5-15.5 0-4.8 3.5-11 11-11s10.7 5.5 12.5 9c2 3.5 4.4 7.5 10.1 7.5 5.2 0 8.8-3.9 8.8-9 0-7.4-8.3-19.7-30.5-19.7-23.4 0-32 14-32 27 0 17.1 14.7 24.3 20.2 26.9 4.6 2.2 15.4 7 18.3 9.5 2.5 2.1 6 5.1 6 11.3 0 6.8-5 11.4-11.6 11.4-7.4 0-10.7-4.8-15.1-11-2.6-3.5-5.2-7.2-10.3-7.2-5.3 0-9.4 4.4-9.4 9.9 0 7.4 8.8 22.3 34.2 22.3 27.4 0 33.1-18.6 33.1-28.9.1-17.7-13.1-24.3-21.6-28.3zm-50.6-59c.4-3.7-1.1-6.3-2.6-8.7-3.5-5-5.4-7.9-4.9-12.7.7-7 6.8-11.7 14.2-10.9 8.3.9 15.5 8.1 14.1 21.6-2.2 20.6-22.1 36-29 35.2-2.8-.3-4.5-2.7-4.3-5.3.2-2 1-3 2.7-4.6 5.5-5.4 9.3-9.6 9.8-14.6z"></path><path fill="#EE3124" d="M196.3 71.6c-7.8-7.4-10.4-6-15.5-21.5-2.5-7.6-7.1-16.6-14.9-19.3-13.5-4.6-27.7 5.6-37 14.6C119 55 114.8 66 89.2 83.2 82 88 73.4 91.2 65 92.8c-10.6 2-19.5-1.2-29.9-2C15.4 89.1 0 96.6 0 108.4s30.1 32 55.4 36.6c32.4 5.9 58.4 4.2 75.7-1 31.2-9.5 48.3-21.4 62.8-36 9.6-9.6 15-24.4 2.4-36.4z"></path><path fill="#FFF" d="M97.4 104c-6.6 2.7-17.6 3-18.5-.9-.6-2.8 5-1.4 11.2-5 8.1-4.6 10.6-7 12.8-4.9 2.8 2.7 2.8 7.4-5.5 10.8zm46.8-31.1c-22.1 17-31.8 24.4-34.8 16.8-1.6-4.2 5.4-6.9 11.5-12.8 7.7-7.5 16.8-19.2 25.3-26.1 9.9-8 16.1-5.7 18.3-.9 3.3 7.1-8 13.5-20.3 23z"></path><path fill="#5E9732" d="M288.8 143.4c0 2.9-2.4 5.3-5.4 5.3-3 0-5.4-2.3-5.4-5.3 0-2.9 2.4-5.2 5.4-5.2 3-.1 5.4 2.2 5.4 5.2zm-9.5 0c0 2.3 1.8 4.2 4.1 4.2s4-1.9 4-4.2c0-2.3-1.7-4.2-4.1-4.2-2.2 0-4 1.9-4 4.2zm3.3 2.7h-1.2v-5.2c.5-.1 1.2-.2 2-.2 1 0 1.4.2 1.8.4.3.2.5.6.5 1.1 0 .6-.5 1.1-1.1 1.2v.1c.5.2.8.6.9 1.3.2.8.3 1.1.4 1.3h-1.3c-.2-.2-.3-.6-.4-1.3-.1-.5-.4-.8-1.1-.8h-.6l.1 2.1zm0-2.9h.6c.7 0 1.2-.2 1.2-.8 0-.5-.4-.8-1.1-.8-.3 0-.5 0-.7.1v1.5z"></path></svg>
        </a>
      </div>
      <div className='container-welcome'>
        <div className='row-welcome'>
          <div className="food-image"></div>
          <div className='column-welcome'>
            <MenuButton onClick={handleSidebarToggle} />
            <h4>Chili's Tunisie</h4>
            <div className='titre'>Découvrez les<br />meilleures recettes<br />syriennes</div>
            <div className="button1">
              <div className="read-more-button">
                <a className="thm-btn bgclr-1" href="/menu">Voir notre menu</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div id="sidebar">
            <div className='button3'>
          <button className="close-button" onClick={handleSidebarToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              className="svg-icon"
              viewBox="0 0 50 50"
            >
              <path
                className="svg-icon"
                d="M 0 0 L 50 50 M 0 50 L 50 0"
                stroke="white"
                strokeWidth="3"
              ></path>
            </svg>
          </button>
          </div>
          <div className="sidebar-content" id="sidebar-content">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">Start Order</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>

            </ul>
          </div>
        </div>
      </div>
      <div className='shadow'></div>
    </section>
  );
};