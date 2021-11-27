import React from 'react';

import Modal from '../../shared/Modal/Modal';
import { ReactComponent as IconX } from '../../../assets/icons/IconX.svg';
import { Input } from '../../shared/UIKit/Inputs';
import { useForm } from '../../../hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../../utils/validators';
import { Button } from '../../shared/UIKit/Buttons';
import { useAuth } from '../../context/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';
import { write } from '../../../service/localStorage.service';
import { setLocalAccessToken } from '../../../service/token.service';

const LoginModal = ({ close, show }) => {
  const { formState, inputHandler, clearForm } = useForm(
    { email: { value: '', isValid: false }, password: { value: '', isValid: false } },
    false
  );
  const { signin } = useAuth();
  const { sendRequest, isLoading, error } = useHttpClient();
  const onSubmitHandler = async event => {
    event.preventDefault();
    try {
      const response = await sendRequest(
        '/auth/signin',
        'POST',
        {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        },
        { 'Content-Type': 'application/json' }
      );
      write('account', response.data.account);
      setLocalAccessToken(response.data.token);
      signin(response.data.account, response.data.token);
      clearForm();
      close();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal close={close} show={show} sm>
      <div className='flex items-center mb-3'>
        <h1 className='font-nunito text-grey-primary font-bold text-2xl leading-8 mr-auto'>
          Sign in to Manga Flights
        </h1>
        <IconX
          width='16px'
          height='16px'
          className='hover:cursor-pointer'
          onClick={close}
        />
      </div>
      <p className='font-nunito text-lg leading-6 text-grey-secondary mb-5'>
        Manga Flights is totally free to use. Sign in using your email below to get
        started.
      </p>
      <form onSubmit={onSubmitHandler}>
        <Input
          id='email'
          placeholder='Email'
          type='email'
          value={formState.inputs.email.value}
          isValid={formState.inputs.email.isValid}
          validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'Invalid email'}
          required
        />
        <Input
          id='password'
          placeholder='Password'
          type='password'
          value={formState.inputs.password.value}
          isValid={formState.inputs.password.isValid}
          validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'Invalid password'}
          required
        />
        <Button
          isLoading={isLoading}
          text='Sign In'
          loadingText='Loading...'
          disabled={!formState.isValid}
          onClick={onSubmitHandler}
          type='submit'
        />
        {error?.response?.data.message && (
          <p className='text-input-error'>{error.response.data.message}</p>
        )}
      </form>
      <div className='flex w-full items-center my-5'>
        <hr className='w-1/3' />
        <p className='w-1/3 text-center'>Or</p>
        <hr className='w-1/3' />
      </div>
      <Button
        // isLoading={isLoading}
        text='Create new account'
        loadingText='Loading...'
        disabled={!formState.isValid}
        // onClick={onClickHandler}
        type='submit'
        outline
      />
    </Modal>
  );
};

export default LoginModal;
