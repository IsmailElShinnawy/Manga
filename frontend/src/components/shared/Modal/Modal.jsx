import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show, close, children, sm }) => {
  const content = show ? (
    <>
      <Backdrop close={close} />
      <div
        className={`p-10 rounded-xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl ${
          sm ? 'min-w-modal-sm max-w-modal-sm' : 'min-w-3/4 min-h-3/4'
        }`}
      >
        {children}
      </div>
    </>
  ) : null;
  return ReactDOM.createPortal(content, document.querySelector('#modal-hook'));
};

export default Modal;
