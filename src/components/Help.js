import React from 'react';
import { Link } from "react-router-dom";
import './Help.css';

const Help = () => {

   

   return (
      <main>
         <h1>help</h1>
         <Link to="/" className="goHome-btn">home sweet home</Link>
      </main>
   )
}

export default Help;