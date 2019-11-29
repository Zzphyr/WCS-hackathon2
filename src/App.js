import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import GameWorld from './components/GameWorld';
import Result from './components/Result';
import About from './components/About';
import Help from './components/Help';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      score: 0,
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
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/help' component={Help} />
            <Route 
              exact path='/game' 
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
