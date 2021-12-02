import React from 'react';

import './Button.scss';

const Button = ({
  text,
  isLoading,
  loadingText,
  disabled,
  onClick,
  type,
  lg,
  danger,
  isTextButton,
  outline,
}) => {
  return (
    <button
      className={`button w-full h-full max-h-14 font-nunito ${
        disabled ? 'bg-opacity-50 cursor-not-allowed' : ''
      } ${danger ? 'bg-red-700' : isTextButton || outline ? '' : 'bg-primary'} ${
        isLoading ? 'opacity-50' : ''
      } ${outline ? 'border-1 border-primary hover:bg-primary' : ''} ${
        isTextButton
          ? 'text-grey-secondary hover:underline'
          : outline
          ? 'px-5 py-3 text-primary hover:text-white'
          : 'px-5 py-3 text-white'
      } rounded-4`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && loadingText ? loadingText : text}
    </button>
  );
};

export default Button;
