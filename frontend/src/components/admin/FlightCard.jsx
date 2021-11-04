import React from 'react';
import { useAdminDashboard } from '../context/AdminDashboardContext';

const FlightCard = () => {
  const { selectedFlight } = useAdminDashboard();
  return (
    <div className='w-full'>
      {selectedFlight ? selectedFlight._id : 'No flight chosen'}
    </div>
  );
};

export default FlightCard;
