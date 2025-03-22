import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
    return (
        <nav>
            <h1>MetaFunds</h1>
            <div>
                <Link to="/">Dashboard</Link>
                <Link to="/portfolio">Portfolio</Link>
                <Link to="/financials">Financials</Link>
                <Link to="/metaverse">Metaverse</Link>
            </div>
        </nav>
    );
};

export default Navbar;
