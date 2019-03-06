import React, { Component } from 'react';
import './App.scss';
import './responsive.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppLayout from './components/app-layout/app-layout';
import Login from './components/login/login';
import Register from './components/register/register';
class App extends Component {
  render() {
    return (
      <div class="dashboard">
        <div class="container-fluid">
          <div class="row">
          <Router>
          <div>
            <Switch>
              <Route exact path="/" component={AppLayout} />  
              <Route path="/login" component={Login} /> 
              <Route path="/register" component={Register} />  
            </Switch>

          </div>
        </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
