import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  return (
    <nav className="banner">
      <div className="banner-logo">
        <h1>Javelir</h1>
      </div>
      <div className="banner-nav">
        <Link to="/"><button className="nav-button">Home</button></Link>
        <Link to="/blogs"><button className="nav-button">Blogs</button></Link>
        <button className="nav-button">Get in touch</button>
      </div>
    </nav>
  );
};

export default Banner;