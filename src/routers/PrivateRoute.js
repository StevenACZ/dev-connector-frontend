// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router';

// Redux - Reducer
import { selectIsAuthenticated, selectLoading } from '../features/authSlice'

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useSelector( selectIsAuthenticated );
  const loading = useSelector( selectLoading );

  return (
    <Route
      { ...rest }
      render={ props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component { ...props } />
        )
      }
    />
  )
}

export default PrivateRoute
