import React from 'react';

import { Button } from '../shared/UIKit/Buttons';
import FlightList from './FlightList';
import ProvideAdminDashboard from '../context/AdminDashboardContext';

const AdminPage = () => {
  return (
    <ProvideAdminDashboard>
      <main className='page'>
        <div className='flex items-center py-3'>
          <p>Admin Dashboard</p>
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
