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
import { ThemeProvider } from '@mui/material';
import ControlPanel from './Components/ControlPanel';
import { Container } from '@mui/material';
import CreateUser from './Components/CreateUser';
import Carrito from './Components/Carrito';
import CustomTheme from './assets/CustomTheme';
import Paginado from './Components/Paginado';
import Payment from './Components/Payment';
import Success from './Components/Success';

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>

      <div className="App">
        <NavBar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product/:_id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/result" element={<ResultSearch />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/CreateUser' element={<CreateUser />} />
            <Route path='/admin' element={<ControlPanel />} />
            <Route path="/paginado" element={<Paginado />} />
            <Route path='/payment' element={ <Payment /> } />
            <Route path='/success' element={ <Success />} />
          </Routes> 
        </Container>
      </div>
    </ThemeProvider>

  );
}

export default App;

