import React from 'react';
import { Link } from "react-router-dom";
import './Results.css';

const Result = ({time, score}) => {
   return (
      <main>
         <h1 className="result-title">Result</h1>
         <div>
            <p>Time: {time} secs</p>
            <p>Score: {score} points</p>
         </div>
         <Link to="/" className="goHome-btn">home sweet home</Link>
      </main>
   )
}

export default Result;