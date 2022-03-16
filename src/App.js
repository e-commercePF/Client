import Detail  from './Components/Detail'
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
    <Route exact path="/Home" component={Home}/>    
     <Detail />
    </div>
   );
}

export default App;

