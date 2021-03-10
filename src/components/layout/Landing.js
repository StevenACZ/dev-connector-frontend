// React
import React from 'react';

// React Router
import { Link, Redirect } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux';

// Redux - Reducers
import {
  selectIsAuthenticated
} from '../../features/authSlice';

const Landing = () => {
  const isAuthenticated = useSelector( selectIsAuthenticated );

  if ( isAuthenticated ) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
