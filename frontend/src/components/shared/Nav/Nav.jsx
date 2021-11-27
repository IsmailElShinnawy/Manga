import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { isAdmin } from '../../../service/account.service';
import { remove } from '../../../service/localStorage.service';
import LoginModal from '../../auth/login/LoginModal';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../UIKit/Buttons';

import './Nav.scss';

const Nav = () => {
  const location = useLocation();
  const { account, signout, showLoginModal, closeLoginModal, openLoginModal } = useAuth();
  const onLogoutHandler = () => {
    remove('token');
    remove('account');
    signout();
  };
  return (
    <>
      <LoginModal show={showLoginModal} close={closeLoginModal} />
      <nav className='Nav w-full flex items-center px-20 py-6'>
        <Link to='/' className='text-primary font-nunito font-extrabold text-2xl mr-auto'>
          <h1>Manga Flights</h1>
        </Link>
        <Link
          to='/user/flights'
          className='text-primary font-nunito mr-4 hover:underline'
        >
          Flights
        </Link>
        <Link
          to='/packages'
          className='text-grey-secondary font-nunito mx-4 hover:underline'
        >
          Packages
        </Link>
        {!account ? (
          <>
            <div className='mx-4'>
              <Button
                isTextButton
                onClick={openLoginModal}
                text='Sign in'
                type='button'
              />
            </div>
            <Link to='/' className='text-white bg-primary ml-2 py-3 px-5 rounded-4'>
              Sign up
            </Link>
          </>
        ) : (
          <div className='mx-4'>
            <Button
              text='Sign out'
              type='button'
              onClick={onLogoutHandler}
              isTextButton
            />
          </div>
        )}

        {isAdmin(account) && location.pathname !== '/admin' && (
          <Link to='/admin' className='text-white bg-primary ml-2 py-3 px-5 rounded-4'>
            To Admin Dashboard
          </Link>
        )}
      </nav>
    </>
  );
};

export default Nav;
