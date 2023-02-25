import './App.css';
import {Landing, Home, Detail, Form} from './Views' 
import { Route } from 'react-router-dom';
import Loading from './Views/Loading/Loading';


function App() {
  return (
    <div className="App">
      <Route exact path = "/loading" component={Loading}/>
      <Route exact path = "/" component={Landing}/>
      <Route exact path = "/home" component={Home}/>
      <Route path = "/detail/:id"  component={Detail}/>
      <Route exact path = "/create" component={Form}/>
    </div>
  );
}

export default App;
