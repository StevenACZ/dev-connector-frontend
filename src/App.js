// React router
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

// Styles
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

// Components
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
