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
               isHit: false,
               id: 0
            } */
         ]
      };
   }   
   
   componentDidMount() {
      // start listening
      document.addEventListener('keydown', this.handleKeyPress);
      const refreshRate = 50; 

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
      let numTrees = Array(this.decideNumTreeGen()).fill("new tree");
      let newX = 680;
      for (let i in numTrees) {
         let newY = Math.floor(Math.random() * (400-30));
         
         this.setState(()=>{
            return {
               trees: [
                  ...this.state.trees,
                  {
                     tposX: newX,
                     tposY: newY,
                     //tID: treeID,
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
      let currentTreeArray = this.state.trees;
      currentTreeArray.forEach((el, i)=>{
         if (el.tposX < 5) {
            this.setState(()=>{ 
               currentTreeArray.splice(i,1);
            })
         } else {
            this.setState(()=>{ 
               el.tposX -= 5;
            })
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