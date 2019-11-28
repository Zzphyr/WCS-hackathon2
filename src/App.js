import React, { Component } from 'react';
import GameWorld from './components/GameWorld';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

 
  render() { 
    return (
      <div className="App">
        <GameWorld />
      </div>
    )
  }  
}

export default App;
