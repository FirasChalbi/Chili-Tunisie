import React, { useState } from 'react';

const AddFood = ({ onUpload }) => {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    const selectedFoods = event.target.files[0];
    setFoods([selectedFoods]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('avatar', foods[0]);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);

    // Pass the form data
    onUpload(formData);

    try {
      // Simulate an asynchronous upload process
      await simulateUpload(formData);

      
      setUploadSuccess(true);
      setName('');
      setPrice('');
      setCategory('');
      setDescription('');
    } catch (error) {
      console.error('Upload failed:', error);
      
    }
  };

  const simulateUpload = (formData) => {
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        resolve();
        
      }, 2000); 
    });
  };

  return (
    <div style={{marginLeft:"20%"}}>
      <h1>Add Food</h1>
      {uploadSuccess && <p>Upload successful! Food added.</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="avatar">Choose a file:</label>
        <input type="file" name="avatar" id="avatar" onChange={handleFileChange} /><br />

        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} /><br />

        <label htmlFor="price">Price:</label>
        <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
        <label htmlFor="category">Category:</label>
        <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} /><br />
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea><br />

        <input type="submit" value="Add Food" />
      </form>
    </div>
  );
};

export default AddFood;

