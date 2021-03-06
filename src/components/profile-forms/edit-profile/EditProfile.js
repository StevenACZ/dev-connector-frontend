// React
import React, { useEffect, useState } from 'react';

// React Router
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux - Reducers
import {
  selectLoading,
  selectProfile,
  createProfile,
  getCurrentProfile
} from '../../../features/profileSlice';

// Custom Hooks
import useForm from '../../../customHooks/useForm';

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector( selectProfile );
  const loading = useSelector( selectLoading );

  const [ formData, setFormData, handleInputChange ] = useForm({
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

  useEffect(() => {
    dispatch( getCurrentProfile() );
  }, [ loading, dispatch ]);
  
  useEffect(() => {
    setFormData({
      company:          loading || !profile.company         ? '' : profile.company,
      website:          loading || !profile.website         ? '' : profile.website,
      location:         loading || !profile.location        ? '' : profile.location,
      status:           loading || !profile.status          ? '' : profile.status,
      skills:           loading || !profile.skills          ? '' : profile.skills,
      githubusername:   loading || !profile.githubusername  ? '' : profile.githubusername,
      bio:              loading || !profile.bio             ? '' : profile.bio,
      twitter:          loading || !profile.social          ? '' : profile.social.twitter,
      facebook:         loading || !profile.social          ? '' : profile.social.facebook,
      youtube:          loading || !profile.social          ? '' : profile.social.youtube,
      linkedin:         loading || !profile.social          ? '' : profile.social.linkedin,
      instagram:        loading || !profile.social          ? '' : profile.social.instagram
    });
  }, [ loading, profile, setFormData ]);

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

  const onSubmit = e => {
    e.preventDefault();
    dispatch( createProfile( formData, history, true ) );
  }

  return (
    <>
      <h1 className="large text-primary">
        Edit Your Profile
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
            onChange={ handleInputChange }
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
            onChange={ handleInputChange }
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
            onChange={ handleInputChange }
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
            onChange={ handleInputChange }
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
            onChange={ handleInputChange }
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
            onChange={ handleInputChange }
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
            onChange={ handleInputChange }
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
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={ twitter }
                    onChange={ handleInputChange }
                  />
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={ facebook }
                    onChange={ handleInputChange }
                  />
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    value={ youtube }
                    onChange={ handleInputChange }
                  />
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={ linkedin }
                    onChange={ handleInputChange }
                  />
                </div>

                <div className="form-group social-input">
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={ instagram }
                    onChange={ handleInputChange }
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
        <Link
          className="btn btn-light my-1"
          onClick={ () => history.goBack() }
        >
          Go Back
        </Link>
      </form>
    </>
  )
}

export default EditProfile
