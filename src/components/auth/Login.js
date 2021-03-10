// React
import React, { useState } from 'react'

// React Router
import { Link, Redirect } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux - Reducer
import { login } from '../../features/authSlice';
import { selectIsAuthenticated } from '../../features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector( selectIsAuthenticated );

  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData( { ...formData, [ e.target.name ]: e.target.value } );
  
  const onSubmit = e => {
    e.preventDefault();

    dispatch( login( email, password ) );
  };

  if ( isAuthenticated ) {
    return <Redirect to='/dashboard' />
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>

      <form
        className="form"
        action="create-profile.html"
        onSubmit={ onSubmit }
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={ email }
            onChange={ onChange }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={ password }
            onChange={ onChange }
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/Register">Sign Up</Link>
      </p>
    </>
  )
};

export default Login;
