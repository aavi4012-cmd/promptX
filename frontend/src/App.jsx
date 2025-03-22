import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Financials from './components/Financials';
import Metaverse from './components/Metaverse';
import './index.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/financials" element={<Financials />} />
                <Route path="/metaverse" element={<Metaverse />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
