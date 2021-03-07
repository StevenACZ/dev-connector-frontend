// React
import { useEffect } from 'react';

// React router
import {
  HashRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { loadUser } from './features/authSlice';
import setAuthToken from './utils/setAuthToken';

// Styles
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

// Components
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

if ( localStorage.token ) {
  setAuthToken( localStorage.token );
}

const App = () => {
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
                
            <Redirect to='/' />
          </Switch>
        </main>
      </>
    </HashRouter>
  );
}

export default App;
