import React, { useState } from 'react';
import Modal from '../shared/Modal/Modal';
import { Button } from '../shared/UIKit/Buttons';
import { ReactComponent as AirplaneIcon } from '../../assets/icons/IconAirplane.svg';

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <div className='h-12 bg-button-background-primary rounded-t-lg' />
        <AirplaneIcon
          fill='#ffffff'
          stroke='#000000'
          width='64px'
          height='64px'
          className='ml-2'
        />
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
