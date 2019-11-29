import React from 'react';
import './GameWorld.css';

const ShowGameInfo = ({ score, santa }) => {
   return (
      <div className="ingame-info">
         <p>Score: {score}</p>
         <p>Life: {santa.life}</p>
      </div>
   )

}

export default ShowGameInfo;

