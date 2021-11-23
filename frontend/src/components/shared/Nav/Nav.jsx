import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { isAdmin } from '../../../service/account.service';
import { remove } from '../../../service/localStorage.service';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../UIKit/Buttons';

import './Nav.scss';

const noNavRoutes = ['/login'];

const Nav = () => {
  const location = useLocation();
  const { account, signout } = useAuth();
  const onLogoutHandler = () => {
    remove('token');
    remove('account');
    signout();
  };
  return noNavRoutes.includes(location.pathname) ? null : (
    <nav className='Nav shadow-lg w-full flex items-center justify-end px-16'>
      {location.pathname !== '/' && (
        <Link to='/' className='nav-btn shrink mr-2'>
          Back to home
        </Link>
      )}
      {isAdmin(account) && location.pathname !== '/admin' && (
        <Link to='/admin' className='nav-btn shrink mr-2'>
          To Admin Dashboard
        </Link>
      )}
      {account ? (
        <div className=''>
          <Button text='Logout' lg onClick={onLogoutHandler} />
        </div>
      ) : (
        <Link to='/login' className='nav-btn shrink'>
          login
        </Link>
      )}
    </nav>
  );
};

export default Nav;
