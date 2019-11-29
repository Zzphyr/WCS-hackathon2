import React, { Component } from 'react';
import Santa from './Santa';
import Trees from './Trees';
import ShowGameInfo from './ShowGameInfo';
import { withRouter } from 'react-router-dom';
import './GameWorld.css';

class GameWorld extends Component {
   constructor(props) {
      super(props);
      this.state = {
         santa: {
            sposY: 20,
            crashed: false,
            life: 3,
            tookDamage: false
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
      this.detectCol = setInterval(() => {
         this.detectCollision();
         
      }, 220);

   }

   // randomize timer call
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
            if (el.tposX < 5) {
               currentTreeArray.splice(i,1);
            } else {
               el.tposX -= 5;
            }
         })
      })
   }

   detectCollision = () => {
      this.setState((prevState)=> {
         let treeArray = prevState.trees;
         let santaPosY = prevState.santa.sposY; 
         treeArray.forEach((el) => {
            // santa posX is 50, width is 30, height is 30
            // tree width is 20
            if (el.tposX < 50 + 30 && el.tposX + 20 > 50 && el.tposY < santaPosY + 30 && el.tposY + 20 > santaPosY) {
               console.log("hit me baby")
               // damage Santa
               if (prevState.santa.life > 0) {
                  setTimeout(()=>{
                     this.resetSantaTookDamage();
                  }, 200)
                  this.setState((prevState)=> {
                     return {
                        santa: {
                           ...prevState.santa,
                           tookDamage: true,
                           life: prevState.santa.life -1,
                        }
                     }
                  })
               } else {
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
      console.log("DEAD!")
      clearInterval(this.gravInterval);   
      clearInterval(this.createTreesInterval);   
      clearInterval(this.moveTreesInterval);   
      clearInterval(this.detectCol); 
      setTimeout(()=>{
         // to allow use of withRouter
         const { history } = this.props;
         history.push('/result');
      }, 1000);
      console.log("name",this.state.score, this.state.time)
      this.props.onSetScoreTime(this.state.score, this.state.time);
   }
   
   
   render() {
      const { trees, santa, score } = this.state;
      console.log("santa", santa.tookDamage)
      return (
         
         <div className={!santa.tookDamage ? "world" : "redworld"}>
            <Santa santa={santa} />
            <ShowGameInfo score={score} santa={santa} />
            <Trees trees={trees} />
         </div>
      )
   }
}

export default withRouter(GameWorld);