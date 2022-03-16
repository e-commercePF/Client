import logo from './logo.svg';
import './App.css';
import Home from './componentes/Home';


function App() {
  return (
 <div>
<Route exact path="/Home" component={Home}/>    
  </div>
  );
}

export default App;

