import React, { useState, createContext, useContext } from 'react';

const flightsContext = createContext();

const ProvideFlights = ({ children }) => {
  const [shownFlights, setShownFlights] = useState([]);

  return (
    <flightsContext.Provider value={(shownFlights, setShownFlights)}>
      {children}
    </flightsContext.Provider>
  );
};

export default ProvideFlights;

export const useFlights = () => {
  return useContext(flightsContext);
};
