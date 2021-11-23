import { createContext, useContext, useState } from 'react';

const adminDashboardContext = createContext();

const ProvideAdminDashboard = ({ children }) => {
  const [flights, setFlights] = useState([]);

  const addFlight = flight => setFlights(oldFlightList => [...oldFlightList, flight]);
  const removeFlight = flightId =>
    setFlights(oldFlights => oldFlights.filter(flight => flight._id !== flightId));
  const updateFlight = updatedFlight => {
    const flightIdx = flights.findIndex(flight => flight._id === updatedFlight._id);
    setFlights(flights => {
      flights[flightIdx] = updatedFlight;
      return flights;
    });
  };

  const [filterOptions, setFilterOptions] = useState({});

  const addOption = (id, value) =>
    setFilterOptions(oldFilterOptions => ({ ...oldFilterOptions, [id]: value }));
  const removeOption = id => addOption(id, null);

  return (
    <adminDashboardContext.Provider
      value={{
        flights,
        addFlight,
        removeFlight,
        setFlights,
        updateFlight,
        filterOptions,
        addOption,
        removeOption,
      }}
    >
      {children}
    </adminDashboardContext.Provider>
  );
};

export const useAdminDashboard = () => {
  return useContext(adminDashboardContext);
};

export default ProvideAdminDashboard;
