import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Auth from './components/auth/Auth';
import User from './components/user/User';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Dashboard} />
      <Route path="/user/:user" component={User} />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
    </Router>
  );
}

export default App;
