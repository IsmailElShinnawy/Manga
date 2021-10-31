import React from 'react';
import { Input } from '../../shared/UIKit/Inputs';
import { Button } from '../../shared/UIKit/Buttons';
import { useForm } from '../../../hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../utils/validators';
import { useHttpClient } from '../../../hooks/http-hook';

import { ReactComponent as LockIcon } from '../../../assets/icons/IconLock.svg';
import { setLocalAccessToken } from '../../../service/token.service';

const LoginPage = () => {
  const { formState, inputHandler } = useForm(
    { email: { value: '', isValid: false }, password: { value: '', isValid: false } },
    false
  );
  const { sendRequest, isLoading, error } = useHttpClient();
  const onClickHandler = async event => {
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
      setLocalAccessToken(response.data.token);
      console.log(response);
    } catch (err) {
      // console.log(error.response.data.message);
      console.log(err);
    }
  };
  return (
    <main className='min-h-screen flex justify-center items-center lg:px-0'>
      <div className='p-4 shadow-md rounded-xl' style={{ minWidth: '310px' }}>
        <LockIcon className='bg-blue-500 rounded-full p-2 mx-auto mb-2' />
        <h1 className='text-2xl text-center mb-2'>Sign In</h1>
        <form>
          <Input
            id='email'
            label='Email'
            type='email'
            value={formState.inputs.email.value}
            isValid={formState.inputs.email.isValid}
            validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorMsg={'Invalid email'}
          />
          <Input
            id='password'
            label='Password'
            type='password'
            value={formState.inputs.password.value}
            isValid={formState.inputs.password.isValid}
            validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorMsg={'Invalid password'}
          />
          <Button
            isLoading={isLoading}
            text='Login'
            loadingText='Loading...'
            disabled={!formState.isValid}
            onClick={onClickHandler}
            type='submit'
          />
          {error?.response?.data.message && (
            <p className='text-input-error'>{error.response.data.message}</p>
          )}
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
