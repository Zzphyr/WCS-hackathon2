import React, { Component } from 'react';
import Santa from './Santa';
import Trees from './Trees';
import ShowGameInfo from './ShowGameInfo';
import { withRouter } from 'react-router-dom';
import './GameWorld.css';

// declaring constants
const jumpH = 75;
const areaH = 700;
const areaW = 1050;
const treeSize = 45;
const santaSize = 90;


class GameWorld extends Component {
   constructor(props) {
      super(props);
      this.state = {
         santa: {
            sposX: 50,
            sposY: 20,
            crashed: false,
            life: 3,
            tookDamage: false,
            sSize: santaSize,
         },
         trees: [],
         score: 0,
         isGameOver: false,
         time: 0
      };
   }   
   
   componentDidMount() {
      // start listening
      document.addEventListener('keydown', this.handleKeyPress);
      const refreshRate = 40; 

      // set the timer
      this.setTimer();

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
         this.handleScore();
      }, refreshRate);
      
      // detect collision and reset santa damaged status
      // increase time to make santa less sensitive to damage
      this.detectCol = setInterval(() => {
         this.detectCollision();
      }, 720);
   }

   // randomize create trees timer
   randomInterval = () => {
      return Math.floor(Math.random() * 50) + 500;
   }

   // get score by how long you're alive
   handleScore = () => {
      this.setState((prevState)=> {
         return {
            score: prevState.score + 10
         }
      })
   }

   setTimer = () => {
      this.timerInterval = setInterval(() => {
         this.setState((prevState) => ({
           ...prevState,
           time: prevState.time +1,
         }))
      }, 1000)
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
         if (dir==='up' && prevState.santa.sposY > jumpH) {
            dir = -jumpH;
         } else if (dir==='down') {
            dir = +jumpH;
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
      this.setState((prevState) => {
         let prevSantaHeight = prevState.santa.sposY;
         let crash = prevState.santa.crashed;
         let damage = prevState.santa.tookDamage;
         let newSantaHeight = 0;
         // div height is 400, santa is 30 right now
         if (prevSantaHeight <= areaH-santaSize && prevSantaHeight > -jumpH) {
            newSantaHeight = prevSantaHeight + 7;
         } else if (prevSantaHeight > areaH-santaSize) {
            console.log("Hit the floor!")
            crash = true;
            damage = true;
            newSantaHeight = areaH-santaSize;
            this.gameOver();
         } else {
            console.log("Hit the ceiling!")
            newSantaHeight = 1;
         }
         return{
            santa: {
               ...prevState.santa,
               sposY: newSantaHeight,
               crashed: crash,
               tookDamage: damage,
            }
         }
      })
   }

   handleTreesGeneration = () => {
      let numTrees = this.decideNumTreeGen();
      for (let i=0; i<numTrees; i++) {
         this.setState((prevState)=>{
            let newX = areaW-treeSize;
            let newY = Math.floor(Math.random() * (areaH-treeSize));
            return {
               trees: [
                  ...prevState.trees,
                  {
                     tposX: newX,
                     tposY: newY,
                     tSize: treeSize
                  }
               ]
            }
         })
      }
   }

   decideNumTreeGen = () => {
      // if *4 then create 0 to 3 trees per column
      return Math.floor(Math.random() * 4);
   }

   handleMoveTrees = () => {
      this.setState((prevState) => { 
         let currentTreeArray = prevState.trees;
         currentTreeArray.forEach((el, i)=>{
            if (el.tposX < 7) {
               currentTreeArray.splice(i,1);
            } else {
               el.tposX -= 7;
            }
         })
      })
   }

   detectCollision = () => {
      this.setState((prevState)=> {
         let treeArray = prevState.trees;
         let santa = prevState.santa; 
         treeArray.forEach((el) => {
            // santa posX is 50, width is 30, height is 30
            // tree width is 20
            if (el.tposX < santa.sposX + santaSize && el.tposX + treeSize > santa.sposX && el.tposY < santa.sposY + santaSize && el.tposY + treeSize > santa.sposY) {
               console.log("hit me baby")
               // damage Santa
               setTimeout(()=>{
                  this.resetSantaTookDamage();
               }, 280)  
               this.setState((prevState)=> {
                  return {
                     santa: {
                        ...prevState.santa,
                        tookDamage: true,
                        life: prevState.santa.life -1,
                     }
                  }
               })
               if (prevState.santa.life <= 1) {
                  this.gameOver();
               } 
            }
         })
      })
   } 

   resetSantaTookDamage = () => {
      this.setState((prevState)=> {
         if(prevState.santa.tookDamage) {
            return {
               santa: {
                  ...prevState.santa,
                  tookDamage: false,
               }
            }
         }
      })
   }

   gameOver = () => {
      clearInterval(this.timerInterval);   
      clearInterval(this.gravInterval);   
      clearInterval(this.createTreesInterval);   
      clearInterval(this.moveTreesInterval);   
      clearInterval(this.detectCol); 
      setTimeout(()=>{
         // to allow use of withRouter
         const { history } = this.props;
         history.push('/result');
      }, 300);
      this.props.onSetScoreTime(this.state.score, this.state.time);
   }
   
   
   render() {
      const { trees, santa, score } = this.state;
      return (  
         <div className={!santa.tookDamage ? "world" : "redworld"} >
            <Santa santa={santa} />
            <ShowGameInfo score={score} santa={santa} />
            <Trees trees={trees} />
         </div>
      )
   }
}

export default withRouter(GameWorld);