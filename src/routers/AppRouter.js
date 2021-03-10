// React
import React, { useEffect } from 'react';

// React Router
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
import CreateProfile from '../components/profile-forms/create-profile/CreateProfile';
import EditProfile from '../components/profile-forms/edit-profile/EditProfile';
import AddExperience from '../components/profile-forms/add-experience/AddExperience';
import AddEducation from '../components/profile-forms/add-education/AddEducation';

if ( localStorage.token ) {
  setAuthToken( localStorage.token );
}

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( loadUser() );
  }, [ dispatch ]);

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
            <Route exact path='/create-profile' component={ CreateProfile } />
            <Route exact path='/edit-profile' component={ EditProfile } />
            <Route exact path='/add-experience' component={ AddExperience } />
            <Route exact path='/add-education' component={ AddEducation } />
            <PrivateRoute exact path='/dashboard' component={ Dashboard } />
                
            <Redirect to='/' />
          </Switch>
        </main>
      </>
    </HashRouter>
  )
}

export default AppRouter
