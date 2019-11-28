import React, { Component } from 'react';
import GameWorld from './components/GameWorld';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      santa: {
        sposY: 20,
        crashed: false
      },
      tree: {
        tposX: 500,
        tposY: 100,
        velocity: 50
      }
    };
  }

  componentDidMount() {
    // start listening
    document.addEventListener('keydown', this.handleKeyPress);
    setInterval(() => {
        this.gravity();
        //this.handleMoveTrees();
      }, 500);
  }

  // pull santa down
  gravity = () => {
    if (this.state.santa.crashed===false) {this.handleFallDown()}
  }

  // on keyboard press
  handleKeyPress = (event) => {
    // when pressing up or down keys
    if (event.key === "ArrowUp") {
      this.handleMove('up');
    // a bit obsolete but thing of it as giving a gravity assisted push
    } else if (event.key === "ArrowDown") {
      this.handleMove('down');
    }
  }
/*   // on keyboard press
  handleKeyPress = (event) => {
    // when pressing spacebar
    if (event.key === "ArrowUp") {
      this.handleMoveUp();
      console.log("upme!");
    } else if (event.key === "ArrowDown") {
      this.handleFallDown();
      console.log("going down");
    }
  } */

  // move Santa uphill
  handleMove = (dir) => {
    // each jump is 50px
    if (dir==='up' && this.state.santa.sposY > 50) {dir = -50} else if (dir==='down') {dir=+30}
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
    let newSantaHeight = 0;
    let crash = this.state.santa.crashed;
    // div height is 400, santa is 30 right now
    if (prevSantaHeight <= 400-31 && prevSantaHeight > -50) {
      newSantaHeight = prevSantaHeight + 10;
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

  
  render() {
    const { tree, santa } = this.state;
    //console.log(santa);
    return (
      <div className="App">
        <GameWorld tree={tree} santa={santa} />
      </div>
    )

  }  
}

export default App;
