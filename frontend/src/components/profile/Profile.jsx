import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../shared/UIKit/Inputs';
import { useHttpClient } from '../../hooks/http-hook';

import './Profile.scss';
import { Button } from '../shared/UIKit/Buttons';
import { useForm } from '../../hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_EQUAL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../utils/validators';
import { remove, write } from '../../service/localStorage.service';

import { ReactComponent as IconAirplane } from '../../assets/icons/IconAirplaneRight.svg';
import { ReactComponent as IconPerson } from '../../assets/icons/IconPerson.svg';
import { ReactComponent as IconLogout } from '../../assets/icons/IconLogout.svg';
import { ReactComponent as IconKey } from '../../assets/icons/IconKey.svg';
import UserReservations from './UserReservations';

const Profile = () => {
  const { account, updateAccount, signout } = useAuth();
  const location = useLocation();
  const { sendRequest, isLoading, error } = useHttpClient();
  const { formState, inputHandler } = useForm(
    {
      firstName: { value: account.firstname || '', isValid: !!account.firstname },
      lastName: { value: account.lastname || '', isValid: !!account.lastname },
      email: { value: account.email || '', isValid: !!account.email },
      passportNumber: {
        value: account.passportNumber || '',
        isValid: !!account.passportNumber,
      },
    },
    !!account.firstname &&
      !!account.lastname &&
      !!account.email &&
      !!account.passportNumber
  );
  const { formState: passwordFormState, inputHandler: passwordInputHandler } = useForm(
    {
      password: { value: '', isValid: false },
      newPassword: { value: '', isValid: false },
      confirmNewPassword: { value: '', isValid: false },
    },
    false
  );
  const params = new URLSearchParams(location.search);
  let tab = params.get('tab');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await sendRequest('/account/updateProfile', 'PUT', {
        firstname: formState.inputs.firstName.value,
        lastname: formState.inputs.lastName.value,
        passportNumber: formState.inputs.passportNumber.value,
        email: formState.inputs.email.value,
      });
      if (response && response.data) {
        updateAccount(response.data);
        write('account', response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangePassword = async event => {
    event.preventDefault();
    try {
      await sendRequest('/account/changePassword', 'PUT', {
        password: passwordFormState.inputs.password.value,
        newPassword: passwordFormState.inputs.newPassword.value,
      });
    } catch (err) {
      console.log(err);
    }
  };

  switch (tab) {
    case 'account':
    case 'trips':
    case 'changepassword':
      break;
    default:
      tab = 'account';
  }

  return (
    <main className='page w-full Profile'>
      <section className='hero flex flex-col justify-center items-center'>
        <h1 className='text-grey-4 font-semibold font-nunito text-5xl pb-3'>
          {account.firstname} {account.lastname}
        </h1>
        <h2 className='text-lg font-nunito leading-6 text-grey-4'>{account.email}</h2>
      </section>
      <div className='flex px-16 mt-12'>
        <div className='w-3/12'>
          <div className='shadow-profile-nav py-7 px-6'>
            <ul>
              <Link to='/profile?tab=trips'>
                <li
                  className={`${
                    tab === 'trips' ? 'bg-pale-purple text-primary' : ''
                  } rounded-md py-2 px-4 flex mb-4 hover:cursor-pointer`}
                >
                  <IconAirplane />
                  <span className='ml-3'>My trips</span>
                </li>
              </Link>
              <Link to='/profile?tab=account'>
                <li
                  className={`${
                    tab === 'account' ? 'bg-pale-purple text-primary' : ''
                  } rounded-md py-2 px-4 flex mb-4 hover:cursor-pointer`}
                >
                  <IconPerson stroke='black' />
                  <span className='ml-3'>My Personal Information</span>
                </li>
              </Link>
              <Link to='/profile?tab=changepassword'>
                <li
                  className={`${
                    tab === 'changepassword' ? 'bg-pale-purple text-primary' : ''
                  } rounded-md py-2 px-4 flex mb-4 hover:cursor-pointer`}
                >
                  <IconKey stroke='black' />
                  <span className='ml-3'>Change My Password</span>
                </li>
              </Link>
              <li
                className='rounded-md py-2 px-4 flex mb-4 hover:cursor-pointer'
                onClick={() => {
                  signout();
                  remove('account');
                  remove('token');
                }}
              >
                <IconLogout stroke='red' />
                <span className='ml-3 text-red-500'>Logout</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='min-w-0 w-8/12 pl-24'>
          {tab === 'account' && (
            <>
              <h1 className='text-2xl font-bold font-nunito text-grey-primary'>
                Edit your personal information
              </h1>
              <div className='w-full mt-4'>
                <form onSubmit={handleSubmit}>
                  <div className='flex w-full'>
                    <div className='w-1/2 pr-4'>
                      <Input
                        placeholder='First name'
                        id='firstName'
                        required
                        value={formState.inputs.firstName.value}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorMsg="Can't leave first name empty"
                        onInput={inputHandler}
                        isValid={formState.inputs.firstName.isValid}
                      />
                    </div>
                    <div className='w-1/2 pl-4'>
                      <Input
                        placeholder='Last name'
                        id='lastName'
                        required
                        value={formState.inputs.lastName.value}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorMsg="Can't leave last name empty"
                        onInput={inputHandler}
                        isValid={formState.inputs.lastName.isValid}
                      />
                    </div>
                  </div>
                  <Input
                    placeholder='Email'
                    id='email'
                    required
                    value={formState.inputs.email.value}
                    validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
                    errorMsg='Please enter a valid email'
                    onInput={inputHandler}
                    isValid={formState.inputs.email.isValid}
                    type='email'
                  />
                  <Input
                    placeholder='Passport Number'
                    id='passportNumber'
                    required
                    value={formState.inputs.passportNumber.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorMsg="Can't leave email empty"
                    onInput={inputHandler}
                    isValid={formState.inputs.passportNumber.isValid}
                  />
                  <div className='w-1/4'>
                    <Button
                      text='Save changes'
                      type='submit'
                      disabled={!formState.isValid}
                      isLoading={isLoading}
                      loadingText='Saving changes...'
                      onClick={handleSubmit}
                    />
                  </div>
                </form>
              </div>
            </>
          )}
          {tab === 'changepassword' && (
            <>
              <h1 className='text-2xl font-bold font-nunito text-grey-primary'>
                Change Password
              </h1>
              <div className='w-full mt-4'>
                <form onSubmit={handleChangePassword}>
                  <Input
                    id='password'
                    required
                    placeholder='Password'
                    type='password'
                    isValid={passwordFormState.inputs.password.isValid}
                    validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE()]}
                    onInput={passwordInputHandler}
                    errorMsg='This field is required'
                  />
                  <Input
                    placeholder='New Password'
                    type='password'
                    id='newPassword'
                    required
                    validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE()]}
                    errorMsg='Field is required with minimum of 3 digits'
                    onInput={passwordInputHandler}
                    isValid={passwordFormState.inputs.newPassword.isValid}
                  />
                  <Input
                    placeholder='Confirm New Password'
                    type='password'
                    id='confirmNewPassword'
                    required
                    validators={[
                      VALIDATOR_REQUIRE(),
                      VALIDATOR_EQUAL(passwordFormState.inputs.newPassword.value),
                    ]}
                    errorMsg='Passwords do not match'
                    onInput={passwordInputHandler}
                    isValid={passwordFormState.inputs.confirmNewPassword.isValid}
                  />
                  <div className='w-1/4'>
                    <Button
                      text='Save changes'
                      type='submit'
                      disabled={!passwordFormState.isValid}
                      isLoading={isLoading}
                      loadingText='Saving changes...'
                      onClick={handleChangePassword}
                    />
                  </div>
                  <div className='text-red-500'>
                    {error && error.response.data.message}
                  </div>
                </form>
              </div>
            </>
          )}
          {tab === 'trips' && (
            <>
              <h1 className='text-2xl font-bold font-nunito text-grey-primary mb-6'>
                My trips
              </h1>
              <UserReservations />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
