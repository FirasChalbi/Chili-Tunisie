import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './getfood.css';
import Sidebar from '../Sidebar';

const GetFood = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/foods')
      .then(response => response.json())
      .then(images => {
        if (Array.isArray(images)) {
          setUploadedImages(images);
        } else {
          console.error('Error: Images data is not an array');
        }
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch('http://localhost:5000/foods');
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  const handleDelete = async (foodId, imageName) => {
    try {
      await fetch(`http://localhost:5000/foods/${foodId}`, {
        method: 'DELETE',
      });

      // Update the state by removing the deleted food
      setFoods(prevFoods => prevFoods.filter(food => food._id !== foodId));
    } catch (error) {
      console.error('Error deleting food and image:', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <h1>Foods</h1>
      <div className='food-grid2' id="image-container">
        {Array.isArray(uploadedImages) ? (
          uploadedImages.map((file, index) => {
            const associatedFood = foods.find(food => food._id === file._id);

            
            if (associatedFood) {
              return (
                <div className='food-item2' key={index}>
                  <img src={`http://localhost:5000/uploads/${file.filename}`} alt={file.name}  />
                  <div className='food-details2'>
                    <h4>Name: {file.name}</h4>
                    <p>Price: {file.price}</p>
                    <p>Description: {file.description}</p>

                    <Link to={`/admin/${file._id}`}>
                      <a style={{marginLeft:"10px"}}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                          <path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"/>
                        </svg>
                      </a>
                    </Link>

                    {/* Delete Button */}
                    <a onClick={() => handleDelete(file._id, file.filename)} style={{marginLeft:"10px"}}>
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
                        <path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fill-rule="nonzero"/>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            }

            return null; // If associated food is not found, don't render
          })
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default GetFood;
