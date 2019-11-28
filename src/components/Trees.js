import React from 'react';
import './Trees.css';

const Trees = ({ tree }) => {


   return (
      <React.Fragment>
         <div className="tree" style={{top: tree.tposY, left: tree.tposX}}> </div>
      </React.Fragment>
   )
}

export default Trees;