import React, { useState } from 'react';

import { Button } from '../shared/UIKit/Buttons';
import Modal from '../shared/Modal/Modal';
import AddFlightModalContent from './AddFlightModalContent';

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <AddFlightModalContent />
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
