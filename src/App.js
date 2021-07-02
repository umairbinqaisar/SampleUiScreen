import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Home from './Components/Home';
import { Provider } from 'react-redux';
import Store from './Store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
function App() {
  return (
  <div>
    <Provider store = {Store}>
     <Router>
        <div>
          <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/Home' component={Home} />
             
          </Switch>
        </div>
        </Router>
        </Provider>
  </div>
  
  );
}

export default App;
