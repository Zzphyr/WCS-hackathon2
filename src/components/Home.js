import React from 'react';
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {

   

   return (
      <main>
         <h1>Santa Down the hill</h1>
         <Link to="/game" className="play-btn">Start Game!</Link>
         <Link to="/help" className="how-btn">Help</Link>
         <Link to="/about" className="about-btn">Who?</Link>
      </main>
   )
}

export default Home;