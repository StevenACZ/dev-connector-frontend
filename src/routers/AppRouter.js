// React
import React, { useEffect } from 'react';

// React router
import {
  HashRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Redux
import { useDispatch } from 'react-redux';

// Redux - Reducers
import { loadUser } from '../features/authSlice';

// Utils
import setAuthToken from '../utils/setAuthToken';

// Components
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Alert from '../components/layout/Alert';
import Landing from '../components/layout/Landing';
import Navbar from '../components/layout/Navbar';
import Dashboard from '../components/dashboard/Dashboard';

if ( localStorage.token ) {
  setAuthToken( localStorage.token );
}

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( loadUser() );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HashRouter>
      <>
        <Navbar />

        <main className="container">
          <Alert />
          <Switch>
            <Route exact path='/' component={ Landing } />
            <Route exact path='/login' component={ Login } />
            <Route exact path='/register' component={ Register } />
            <PrivateRoute exact path='/dashboard' component={ Dashboard } />
                
            <Redirect to='/' />
          </Switch>
        </main>
      </>
    </HashRouter>
  )
}

export default AppRouter