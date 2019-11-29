import React from 'react';
import { Link } from "react-router-dom";
import './About.css';

const About = () => {

   

   return (
      <main>
         <h1>About</h1>
         <Link to="/" className="goHome-btn">home sweet home</Link>
      </main>
   )
}

export default About;