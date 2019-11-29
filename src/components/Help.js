import React from 'react';
import { Link } from "react-router-dom";
import './Help.css';

const Help = () => {

   return (
      <main>
         <h1 className="help-title">How to play</h1>
         <h2 className="help-story">
            It's nearly Christmas and Santa is super busy going from nice kids to naughty kid and all the hopeful adults in between. Even if they live in a mountain! 
            <br/>
            <br/>
            It's a difficult job but <strong>YOU</strong> can help Santa in his journey!
         </h2>
         <div>
            <p>Santa will slowly move down the slope because... well, gravity.</p>
            <p>Avoid the trees! Don't break Santa's nose, ok?</p>
            <p>Use the spacebar to jump up!</p>
            <figure>
               <img className="help-img" src="https://i.imgur.com/7mcoYIi.png" alt="spacebar key icon"/>
            </figure>
            <p>Alternatively use the Up arrow key, and Down arrow key for an extra boost!</p>
            <figure className="arraykeys">
               <img className="help-img" src="https://i.imgur.com/B9zK7Zs.png" alt="arrow keys icon" />
            </figure>
         </div>

         <Link to="/" className="goHome-btn">home sweet home</Link>
      </main>
   )
}

export default Help;