import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show, close, children }) => {
  const content = show ? (
    <>
      <Backdrop close={close} />
      <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-2xl min-w-3/4 min-h-3/4'>
        {children}
      </div>
    </>
  ) : null;
  return ReactDOM.createPortal(content, document.querySelector('#modal-hook'));
};

export default Modal;
