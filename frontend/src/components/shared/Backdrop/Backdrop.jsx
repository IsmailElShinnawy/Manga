import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = ({ close, hide }) => {
  const backdrop = (
    <div
      className={`w-screen h-screen fixed top-0 left-0 bg-backdrop ${
        hide ? 'bg-opacity-0 opacity-0' : ''
      }`}
      onClick={close}
    />
  );
  return ReactDOM.createPortal(backdrop, document.querySelector('#backdrop-hook'));
};

export default Backdrop;
