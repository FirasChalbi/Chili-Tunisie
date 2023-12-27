import React, { useState } from 'react';
import './contact.css'; // Import your CSS file for styling
import chili from '../images/chili.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    nomPrenom: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Handle successful form submission (e.g., show success message)
        console.log('Contact form submitted successfully!');
      } else {
        // Handle server errors or validation errors
        console.error('Error submitting contact form:', response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error submitting contact form:', error);
    }
  };
  

  return (
    <div className="contact-container">
      <div className="contact-box">
        <div className="contact-header">
          <h2>Prendre Contact</h2>
        </div>
        <div className='contact-row'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="nomPrenom"
                placeholder="Nom et Prénom"
                value={formData.nomPrenom}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                style={{height:'70px'}}  
                name="message"
                placeholder="Votre message ici"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <button className='button4' type="submit">Envoyer</button>
            </div>
          </form>
          <div className="circle-image">
            <img src={chili} alt='chili'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
