import React, { useReducer, useEffect } from 'react';
import { validate } from '../../../../utils/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case 'TOUCHED':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  validators,
  value,
  isValid,
  onInput,
  type,
  errorMsg = 'Please enter valid data',
  placeholder,
  required,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: value || '',
    isValid: isValid || false,
    isTouced: false,
  });

  const onChangeHandler = event => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: validators || [],
    });
  };

  const onBlurHandler = event => {
    dispatch({
      type: 'TOUCHED',
    });
  };

  useEffect(() => {
    if (onInput) {
      onInput(id, inputState.value, inputState.isValid);
    }
  }, [id, inputState.value, inputState.isValid, onInput]);

  return (
    <>
      {label && (
        <label htmlFor={id} className='block w-full mb-2 font-bold'>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`bg-white font-nunito text-lg leading-6 placeholder-shown:text-grey-secondary rounded-4 py-2 px-3 focus:outline-none focus:border-1 focus:border-primary ${
          !inputState.isValid && inputState.isTouched
            ? 'border-1 border-red-600'
            : 'border-input-border border-1'
        } w-full`}
        value={inputState.value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      <div className='h-5 flex items-center'>
        <p className='text-input-error'>
          {!inputState.isValid && inputState.isTouched ? errorMsg : ''}
        </p>
      </div>
    </>
  );
};

export default Input;
