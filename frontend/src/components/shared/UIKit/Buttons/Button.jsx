import React from 'react';

import './Button.scss';

const Button = ({
  text,
  isLoading,
  loadingText,
  disabled,
  onClick,
  type,
  danger,
  isTextButton,
  outline,
  icon,
}) => {
  return (
    <button
      className={`button w-full h-full max-h-14 font-nunito ${
        disabled ? 'bg-opacity-50 cursor-not-allowed' : ''
      } ${danger ? 'bg-red-700' : icon || isTextButton || outline ? '' : 'bg-primary'} ${
        isLoading ? 'opacity-50' : ''
      } ${outline ? 'border-1 border-primary hover:bg-primary' : ''} ${
        isTextButton || icon
          ? 'text-grey-secondary hover:underline'
          : outline
          ? 'px-5 py-3 text-primary hover:text-white'
          : 'px-5 py-3 text-white'
      } rounded-4`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {icon || (isLoading && loadingText ? loadingText : text)}
    </button>
  );
};

export default Button;
