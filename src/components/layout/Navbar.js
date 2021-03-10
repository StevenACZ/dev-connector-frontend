// React
import React from 'react';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux - Reducers
import {
  logout,
  selectIsAuthenticated,
  selectLoading
} from '../../features/authSlice';

// Ant Icons
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  CodeOutlined,
  CompassOutlined
} from '@ant-design/icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector( selectIsAuthenticated );
  const loading = useSelector( selectLoading );

  const authLinks = (
    <ul>
      <li>
        <Link to='dashboard'>
          <UserOutlined />
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a
          onClick={ () => dispatch( logout() ) }
          href='!#'
        >
          <LogoutOutlined />
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <CompassOutlined />
          <span>Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <UserAddOutlined />
          <span>Register</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <LoginOutlined />
          <span>Login</span>
        </Link>
      </li>
    </ul>

  );

  return (
    <header className="navbar bg-dark">
      <h1>
        <Link to="index.html">
          <CodeOutlined />
          <span>DevConnector</span>
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
