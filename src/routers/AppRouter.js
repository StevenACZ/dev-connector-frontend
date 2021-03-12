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
import Profiles from '../components/profiles/profiles/Profiles';
import Profile from '../components/profile/Profile';

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

          <Alert />
          <Switch>
            <Route exact path='/' component={ Landing } />
              <main className="container">
                <Route exact path='/login' component={ Login } />
                <Route exact path='/register' component={ Register } />
                <Route exact path='/profiles' component={ Profiles } />
                <Route exact path='/profile/:id' component={ Profile } />
                <PrivateRoute exact path='/create-profile' component={ CreateProfile } />
                <PrivateRoute exact path='/edit-profile' component={ EditProfile } />
                <PrivateRoute exact path='/add-experience' component={ AddExperience } />
                <PrivateRoute exact path='/add-education' component={ AddEducation } />
                <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              </main>
                
            {/* <Redirect to='/' /> */}
          </Switch>
      </>
    </HashRouter>
  )
}

export default AppRouter
