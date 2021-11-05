import React, { useState } from 'react';

import { Button } from '../shared/UIKit/Buttons';
import Modal from '../shared/Modal/Modal';
import AddFlightModalContent from './AddFlightModalContent';
import FlightList from './FlightList';
import ProvideAdminDashboard from '../context/AdminDashboardContext';

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ProvideAdminDashboard>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <AddFlightModalContent />
      </Modal>
      <main className='page'>
        <div className='flex items-center py-3'>
          <p>Admin Dashboard</p>
          <div className='w-max ml-auto mr-8'>
            <Button text='Add flight' lg onClick={() => setShowModal(true)} />
          </div>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-12'>
            <FlightList />
          </div>
        </div>
      </main>
    </ProvideAdminDashboard>
  );
};

export default AdminPage;
