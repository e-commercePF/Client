
import './App.css';
import React from "react";
import Detail  from './Components/Detail';
import Home from './Components/Home';
import { Routes, Route}  from 'react-router-dom';
import NavBar from './Components/navBar/navBar'
import  Card from './Components/Card'


function App() {
  return (
    <div className="App">
      <Card/>
      <NavBar />
      <Detail />
    </div>
   );
}

export default App;

