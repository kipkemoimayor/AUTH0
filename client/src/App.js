import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login"
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import {Provider } from "react-redux";
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser,logoutUser} from './actions/authActions';

import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";


if (localStorage.jwtToken){
  const token=localStorage.jwtToken;
  setAuthToken(token)
  const decoded =jwt_decode(token)
  store.dispatch(setCurrentUser(decoded));
  const currentTime=Date.now()
  console.log(decoded.exp,currentTime);
  if(decoded.exp>currentTime){
    store.dispatch(logoutUser())
    window.location.href="./login";
  }
}
function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
