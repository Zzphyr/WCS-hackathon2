import React from 'react';
import { Link } from "react-router-dom";
import './Scoreboard.css'

class Scoreboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         userName: ''
      }
   }

   onChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      })
   }

   renderTableData = () => {
      return this.props.data.map((player, i) => {
         const { name, score } = player //destructuring
         return (
            <tr key={i}>
               <td>{name}</td>
               <td>{score}</td>
            </tr>
         )
      })
   }

   render() {
      console.log("aa",this.props.data)
      return (
         <div className="score-main">
            <h1 className="score-title">Scoreboard</h1>
            
            <form className="scoreform" onSubmit={e=>this.props.onSetUserData(e, this.state.userName)}>
               <label htmlFor="username">You name:</label>
               <input id="username" type="text" name="userName" onChange={this.onChange} value={this.state.userName}></input>
               <input type="submit" value="Send!" className="submitnamebtn" />
            </form>
            <em className="score-note">Note: don't refresh the page, Santa is very forgetfull!</em>
               <table className="score-table">
                  <tbody>
                     <tr><th>{"name".toUpperCase()}</th><th>{"Score".toUpperCase()}</th></tr>
                     {this.renderTableData()}
                  </tbody>
               </table>
            <Link to="/" className="goHome-btn">home sweet home</Link>
         </div>
      )
   }
}

export default Scoreboard;