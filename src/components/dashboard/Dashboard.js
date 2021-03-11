// React
import React, { useEffect } from 'react';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux - Reducers
import { selectLoading, selectProfile } from '../../features/profileSlice';
import { selectUser } from '../../features/authSlice';
import { getCurrentProfile } from '../../features/profileSlice';

// Components
import Spinner from '../spinner/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector( selectLoading );
  const profile = useSelector( selectProfile );
  const user = useSelector( selectUser );

  useEffect(() => {
    dispatch( getCurrentProfile() );
  }, [ dispatch ]);

  return (
    <>
      {
        loading && profile === null
          ?
            <Spinner />
          :
            <>
              <h1 className="large text-primary">Hola</h1>
              <p className="lead">
                Welcome { user && user.name }
              </p>

              {
                profile != null
                  ?
                    <>
                      <DashboardActions />
                    </>
                  :
                    <>
                      <p>You have not yet setup a profile, please add some info</p>
                      <Link to='/create-profile' className="btn btn-primary my-1">Create profile</Link>
                    </>
              }
            </>
      }
    </>
  )
}

export default Dashboard
