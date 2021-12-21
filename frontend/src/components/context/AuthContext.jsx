import React, { useContext, createContext, useState } from 'react';
import { read } from '../../service/localStorage.service';

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const [account, setAccount] = useState(read('account') || undefined);
  const [token, setToken] = useState(read('token') || undefined);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);


  const updateAccount = newAccount => {
    setAccount(newAccount);
  };

  const signin = (account, token) => {
    setAccount(account);
    setToken(token);
  };

  const signout = () => {
    setAccount(null);
    setToken(null);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };
  const openSignupModal = () => {
    setShowSignupModal(true);
  };


  const closeLoginModal = () => {
    setShowLoginModal(false);
  };
  const closeSignupModal = () => {
    setShowSignupModal(false);
  };


  return (
    <authContext.Provider
      value={{
        account,
        token,
        signin,
        signout,
        updateAccount,
        showLoginModal,
        openLoginModal,
        closeLoginModal,
        showSignupModal,
        openSignupModal,
        closeSignupModal
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

export default ProvideAuth;
