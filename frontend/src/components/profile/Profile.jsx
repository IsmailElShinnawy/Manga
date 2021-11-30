import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Avatar from '../shared/UIKit/Avatar/Avatar';
import { Input } from '../shared/UIKit/Inputs';
import { useHttpClient } from '../../hooks/http-hook';

import './Profile.scss';
import { Button } from '../shared/UIKit/Buttons';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../utils/validators';
import { write } from '../../service/localStorage.service';

const Profile = () => {
  const { account, updateAccount } = useAuth();
  const location = useLocation();
  const { sendRequest, isLoading } = useHttpClient();
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

  switch (tab) {
    case 'account':
    case 'flights':
      break;
    default:
      tab = 'account';
      break;
  }

  return (
    <main className='page px-16 flex w-full Profile'>
      <div className='min-w-0 w-2/12 flex flex-col mr-4'>
        <Avatar
          firstName={account.firstname || '?'}
          lastName={account.lastname || '?'}
          lg
        />
        <hr className='mt-4' />
        <ul className='mt-4'>
          <li className={`${tab === 'account' ? 'active' : ''} mb-4 rounded-4 py-2 px-3`}>
            <Link to='/profile?tab=account'>Account settings</Link>
          </li>
          <li className={`${tab === 'flights' ? 'active' : ''} mb-4 rounded-4 py-2 px-3`}>
            <Link to='/profile?tab=flights'>Flights</Link>
          </li>
        </ul>
      </div>
      <div className='min-w-0 w-9/12'>
        <h1 className='text-xl font-nunito'>
          {tab === 'account' ? 'Your Account' : 'Your Flights'}
        </h1>
        <div className='w-1/4 mt-4'>
          <form onSubmit={handleSubmit}>
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
            <Button
              text='Save changes'
              type='submit'
              disabled={!formState.isValid}
              isLoading={isLoading}
              loadingText='Saving changes...'
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;
