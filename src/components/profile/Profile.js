// React
import React, { useEffect } from 'react';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux - Reducers
import { getProfileById, selectLoading, selectProfile } from '../../features/profileSlice';
import {
  selectLoading as selectLoadingAuth,
  selectIsAuthenticated,
  selectUser
} from '../../features/authSlice';

// Components
import Spinner from '../spinner/Spinner';
import ProfileTop from './profile-top/ProfileTop';
import ProfileAbout from './profile-about/ProfileAbout';
import ProfileExperience from './profile-experience/ProfileExperience';

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const profile = useSelector( selectProfile );
  const loading = useSelector( selectLoading );
  const isAuthenticated = useSelector( selectIsAuthenticated );
  const loadingAuth = useSelector( selectLoadingAuth );
  const userAuth = useSelector( selectUser );
  
  useEffect(() => {
    dispatch( getProfileById( match.params.id ) );
  }, [ dispatch, match ])

  return (
    <>
      {
        profile === null || loading
          ?
            <Spinner />
          :
            <>
              <Link
                to='/profiles'
                className="btn btn-light"
              >
                Back to profiles
              </Link>
              {
                isAuthenticated && loadingAuth === false
                && userAuth._id === profile.user._id
                  &&
                    <Link
                      to="/edit-profile"
                      className="btn btn-dark"
                    >
                      Edit profile
                    </Link>
              }

              <div className="profile-grid my-1">
                <ProfileTop { ...profile } />
                <ProfileAbout { ...profile } />
                <ProfileExperience { ...profile } />
              </div>
            </>
        }
    </>
  )
}

export default Profile
