import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';

import AddFood from '../components/CRUD/AddFood';
import GetFood from '../components/CRUD/GetFood';

const Admin = () => {
  const [uploadMessage, setUploadMessage] = useState('');

  const handleUpload = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/foods', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      
      if (response.ok) {
        setUploadMessage(data.message);
      } else {
        setUploadMessage('File upload failed. Please try again.');
      }

    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('An error occurred during file upload.');
    }
  };

  return (
    <div>
      <Sidebar />
      <AddFood onUpload={handleUpload} />
      <p>{uploadMessage}</p>
      <hr />
      
    </div>
  );
};

export default Admin;
