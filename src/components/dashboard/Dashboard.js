// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Redux - Reducers
import { getCurrentProfile } from '../../features/profileSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( getCurrentProfile() );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
