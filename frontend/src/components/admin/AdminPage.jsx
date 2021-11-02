import React, { useState } from 'react';
import Modal from '../shared/Modal/Modal';
import { Button } from '../shared/UIKit/Buttons';
import { ReactComponent as AirplaneIcon } from '../../assets/icons/IconAirplane.svg';
import { Input } from '../shared/UIKit/Inputs';
import { VALIDATOR_REQUIRE } from '../../utils/validators';

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <div className='flex items-center bg-button-background-primary rounded-t-lg py-4'>
          <AirplaneIcon
            fill='#ffffff'
            stroke='#ffffff'
            width='48px'
            height='48px'
            className='ml-2 mr-2'
            outline='none'
          />
          <h2 className='text-white text-3xl'>New Flight</h2>
        </div>
        <div className='w-full p-4'>
          <div className='w-1/3'>
            <Input
              id='flightNumber'
              label='Flight Number'
              validators={[VALIDATOR_REQUIRE()]}
              errorMsg='Please enter a flight number'
              onInput={() => {}}
              placeholder='ex: 6182'
            />
          </div>
          <div className='w-2/3 flex'>
            <div className='w-1/2'>hi</div>
            <div className='w-1/2'>hi</div>
          </div>
        </div>
      </Modal>
      <main className='page flex justify-around items-center'>
        <p>Admin Dashboard</p>
        <div>
          <Button text='Add flight' lg onClick={() => setShowModal(true)} />
        </div>
      </main>
    </>
  );
};

export default AdminPage;
