import React from 'react';
import { useLocation, Link } from 'react-router-dom';
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
    <nav className='Nav shadow-lg w-full flex items-center px-16'>
      {account ? (
        <div className='ml-auto'>
          <Button text='Logout' lg onClick={onLogoutHandler} />
        </div>
      ) : (
        <Link to='/login' className='auth-btn shrink'>
          login
        </Link>
      )}
    </nav>
  );
};

export default Nav;
