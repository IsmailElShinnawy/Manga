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

const SignupModal = ({ close, show }) => {
  const { closeSignupModal, openLoginModal } = useAuth();
  const { formState, inputHandler, clearForm } = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
      username: { value: '', isValid: false },
      firstname: { value: '', isValid: false },
      lastname: { value: '', isValid: false },
      homeAddress: { value: '', isValid: false },
      countryCode: { value: '', isValid: false },
      telephoneNumber: { value: '', isValid: false },
      passportNumber: { value: '', isValid: false },
    },
    false
  );
  const { signin } = useAuth();
  const { sendRequest, isLoading, error } = useHttpClient();
  const onSubmitHandler = async event => {
    event.preventDefault();
    try {
      const response = await sendRequest(
        '/auth/signup',
        'POST',
        {
          username: formState.inputs.username.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          firstname: formState.inputs.firstname.value,
          lastname: formState.inputs.lasstname.value,
          homeAddress: formState.inputs.homeAddress.value,
          countryCode: formState.inputs.countryCode.value,
          telephoneNumber: formState.inputs.telephoneNumber.value,
          passportNumber: formState.inputs.passportNumber.value,
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
          Sign up to Manga Flights
        </h1>
        <IconX
          width='16px'
          height='16px'
          className='hover:cursor-pointer'
          onClick={close}
        />
      </div>
      <p className='font-nunito text-lg leading-6 text-grey-secondary mb-5'>
        Manga Flights is totally free to use. Sign up to get started.
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
        <Input
          id='username'
          placeholder='Username'
          type='username'
          value={formState.inputs.username.value}
          isValid={formState.inputs.username.isValid}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'This field is required'}
          required
        />

        <Input
          id='firstname'
          placeholder='First Name'
          type='firstname'
          value={formState.inputs.firstname.value}
          isValid={formState.inputs.firstname.isValid}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'This field is required'}
          required
        />
        <Input
          id='lastname'
          placeholder='Last Name'
          type='lastname'
          value={formState.inputs.lastname.value}
          isValid={formState.inputs.lastname.isValid}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'This field is required'}
          required
        />
        <Input
          id='homeAddress'
          placeholder='Home Address'
          type='homeAddress'
          value={formState.inputs.homeAddress.value}
          isValid={formState.inputs.homeAddress.isValid}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'This field is required'}
          required
        />
        <Input
          id='passportNumber'
          placeholder='Passport Number'
          type='passportNumber'
          value={formState.inputs.passportNumber.value}
          isValid={formState.inputs.passportNumber.isValid}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'This field is required'}
          required
        />
        <Input
          id='CountryCode'
          placeholder='Country Code'
          type='CountryCode'
          value={formState.inputs.countryCode.value}
          isValid={formState.inputs.countryCode.isValid}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'This field is required'}
          required
        />
        <Input
          id='telephoneNumber'
          placeholder='Telephone Number'
          type='telephoneNumber'
          value={formState.inputs.telephoneNumber.value}
          isValid={formState.inputs.telephoneNumber.isValid}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMsg={'This field is required'}
          required
        />

        <Button
          isLoading={isLoading}
          text='Create Account '
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
        text='Sign In'
        outline
        onClick={() => {
          closeSignupModal();
          openLoginModal();
        }}
      />
    </Modal>
  );
};

export default SignupModal;
