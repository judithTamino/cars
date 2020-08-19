import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Cars from './components/Cars/Cars';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={ SignUp } />
        <Route path="/signIn" exact component={ SignIn } />
        <Route exact path="/dashboard" component={ Cars } />
      </Router>
    </div>
  );
}

export default App;
