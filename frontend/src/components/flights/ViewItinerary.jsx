import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import { useAuth } from '../context/AuthContext';
import FlightCard from './FlightCard';

const ViewItinerary = () => {
  const reservationId = useParams().id;
  const { account } = useAuth();
  const { sendRequest } = useHttpClient();
  const [reservation, setReservation] = useState();

  useEffect(() => {
    const fetchReservation = async () => {
      const response = await sendRequest(`/reservation/${reservationId}`);
      if (response && response.data) {
        setReservation(response.data);
      }
    };
    if (reservationId) fetchReservation();
  }, [reservationId, sendRequest]);

  return (
    <main className='page px-16'>
      <section className='w-7/12'>
        <div className='bg-light-green border-dark-green border-1 rounded-lg p-5 text-dark-green font-nunito mb-10'>
          Your flights has been booked successfully! Your confirmation number is #
          {reservationId.toUpperCase()}
        </div>
        <h1 className='text-primary font-nunito font-bold text-2xl leading-8 mb-4'>
          Bon voyage, {account.firstname}
        </h1>
        <p className='text-grey-primary font-semibold font-nunito text-lg leading-6 mb-14'>
          Confirmation number: #{reservationId.toUpperCase()}
        </p>
        <h2 className='font-nunito text-grey-primary font-bold text-2xl leading-8 mb-6'>
          Flight Summary
        </h2>
        <div className='mb-10'>
          <h3 className='font-nunito font-semibold text-lg leading-6 text-grey-primary mb-4'>
            Departing{' '}
            {moment(reservation?.departureFlight.departureTime).format('MMMM Do, YYYY')}
          </h3>
          <FlightCard
            arrivalTerminal={reservation?.departureFlight.arrivalTerminal}
            arrivalTime={reservation?.departureFlight.arrivalTime}
            departureTerminal={reservation?.departureFlight.departureTerminal}
            departureTime={reservation?.departureFlight.departureTime}
            flightNumber={reservation?.departureFlight.flightNumber}
            id={reservation?.departureFlight._id}
            price={reservation?.departureFlight.price}
            noHover
            noSeats
          />
          <p className='mt-3 text-grey-secondary leading-5'>
            Chosen Seats ({reservation?.departureFlightCabin}):{' '}
            {reservation?.departureFlightSeats.map(seat => (
              <span key={`departureSeat${seat}`}>
                {reservation?.departureFlightCabin === 'economy' ? 'E' : 'B'}
                {seat}{' '}
              </span>
            ))}
          </p>
        </div>
        <div className='mb-10'>
          <h3 className='font-nunito font-semibold text-lg leading-6 text-grey-primary mb-4'>
            Returning{' '}
            {moment(reservation?.returnFlight.departureTime).format('MMMM Do, YYYY')}
          </h3>
          <FlightCard
            arrivalTerminal={reservation?.returnFlight.arrivalTerminal}
            arrivalTime={reservation?.returnFlight.arrivalTime}
            departureTerminal={reservation?.returnFlight.departureTerminal}
            departureTime={reservation?.returnFlight.departureTime}
            flightNumber={reservation?.returnFlight.flightNumber}
            id={reservation?.returnFlight._id}
            price={reservation?.returnFlight.price}
            noHover
            noSeats
          />
          <p className='mt-3 text-grey-secondary leading-5'>
            Chosen Seats ({reservation?.returnFlightCabin}):{' '}
            {reservation?.returnFlightSeats.map(seat => (
              <span key={`returnSeat${seat}`}>
                {reservation?.returnFlightCabin === 'economy' ? 'E' : 'B'}
                {seat}{' '}
              </span>
            ))}
          </p>
        </div>
        <div>
          <h2 className='font-nunito text-grey-primary font-bold text-2xl leading-8 mb-6'>
            Price Breakdown
          </h2>
        </div>
      </section>
    </main>
  );
};

export default ViewItinerary;
