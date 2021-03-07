import React, { useState } from 'react';

// React router
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Reducers
import { register } from '../../features/authSlice';
import { setAlertAsync } from '../../features/alertSlice';

const Register = () => {
  const dispatch = useDispatch();

  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData( { ...formData, [ e.target.name ]: e.target.value } );
  
  const onSubmit = e => {
    e.preventDefault();
    if ( password !== password2 ) {
      dispatch(
        setAlertAsync(
          "Passwords do not match",
          "danger",
          5000
        )
      );
    } else {
      dispatch(
        register(
          name,
          email,
          password
        )
      );
    }
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

      <form
        className="form"
        action="create-profile.html"
        onSubmit={ onSubmit }
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={ name }
            onChange={ onChange }
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={ email }
            onChange={ onChange }
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={ password2 }
            onChange={ onChange }
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  )
};

export default Register;
