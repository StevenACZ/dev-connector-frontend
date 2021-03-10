// React
import React, { useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// Redux - Reducers
import { createProfile } from '../../../features/profileSlice';

const CreateProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [ formData, setFormData ] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [ displaySocialInputs, setDisplaySocialInputs ] = useState( false );

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e => setFormData( { ...formData, [ e.target.name ]: e.target.value } );

  const onSubmit = e => {
    e.preventDefault();
    dispatch( createProfile( formData, history ) );
  }

  return (
    <>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={ onSubmit }
      >
        <div className="form-group">
          <select
            name="status"
            value={ status }
            onChange={ onChange }
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        {/* Company */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={ company }
            onChange={ onChange }
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>

        {/* Website */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={ website }
            onChange={ onChange }
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>

        {/* Location */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={ location }
            onChange={ onChange }
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>

        {/* Skills */}
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={ skills }
            onChange={ onChange }
          />
          <small className="form-text">
            Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)
          </small>
        </div>

        {/* Github Username */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={ githubusername }
            onChange={ onChange }
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>

        {/* Bio */}
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={ bio }
            onChange={ onChange }
          ></textarea>
          <small className="form-text">
            Tell us a little about yourself
          </small>
        </div>

        {/* Button - Add Social Network Links */}
        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={ () => setDisplaySocialInputs( !displaySocialInputs ) }
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {/* Social Network URL */}
        {
          displaySocialInputs
            &&
              <>
                <div className="form-group social-input">
                  {/* <i className="fab fa-twitter fa-2x"></i> */}
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={ twitter }
                    onChange={ onChange }
                  />
                </div>

                <div className="form-group social-input">
                  {/* <i className="fab fa-facebook fa-2x"></i> */}
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={ facebook }
                    onChange={ onChange }
                  />
                </div>

                <div className="form-group social-input">
                  {/* <i className="fab fa-youtube fa-2x"></i> */}
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    value={ youtube }
                    onChange={ onChange }
                  />
                </div>

                <div className="form-group social-input">
                  {/* <i className="fab fa-linkedin fa-2x"></i> */}
                  <input
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={ linkedin }
                    onChange={ onChange }
                  />
                </div>

                <div className="form-group social-input">
                  {/* <i className="fab fa-instagram fa-2x"></i> */}
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={ instagram }
                    onChange={ onChange }
                  />
                </div>
              </>
        }


        {/* Button - Submit */}
        <input
          type="submit"
          className="btn btn-primary my-1"
        />

        {/* Button - Go Back */}
        <a
          className="btn btn-light my-1"
          href="dashboard.html"
        >
          Go Back
        </a>
      </form>
    </>
  )
}

export default CreateProfile
