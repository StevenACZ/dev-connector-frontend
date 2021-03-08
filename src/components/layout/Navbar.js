// React
import React from 'react'

// React Router
import { Link } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux - Reducers
import {
  logout,
  selectIsAuthenticated,
  selectLoading
} from '../../features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector( selectIsAuthenticated );
  const loading = useSelector( selectLoading );

  const authLinks = (
    <ul>
      <li>
        <a
          onClick={ () => dispatch( logout() ) }
          href='!#'
        >
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>

  );

  return (
    <header className="navbar bg-dark">
      <h1>
        <Link to="index.html">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      
      {
        !loading && (
          <>
            { isAuthenticated ? authLinks : guestLinks }
          </>
        ) 
      }
    </header>
  )
}

export default Navbar
