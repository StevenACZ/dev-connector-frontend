// React
import React, { useState } from 'react';

// React Router
import { Link, useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Redux - Reducers
import { addExperience } from '../../../features/profileSlice';

// Custom Hooks
import useForm from '../../../customHooks/useForm';

const AddExperience = () => {
  const dispatch = useDispatch();
  const history =  useHistory();

  const [ formData, setFormData, handleInputChange ] = useForm({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  
  const {
    company,
    title,
    location,
    from,
    to,
    current,
    description
  } = formData;

  const [ toDateDisabled, setToDateDisabled ] = useState( false );
  
  const onSubmit = ( e ) => {
    e.preventDefault();
    dispatch( addExperience( formData, history ) );
  }

  return (
    <>
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={ onSubmit }
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={ title }
            onChange={ handleInputChange }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={ company }
            onChange={ handleInputChange }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={ location }
            onChange={ handleInputChange }
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={ from }
            onChange={ handleInputChange }
          />
        </div>
         <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={ current }
              value={ current }
              onChange={ () => {
                setFormData({ ...formData, current: !current });
                setToDateDisabled( !toDateDisabled );
              }}
            /> Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={ to }
            onChange={ handleInputChange }
            disabled={ toDateDisabled ? 'disabled' : '' }
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={ description }
            onChange={ handleInputChange }
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link
          className="btn btn-light my-1"
          to="/dashboard"
        >
          Go Back
        </Link>
      </form>
    </>
  )
}

export default AddExperience
