import React from 'react';

import './Button.scss';

const Button = ({ text, isLoading, loadingText, disabled, onClick, type }) => {
  return (
    <button
      className={`button w-full bg-button-background-primary py-2 px-2 text-white font-bold rounded-lg ${
        disabled || isLoading ? 'opacity-50 disabled' : ''
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
