import React, { useEffect } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { useAdminDashboard } from '../context/AdminDashboardContext';
import FilterFlights from './FilterFlights';

import FlightList from './FlightList';

const AdminPage = () => {
  const { setFlights } = useAdminDashboard();
  const { sendRequest, isLoading } = useHttpClient();

  useEffect(() => {
    const fetchAndSetFlights = async () => {
      try {
        const response = await sendRequest('/flight');
        if (response && response.data) setFlights(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAndSetFlights();
  }, [sendRequest, setFlights]);

  if (isLoading)
    return (
      <main className='page flex items-center justify-center'>
        <div className='w-8 h-8 animate-spin rounded-full border-b-2 border-input-focus' />
      </main>
    );

  return (
    <main className='page px-2 pt-2'>
      <div className='grid grid-cols-12 gap-x-2'>
        <div className='col-span-4'>
          <FilterFlights />
        </div>
        <div className='col-span-8'>
          <FlightList />
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
