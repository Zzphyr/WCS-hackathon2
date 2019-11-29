import React from 'react';
import { Link } from "react-router-dom";
import './Results.css';

const Result = ({time, score }) => {
   return (
      <main>
         <h1 className="result-title">Oh no! Santa has fainted!</h1>
         <div className="result-gamedata">
            <p>Time: {time} secs</p>
            <p>Score: {score} points</p>
         </div>
         <figure>
            <img className="result-img" src="https://i.imgur.com/9L2P892.gif" alt="santa skiing down a mountain" />
         </figure>
         <h3 className="result-subtitle">... but he shall be back for more!</h3>
         <div className="inresult-btns">
            <Link to="/scoreboard" className="saveScore-btn" >Save your score?</Link>
            <Link to="/" className="goHome-btn">home sweet home</Link>
         </div>
      </main>
   )
}

export default Result;