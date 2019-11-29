import React from 'react';
import './Santa.css';

const Santa = ({ santa }) => {
   return (
      <div className="santa" style={{ top: santa.sposY, width: santa.sSize, height: santa.sSize }}>
      </div>
   )
}

export default Santa;