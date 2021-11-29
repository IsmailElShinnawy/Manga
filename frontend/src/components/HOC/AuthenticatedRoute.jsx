import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { account } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        account ? (
          children
        ) : (
          <Redirect to={{ pathname: '/403', state: { from: location } }} />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
