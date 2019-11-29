import React from 'react';

const ShowGameInfo = ({ score, santa }) => {
   return (
      <div>
         <p>Score: {score}</p>
         <p>Life: {santa.life}</p>
      </div>
   )

}

export default ShowGameInfo;

