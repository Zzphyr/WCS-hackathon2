import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import GameWorld from './components/GameWorld';
import Result from './components/Result';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      score: 0,
      name: "hello"
    };
  }

  handleSetScoreTime = (score, time) => {
    this.setState((prevState)=> {
      return {
        ...prevState,
        time: time,
        score: score
      }
   })
  }

 
  render() { 
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/home' component={Home} />
            <Route 
              exact path='/' 
              render={()=> (
                <GameWorld
                  onSetScoreTime={this.handleSetScoreTime} 
                  name={this.state.name}            
                />
              )} 
            />
            <Route 
              path='/result' 
              render={()=> (
                <Result
                score={this.state.score} 
                time={this.state.time}            
                />
              )} 
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }  
}

export default App;
