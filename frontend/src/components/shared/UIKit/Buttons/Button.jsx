import React from 'react';

import './Button.scss';

const Button = ({ text, isLoading, loadingText, disabled, onClick, type, lg }) => {
  return (
    <button
      className={`button w-full bg-button-background-primary ${
        lg ? 'py-4 px-8' : 'p-2'
      }  text-white font-bold rounded-lg ${
        disabled || isLoading ? 'opacity-50 disabled' : 'shrink'
      }`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? loadingText : text}
    </button>
  );
};

export default Button;
