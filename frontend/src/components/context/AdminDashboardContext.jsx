import { createContext, useContext, useState } from 'react';

const adminDashboardContext = createContext();

const ProvideAdminDashboard = ({ children }) => {
  const [selectedFlight, selectFlight] = useState();

  return (
    <adminDashboardContext.Provider value={{ selectedFlight, selectFlight }}>
      {children}
    </adminDashboardContext.Provider>
  );
};

export const useAdminDashboard = () => {
  return useContext(adminDashboardContext);
};

export default ProvideAdminDashboard;
