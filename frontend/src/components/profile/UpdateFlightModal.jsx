import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import FlightCard from '../flights/FlightCard';
import Modal from '../shared/Modal/Modal';
import { Button } from '../shared/UIKit/Buttons';
import Loading from '../shared/UIKit/Loading';

const AlternativeFlights = ({ flights }) => {
  return (
    <>
      <div
        className='overflow-y-scroll mb-4'
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {flights.map(flight => (
          <FlightCard
            arrivalTerminal={flight.arrivalTerminal}
            arrivalTime={flight.arrivalTime}
            baggageAllowance={flight.baggageAllowance}
            businessSeats={flight.baggageAllowance}
            departureTerminal={flight.departureTerminal}
            departureTime={flight.departureTime}
            economySeats={flight.economySeats}
            flightNumber={flight.flightNumber}
            id={flight._id}
            price={flight.price}
            key={flight._id}
            onClick={() => {}}
          />
        ))}
      </div>
      <div className='w-3/12'>
        <Button text={'Choose new flight'} />
      </div>
    </>
  );
};

const UpdateFlightModal = ({ updating, close }) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [alternativeFlights, setAlternativeFlights] = useState([]);

  useEffect(() => {
    const getAlternativeFlights = async () => {
      const response = await sendRequest('/flight/user/search', 'POST');
      if (response && response.data) {
        setAlternativeFlights(response.data);
      }
    };
    getAlternativeFlights();
  }, [sendRequest, updating]);

  return (
    <Modal show={Boolean(updating)} close={close}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className='font-nunito text-grey-primary font-bold text-2xl leading-8 mr-auto mb-4'>
            Choose a new {updating?.type} flight
          </h1>
          <AlternativeFlights flights={alternativeFlights} />
        </>
      )}
    </Modal>
  );
};

export default UpdateFlightModal;
