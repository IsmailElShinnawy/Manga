import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = ({ close }) => {
  const backdrop = (
    <div
      className='w-screen h-screen fixed top-0 left-0 backdrop-blur-sm'
      onClick={close}
    />
  );
  return ReactDOM.createPortal(backdrop, document.querySelector('#backdrop-hook'));
};

export default Backdrop;
