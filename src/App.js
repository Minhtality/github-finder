import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import Alert from './components/layout/Alert';
import GithubState from './components/context/github/GithubState';
import './App.css';

const App = () => {
  const [alert, setAlert] = useState(null);

  //alert user 
  const triggerAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search triggerAlert={triggerAlert} />
                  <Users />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;