import React from 'react';
import Tree from './Tree';
import './Trees.css';

const Trees = ({ trees }) => {
   return (
      <div>
         {   
         trees.map((el)=>{
            //console.log("el", el)
            return <Tree tree={el} />
         })
         }
      </div>
   )
}

export default Trees;