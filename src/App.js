import React from 'react';
import { AuthProvider } from './AuthContext';
import SignUp from './component/SignUp/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard/Dashboard';
import Login from './component/Login/Login';
import PrivateRoute from './PrivateRoute';
import Form from './component/Form/Form';
function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path='/' exact component={Dashboard} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/form' component={Form} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
