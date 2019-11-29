import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import GameWorld from './components/GameWorld';
import Result from './components/Result';
import About from './components/About';
import Help from './components/Help';
import Scoreboard from './components/Scoreboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      score: 0,
      data: []
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

  handleSave = (event, userName) => {
    event.preventDefault();
    this.setState((prevState)=>{
       return {
          ...prevState,
          data: [
             ...prevState.data,
             {
                name: userName,
                score: this.state.score
             }
          ]
       }
    })
  };

  render() { 
    const { score, time, data } = this.state;
    console.log("ss",data)
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/help' component={Help} />
            <Route 
              exact path='/game' 
              render={()=> (
                <GameWorld
                  onSetScoreTime={this.handleSetScoreTime}            
                />
              )} 
            />
            <Route 
              path='/result' 
              render={()=> (
                <Result
                  score={score} 
                  time={time}         
                />
              )} 
            />
            <Route 
              path='/scoreboard'
              render={()=> (
                <Scoreboard
                  score={score}  
                  data={data}   
                  onSetUserData={this.handleSave}     
                />
              )} 
            />
          </Switch>
            <About />
        </BrowserRouter>
      </div>
    )
  }  
}

export default App;
