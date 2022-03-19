import './App.css';
import React from "react";
import Detail from './Components/Detail';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/navBar/navBar'
import Login from './Components/Login';



function App() {
  return (
    <div className="App">

      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:_id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

