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
      <label htmlFor={id} className='block w-full mb-2 font-bold'>
        {label}
      </label>
      <input
        id={id}
        className={`bg-input-background rounded-lg p-2 ${
          !inputState.isValid && inputState.isTouched ? 'ring-1 ring-red-600' : ''
        } focus:outline-none focus:ring-2 focus:ring-input-focus w-full mb-2`}
        value={inputState.value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        type={type}
        placeholder={placeholder}
      />
      <p className='text-input-error mb-2'>
        {!inputState.isValid && inputState.isTouched ? errorMsg : ''}
      </p>
    </>
  );
};

export default Input;
