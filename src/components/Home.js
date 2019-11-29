import React from 'react';
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {

   return (
      <main className="home-main">

         <h1 className="home-title">Santa Dooown the Hill</h1>
         <figure>
            <img src="https://i.imgur.com/NhS4cgB.png" alt="santa ski" className="homeimg"/>
         </figure>
         <div className="inhome-btns">
            <Link to="/game" className="play-btn">Start Game!</Link>
            <Link to="/help" className="help-btn">Need help?</Link>
         </div>

         <div className="bgimg"></div>
         <div className="snow-container">
            <div className="snow foreground"></div>
            <div className="snow foreground layered"></div>
            <div className="snow middleground"></div>
            <div className="snow middleground layered"></div>
            <div className="snow background"></div>
            <div className="snow background layered"></div>
         </div>
      </main>
   )
}

export default Home;