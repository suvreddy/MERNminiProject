import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import LaunchScreen from "./components/LaunchScreen";
import LoginScreen from "./components/LoginScreen";
import RegistrationScreen from "./components/RegistrationScreen";
import ProfileScreen from "./components/ProfileScreen";

function App() {
  return (

    <Router>
      <LaunchScreen></LaunchScreen>
      <Switch>
        <Route exact path="/login" component={LoginScreen}></Route>
        <Route exact path="/register" component={RegistrationScreen}></Route>
        <Route exact path="/profile" component={ProfileScreen}></Route>

      </Switch>
    </Router>
  );
}

export default App;
