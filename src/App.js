import './App.css';
import React from "react";
import Detail from './Components/Detail';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/navBar/navBar'
import Login from './Components/Login';
import ResultSearch from './Components/ResultSearch';
import CreatePage from './Components/CreatePage';
import Favorites from './Components/Favorites';
import  { ThemeProvider } from '@mui/material';
import ControlPanel from './Components/ControlPanel';
import { Container } from '@mui/material';
import CustomTheme from './assets/CustomTheme'; 
import Carrito from './Components/Carrito';
import CreateUser from './Components/CreateUser';


function App() {
  return (

    <Container>
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:_id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/result" element={<ResultSearch />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/carrito' element={ <Carrito />} />
        <Route path='/CreateUser' element={ <CreateUser />} />
        <Route path='/admin' element={<ControlPanel />} />
 
      </Routes>
    </div>
  </Container>
  );
}

export default App;

