import React from 'react';
import Santa from './Santa';
import Trees from './Trees';
import './GameWorld.css';

const GameWorld = ( {tree, santa } ) => {


   return (
      <div className="world">
         <Santa santa={santa} />
         <Trees tree={tree}/>
      </div>
   )
}

export default GameWorld;