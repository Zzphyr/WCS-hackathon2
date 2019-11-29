import React from 'react';
import './Santa.css';

const Santa = ( {santa} ) => {
   return (
      <div className="santa" style={{top: santa.sposY}}>
      </div>
   )
}

export default Santa;