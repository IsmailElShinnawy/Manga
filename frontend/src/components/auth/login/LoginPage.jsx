import React from 'react';
import { Input } from '../../shared/UIKit/Inputs';
import { useForm } from '../../shared/hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../utils/validators';

const LoginPage = () => {
  const { formState, inputHandler } = useForm(
    { email: { value: '', isValid: false }, password: { value: '', isValid: false } },
    false
  );
  return (
    <main className='min-h-screen flex justify-center items-center'>
      <div className='p-8 shadow-md rounded-xl'>
        <h1 className='text-2xl text-center'>Sign In</h1>
        <Input
          id='email'
          label='Email'
          value={formState.inputs.email.value}
          isValid={formState.inputs.email.isValid}
          validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'Invalid email'}
        />
        <Input
          id='password'
          label='Password'
          value={formState.inputs.password.value}
          isValid={formState.inputs.password.isValid}
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'Invalid password'}
        />
      </div>
    </main>
  );
};

export default LoginPage;
