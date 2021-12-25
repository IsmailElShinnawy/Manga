import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import Loading from '../shared/UIKit/Loading';
import { Input } from '../shared/UIKit/Inputs';
import { Button } from '../shared/UIKit/Buttons';
import FlightSummaryCard from './FlightSummaryCard';
// stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { stripeConfig } from '../../config/stripe.config';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(stripeConfig.pk);
// import { useReservation } from '../context/ReservationContext';

const UpdateReservation = () => {
  const { rid, fid, cabin, type } = useParams();
  const [seats, setSeats] = useState([]);
  const { sendRequest, isLoading } = useHttpClient();
  const {
    sendRequest: reserve,
    isLoading: isReserving,
    error: reservationError,
  } = useHttpClient();
  const history = useHistory();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [oldReservation, setOldReservation] = useState(null);
  const [flight, setFlight] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  // const { returnFlightPassengers, departureFlightPassengers } = useReservation();

  const getNumberOfSeats = () => {
    if (!Boolean(oldReservation)) return Infinity;
    const reservedSeats =
      type === 'departure' ? 'departureFlightSeats' : 'returnFlightSeats';

    return oldReservation[reservedSeats].length;
  };

  const isSelectedSeat = idx => selectedSeats.includes(idx);

  const toggleSeat = idx => {
    if (isSelectedSeat(idx)) setSelectedSeats(seats => seats.filter(s => s !== idx));
    else if (selectedSeats.length < getNumberOfSeats())
      setSelectedSeats(seats => [...seats, idx]);
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await sendRequest(`/flight/seats/${fid}`, 'POST', {
          cabin,
        });
        if (response && response.data) {
          setSeats(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchOldReservation = async () => {
      try {
        const response = await sendRequest(`/reservation/${rid}`);
        if (response && response.data) {
          setOldReservation(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchFlight = async () => {
      try {
        const response = await sendRequest(`/flight/${fid}`);
        if (response && response.data) {
          setFlight(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchClientSecret = async () => {
      try {
        const response = await sendRequest(
          `/reservation/${rid}/update-reservation-payment-secret`,
          'POST',
          {
            flightId: fid,
            type,
          }
        );
        if (response?.data) {
          setClientSecret(response?.data.clientSecret);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSeats();
    fetchOldReservation();
    fetchFlight();
    fetchClientSecret();
  }, [sendRequest, fid, cabin, rid, type]);

  if (isLoading)
    return (
      <main className='page flex justify-center items-center'>
        <Loading />
      </main>
    );

  return (
    <main className='page px-16 pt-14'>
      <h3 className='text-2xl font-bold font-nunito leading-8 text-primary mb-4'>
        Checkout
      </h3>
      <div className='flex w-full'>
        <section className='w-1/3'>
          <h2 className='text-xl font-semibold font-nunito leading-6 text-grey-primary mb-4'>
            Step 1 - Choosing your seats
          </h2>
          <span className='italic text-sm mb-4'>(choose {getNumberOfSeats()})</span>
          <div className='flex w-full flex-wrap'>
            {seats.map(
              (seat, idx) =>
                seat && (
                  <span
                    onClick={() => toggleSeat(idx)}
                    className={`mr-3 mb-6 w-10 h-10 flex justify-center items-center rounded-full 
                      ${isSelectedSeat(idx) ? 'bg-primary text-white' : 'bg-pale-purple'}
                       hover:cursor-pointer`}
                    key={`departureSeat${idx}`}
                  >
                    {cabin === 'business' ? 'B' : 'E'}
                    {idx}
                  </span>
                )
            )}
          </div>
        </section>
        <section className='w-1/3'>
          <h2 className='text-xl font-semibold font-nunito leading-6 text-grey-primary mb-4'>
            Step 2 - Payment
          </h2>
          <p className='text-grey-secondary font-nunito text-lg leading-6 mb-6'>
            Manga Flights processes your payment securely with end-to-end encryption.
          </p>
          <h3 className='text-grey-primary font-nunito text-lg leading-6 mb-6'>
            Credit Card Details
          </h3>
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                updating
                flightCabin={cabin}
                flightId={fid}
                flightSeats={selectedSeats}
                reservationId={rid}
                numberOfSeats={getNumberOfSeats()}
                type={type}
              />
            </Elements>
          ) : (
            <div className='w-full flex justify-center'>
              <Loading />
            </div>
          )}
        </section>
        <section className='w-1/3'>
          <FlightSummaryCard
            noButton
            flight={flight}
            flightCabin={cabin}
            numberOfPassengers={getNumberOfSeats()}
            oldPrice={
              type === 'departure'
                ? oldReservation?.departureFlight.ticketPrice
                : oldReservation?.returnFlight.ticketPrice
            }
            updating
          />
        </section>
      </div>
    </main>
  );
};

export default UpdateReservation;
