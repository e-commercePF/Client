import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from './navBar/navBar';
import Detail from './Components/Detail'

function App() {
  return (
    <div className="App">


      <Detail />
    </div>
  );
}

export default App;
