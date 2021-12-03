import React, { useContext, createContext, useState } from 'react';
import { read } from '../../service/localStorage.service';

const reservationContext = createContext();

const ProvideReservation = ({ children }) => {
  const [departureFlight, setDepartureFlight] = useState(
    read('departureFlight') || undefined
  );
  const [returnFlight, setReturnFlight] = useState(read('returnFlight') || undefined);
  const [departureFlightCabin, setDepartureFlightCabin] = useState(
    read('departureFlightCabin') || undefined
  );
  const [returnFlightCabin, setReturnFlightCabin] = useState(
    read('returnFlightCabin') || undefined
  );
  const [departureFlightPassengers, setDepartureFlightPassengers] = useState(
    read('departureFlightPassengers') || undefined
  );
  const [returnFlightPassengers, setReturnFlightPassengers] = useState(
    read('returnFlightPassengers') || undefined
  );

  const chooseDepartureFlight = departureFlight => {
    setDepartureFlight(departureFlight);
  };
  const chooseReturnFlight = returnFlight => {
    setReturnFlight(returnFlight);
  };
  const chooseDepartureFlightCabin = departureFlightCabin => {
    setDepartureFlightCabin(departureFlightCabin);
  };
  const chooseReturnFlightCabin = returnFlightCabin => {
    setReturnFlightCabin(returnFlightCabin);
  };
  const chooseDepartureFlightPassengers = departureFlightPassengers => {
    setDepartureFlightPassengers(departureFlightPassengers);
  };
  const chooseReturnFlightPassengers = returnFlightPassengers => {
    setReturnFlightPassengers(returnFlightPassengers);
  };

  const clear = () => {
    setDepartureFlight(undefined);
    setReturnFlight(undefined);
    setDepartureFlightCabin(undefined);
    setReturnFlightCabin(undefined);
    setDepartureFlightPassengers(undefined);
    setReturnFlightPassengers(undefined);
  };

  return (
    <reservationContext.Provider
      value={{
        departureFlight,
        returnFlight,
        departureFlightCabin,
        returnFlightCabin,
        departureFlightPassengers,
        returnFlightPassengers,
        chooseDepartureFlight,
        chooseReturnFlight,
        chooseDepartureFlightCabin,
        chooseReturnFlightCabin,
        chooseDepartureFlightPassengers,
        chooseReturnFlightPassengers,
        clear,
      }}
    >
      {children}
    </reservationContext.Provider>
  );
};

export const useReservation = () => {
  return useContext(reservationContext);
};

export default ProvideReservation;
