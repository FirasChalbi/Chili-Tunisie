// src/pages/LandingPage/LandingPage.js
import React from 'react';
import './LandingPage.css';
import { Welcome } from '../components/Welcome';
import Menu from '../components/Menu';
import Contact from '../components/Contact';
import Footer from '../components/Footer';


const LandingPage = () => {
  return (
    <div className="landing-page">
      <Welcome />
      <Menu />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
