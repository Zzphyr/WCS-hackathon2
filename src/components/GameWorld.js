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
         trees: []
      };
   }   
   
   componentDidMount() {
      // start listening
      document.addEventListener('keydown', this.handleKeyPress);
      const refreshRate = 40; 

      // set gravity
      this.gravInterval = setInterval(() => {
         this.gravity();
      }, refreshRate);

      // create trees
      this.createTreesInterval = setInterval(()=> {
         this.handleTreesGeneration();
      }, this.randomInterval())

      // move trees sideways
      this.moveTreesInterval = setInterval(() => {
         this.handleMoveTrees();
         this.detectCollision();
      }, refreshRate);
   }
   
   componentWillUnmount() {
      clearInterval(this.gravInterval);   
      clearInterval(this.createTreesInterval);   
      clearInterval(this.moveTreesInterval);   
   }

   // randomize timer call
   randomInterval = () => {
      return Math.floor(Math.random() * 750) + 500;
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
      this.setState ((prevState)=>{
         // each jump is 50px
         if (dir==='up' && prevState.santa.sposY > 50) {
            dir = -50;
         } else if (dir==='down') {
            dir = +50;
         }
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
      this.setState((prevState)=>{
         let prevSantaHeight = prevState.santa.sposY;
         let crash = prevState.santa.crashed;
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
         return{
            santa: {
               ...prevState.santa,
               sposY: newSantaHeight,
               crashed: crash
            }
         }
      })
   }

   handleTreesGeneration = () => {
      let numTrees = this.decideNumTreeGen();
      for (let i=0; i<numTrees; i++) {
         this.setState((prevState)=>{
            let newX = 680;
            let newY = Math.floor(Math.random() * (400-30));
            return {
               trees: [
                  ...prevState.trees,
                  {
                     tposX: newX,
                     tposY: newY,
                     isHit: false,
                  }
               ]
            }
         })
      }
   }

   decideNumTreeGen = () => {
      // if *3 then create 0 to 2 trees
      return Math.floor(Math.random() * 3);
   }

   handleMoveTrees = () => {
      this.setState((prevState) => { 
         let currentTreeArray = prevState.trees;
         currentTreeArray.forEach((el, i)=>{
            if (el.tposX < 5) {
               currentTreeArray.splice(i,1);
            } else {
               el.tposX -= 5;
            }
         })
      })
   }

   detectCollision = () => {
      let treeArray = this.state.trees;
      let santaPosY = this.state.santa.sposY; 
      treeArray.forEach((el) => {
         // santa posX is 50, width is 30, height is 30
         // tree width is 20
         if (el.tposX < 50 + 30 && el.tposX + 20 > 50 && el.tposY < santaPosY + 30 && el.tposY + 20 > santaPosY) {
            console.log("hit me baby")
         }
      })
   }


   
   render() {
      const { trees, santa } = this.state;
      return (
         <div className="world">
            <div>
               <Santa santa={santa} />
            </div>
            <div >
               <Trees trees={trees}/>
            </div>
         </div>
      )
   }
}

export default GameWorld;