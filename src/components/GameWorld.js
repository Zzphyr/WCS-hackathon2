import React, { Component } from 'react';
import Santa from './Santa';
import Trees from './Trees';
import './GameWorld.css';

class GameWorld extends Component {
   constructor(props) {
      super(props);
      this.state = {
         santa: {
         sposY: 20,
         crashed: false
         },
         trees: [
/*             {
               tposX: 600,
               tposY: 0,
               velocity: 0,
               isHit: false
            } */
         ]
      };
   }   
   
   componentDidMount() {
      // start listening
      document.addEventListener('keydown', this.handleKeyPress);
      setInterval(() => {
         //this.gravity();
         //this.handleMoveTrees();
      }, 50);
      setInterval(()=> {
         //console.log(this.randomInterval())
         //this.handleTreesGeneration();
      }, this.randomInterval())
   }

   // randomize timer call
   randomInterval = () => {
      return Math.floor(Math.random() * 1000) + 500;
   }

   // pull santa down
   gravity = () => {
      if (this.state.santa.crashed===false) {this.handleFallDown()}
   }

   // on keyboard press
   handleKeyPress = (event) => {
      // when pressing up or down keys
      if (event.key === "ArrowUp" || event.key === " ") {
         this.handleSantaMove('up');
      // a bit obsolete but thing of it as giving a gravity assisted push
      } else if (event.key === "ArrowDown") {
         this.handleSantaMove('down');
      }
   }

   // move Santa uphill
   handleSantaMove = (dir) => {
      // each jump is 50px
      if (dir==='up' && this.state.santa.sposY > 50) {
         dir = -50;
      } else if (dir==='down') {
         dir = +50;
      }
      this.setState ((prevState)=>{
         return {
            santa: {
               ...prevState.santa,  
               sposY: prevState.santa.sposY + dir,
               crashed: false
            }
         }  
      })
   }

   // make Santa falldown (gravity)
   handleFallDown = () => {
      let prevSantaHeight = this.state.santa.sposY;
      let crash = this.state.santa.crashed;
      let newSantaHeight = 0;
      // div height is 400, santa is 30 right now
      if (prevSantaHeight <= 400-31 && prevSantaHeight > -50) {
         newSantaHeight = prevSantaHeight + 5;
      } else if (prevSantaHeight > 400-31) {
         console.log("On the floor!")
         newSantaHeight = 400 - 30;
         crash = true;
      } else {
         console.log("On the ceiling!")
         newSantaHeight = 1;
      }
      this.setState(()=>{
         return{
            santa: {
               ...this.state.santa,
               sposY: newSantaHeight,
               crashed: crash
            }
         }
      })
   }



   handleTreesGeneration = () => {
      let numTrees = this.decideNumTreeGen();
      console.log("numTrees",numTrees);
      this.setState(()=>{
         let newX = 650;
         let newY = Math.floor(Math.random() * (400-30));
         return {
            trees: [
               {
               ...this.state.trees,
               tposX: newX,
               tposY: newY,
               }
            ]
         }
      })
   }

   decideNumTreeGen = () => {
      // if *4 then create 0 to 3 trees
      return Math.floor(Math.random() * 4);
   }

   //handleMoveTrees = () => {};
   



   
   render() {
      const { trees, santa } = this.state;
      //console.log("trees",trees);
      console.log("type game",typeof trees)
      return (
         <div className="world">
            <Santa santa={santa} />
            <Trees trees={trees}/>
         </div>
      )
   }
}

export default GameWorld;