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
  const { sendRequest, isLoading } = useHttpClient();
  const params = new URLSearchParams(location.search);
  const departureTerminal = params.get('departureTerminal');
  const arrivalTerminal = params.get('arrivalTerminal');
  const departureDate = params.get('departureDate');
  const arrivalDate = params.get('arrivalDate');
  const adults = +params.get('adults');
  const children = +params.get('children');
  const cabin = params.get('cabin');
  const type = params.get('type');

  useEffect(() => {
    const fetchFlights = async () => {
      const passengers = (adults || 0) + (children || 0);
      try {
        const response = await sendRequest('/flight/user/search', 'POST', {
          departureTerminal,
          arrivalTerminal,
          departureDate: departureDate ? new Date(departureDate) : null,
          arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
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
  }, [
    arrivalTerminal,
    cabin,
    departureDate,
    departureTerminal,
    location.search,
    adults,
    children,
    arrivalDate,
    sendRequest,
  ]);

  return (
    <main className='FlightsPage page px-16'>
      <div className='w-8/12'>
        <MainSearch
          searchResults
          arrivalTerminal={arrivalTerminal}
          departureTerminal={departureTerminal}
          cabin={+cabin}
          departureDate={departureDate ? new Date(departureDate) : null}
          arrivalDate={arrivalDate ? new Date(arrivalDate) : null}
          adults={adults}
          children={children}
        />
      </div>
      <p className='font-nunito text-lg leading-6 text-grey-primary font-semibold mt-12 mb-4'>
        Choose your{' '}
        <span className='text-primary'>
          {type === 'departure' ? 'departing ' : 'returning '}
        </span>
        flight
      </p>
      {!isLoading ? (
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
      ) : (
        <div className='w-8/12 rounded-xl border-1 border-pale-purple min-h-456 flex justify-center items-center'>
          <div className='w-24 h-24 border-b-4 border-primary rounded-full animate-spin' />
        </div>
      )}
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
