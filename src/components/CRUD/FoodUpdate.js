import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const FoodUpdate = ({ fetchFoods, onNavigate }) => {
  const { id } = useParams();
  const [updatedFood, setUpdatedFood] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    file: null,
  });

  useEffect(() => {
    const fetchFoodById = async () => {
      try {
        const response = await fetch(`http://localhost:5000/foods/${id}`);
        const data = await response.json();
        setUpdatedFood({
          name: data.name || '',
          price: data.price || '',
          category: data.category || '',
          description: data.description || '',
          file: data.filename || null,
        });
      } catch (error) {
        console.error('Error fetching food:', error);
      }
    };

    fetchFoodById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFood({
      ...updatedFood,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setUpdatedFood({
      ...updatedFood,
      file: e.target.files[0],
    });
  };

  const updateFood = async () => {
    try {
      const formData = new FormData();
      formData.append('name', updatedFood.name);
      formData.append('price', updatedFood.price);
      formData.append('category', updatedFood.category);
      formData.append('description', updatedFood.description);

      
      if (updatedFood.file) {
        formData.append('avatar', updatedFood.file);
      }

      await fetch(`http://localhost:5000/foods/${id}`, {
        method: 'PUT',
        body: formData,
      });

      fetchFoods();

      
      onNavigate('/admin');
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };
    return (
      <div>
        <h2>Edit Food</h2>
        <form>
          <label>Name:</label>
          <input type="text" name="name" value={updatedFood.name} onChange={handleInputChange} />
          <br />

          <label>Price:</label>
          <input type="text" name="price" value={updatedFood.price} onChange={handleInputChange} />
          <br />

          <label>Category:</label>
          <input type="text" name="category" value={updatedFood.category} onChange={handleInputChange} />
          <br />

          <label>Description:</label>
          <input type="text" name="description" value={updatedFood.description} onChange={handleInputChange} />
          <br />

          <label>Image:</label>
          <input type="file" name="avatar" onChange={handleFileChange} />
          <br />
          <Link to={`/admin`}>
          <button type="button" onClick={updateFood}>
            Update Food
          </button>
          </Link>
        </form>
      </div>
    );
  };

  export default FoodUpdate;
