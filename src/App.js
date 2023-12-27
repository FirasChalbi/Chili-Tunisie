import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminPanel from './pages/AdminPanel';
import Admin from './pages/Admin';
import FoodUpdate from './components/CRUD/FoodUpdate';
import { MenuPage } from './pages/MenuPage';
import { ContactPage } from './pages/ContactPage';
import GetFood from './components/CRUD/GetFood';

function App() {
  return (
    <div className="App">
      <Router>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<GetFood />} />
                    <Route path="/admin/add" element={<Admin />} />
                    <Route path="/admin/:id" element={<FoodUpdate />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
