import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import MainSearch from '../home/MainSearch';
import { Button } from '../shared/UIKit/Buttons';
import FlightCard from './FlightCard';
import './FlightsPage.scss';

const FlightsPage = () => {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [showAllFlights, setShowAllFlights] = useState(false);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const departureTerminal = params.get('departureTerminal');
    const arrivalTerminal = params.get('arrivalTerminal');
    const departureDate = params.get('departureDate')
      ? new Date(params.get('departureDate'))
      : null;
    const returnDate = params.get('returnDate')
      ? new Date(params.get('returnDate'))
      : null;
    const passengers = +params.get('passengers');
    const cabin = params.get('cabin');

    const fetchFlights = async () => {
      try {
        const response = await sendRequest('/flight/user/search', 'POST', {
          departureTerminal,
          arrivalTerminal,
          departureDate,
          returnDate,
          passengers,
          cabinClass: cabin,
        });
        if (response && response.data) {
          setFlights(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFlights();
  }, [location.search, sendRequest]);

  return (
    <main className='FlightsPage page px-16'>
      <div
        className={`w-8/12 rounded-xl border-1 border-pale-purple p-4 ${
          showAllFlights ? '' : 'max-h-456 overflow-y-scroll'
        }`}
      >
        {flights.map(flight => (
          <FlightCard
            key={flight._id}
            id={flight._id}
            flightNumber={flight.flightNumber}
            arrivalTime={flight.arrivalTime}
            departureTime={flight.departureTime}
            businessSeats={flight.businessSeats}
            duration={75}
            economySeats={flight.economySeats}
            price={200}
          />
        ))}
      </div>
      {!showAllFlights && (
        <div className='w-8/12 flex justify-end mt-4'>
          <div>
            <Button
              outline
              text='Show all flights'
              onClick={() => setShowAllFlights(b => !b)}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default FlightsPage;
