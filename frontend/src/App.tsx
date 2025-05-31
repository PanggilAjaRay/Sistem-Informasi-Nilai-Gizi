import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import FoodsPage from './pages/FoodsPage';
import BeveragesPage from './pages/BeveragesPage';
import ItemDetailPage from './pages/ItemDetailPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<FoodsPage />} />
          <Route path="/beverages" element={<BeveragesPage />} />
          <Route path="/foods/:id" element={<ItemDetailPage />} />
          <Route path="/beverages/:id" element={<ItemDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App