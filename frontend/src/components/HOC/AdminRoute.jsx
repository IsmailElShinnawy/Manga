import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin } from '../../service/account.service';

import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children, ...rest }) => {
  const { account } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAdmin(account) ? (
          children
        ) : (
          <Redirect to={{ pathname: '/403', state: { from: location } }} />
        )
      }
    ></Route>
  );
};

export default AdminRoute;
