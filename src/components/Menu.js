import React, { useState, useEffect } from 'react';
import './menu.css';
import Rchili from '../images/Rchili.png';
import Lchili from '../images/Lchili.png';

const Menu = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('http://localhost:5000/foods');
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  
  const handleFoodItemClick = (foodItem) => {
   
    console.log(`Clicked on ${foodItem.name}`);
   
  };

  
  const organizedMenuData = menuData.reduce((acc, foodItem) => {
    const category = foodItem.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(foodItem);
    return acc;
  }, {});

  return (
    <div className='menu'>
      <div className='container-menu'>
        <div className='column-menu'>
          <div className='top-menu'>
            <div className='img-container'>
              <img src={Lchili} alt="First Image" />
            </div>
            <div className='menu-title'>Notre Menu</div>
            <div className='img-container'>
              <img src={Rchili} alt="Second Image" />
            </div>
          </div>

          {Object.keys(organizedMenuData).map((category, index) => (
            <div key={index} className='category'>
              <h3>{category}</h3>
              <div className='food-grid'>
                {organizedMenuData[category].map((foodItem, foodIndex) => (
                  <div
                    key={foodIndex}
                    className='food-item'
                    onClick={() => handleFoodItemClick(foodItem)}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${foodItem.filename}`}
                      alt={foodItem.name}
                    />
                    <div className='food-details'>
                      <h4>{foodItem.name}</h4>
                      <p>{foodItem.price} DT</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='button2'>
                <button className='thm-btn2 bgclr-2'>Voir Plus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
