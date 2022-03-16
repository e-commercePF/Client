
import './App.css';
import React from "react";
import Detail  from './Components/Detail';
import Home from './Components/Home';
import { Routes, Route}  from 'react-router-dom';
import NavBar from './Components/navBar/navBar'


function App() {
  return (
    <div className="App">

      <NavBar />
      {/* <Routes>
          {/* <Route exact path="/Home" component={ <Home /> } />    
      </Routes> */}

     <Detail />
    </div>
   );
}

export default App;

