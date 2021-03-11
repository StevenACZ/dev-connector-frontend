// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux - Reducers
import {
  getProfilesAction,
  selectLoading,
  selectProfiles
} from '../../../features/profileSlice';

// Components
import Spinner from '../../spinner/Spinner';
import ProfileItem from '../profile-item/ProfileItem';

const Profiles = () => {
  const dispatch = useDispatch();

  const profiles = useSelector( selectProfiles );
  const loading = useSelector( selectLoading );

  useEffect(() => {
    dispatch( getProfilesAction() )
  }, [ dispatch ] );

  return (
    <>
      {
        loading
        ? 
          <Spinner />
        : 
          <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              Browse and connect with developers
            </p>
            <div className="profiles">
              {
                profiles && profiles.length > 0
                  ? 
                    (
                      profiles.map( profile => (
                        <ProfileItem
                          key={ profile._id }
                          { ...profile }
                        />
                      ))
                    )
                  : 
                    <h4>No profiles found...</h4>
              }
            </div>
          </>
      }
    </>
  )
}

export default Profiles
