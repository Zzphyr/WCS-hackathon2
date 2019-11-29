import React from 'react';
import './Trees.css';

const Tree = ({ tree }) => {


   return (
      <React.Fragment>
         <div className="tree" style={{top: tree.tposY, left: tree.tposX, position: "absolute", height: tree.tSize, width: tree.tSize}}> </div>
      </React.Fragment>
   )
}

export default Tree;