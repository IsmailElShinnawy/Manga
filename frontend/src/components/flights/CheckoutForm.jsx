import React from 'react';

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '../shared/UIKit/Buttons';
import { useHttpClient } from '../../hooks/http-hook';
import { useHistory } from 'react-router-dom';
import { useReservation } from '../context/ReservationContext';
import { remove } from '../../service/localStorage.service';

const CheckoutForm = ({
  chosenDepartureSeats,
  departureFlightPassengers,
  chosenReturnSeats,
  returnFlightPassengers,
  departureFlight,
  returnFlight,
  departureFlightCabin,
  returnFlightCabin,
  updating,
  reservationId,
  type,
  flightId,
  flightSeats,
  flightCabin,
  numberOfSeats,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const { clear } = useReservation();
  const { sendRequest, isLoading } = useHttpClient();

  const handleReserve = async event => {
    event.preventDefault();
    if (!stripe || !elements) return;
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://google.com`,
        },
        redirect: 'if_required',
      });

      if (error) throw error;

      const response = await sendRequest(
        updating ? `/reservation/${reservationId}` : '/reservation',
        updating ? 'PUT' : 'POST',
        updating
          ? {
              type,
              flightId,
              flightSeats,
              flightCabin,
            }
          : {
              departureFlightId: departureFlight,
              returnFlightId: returnFlight,
              departureFlightSeats: chosenDepartureSeats,
              returnFlightSeats: chosenReturnSeats,
              departureFlightCabin,
              returnFlightCabin,
            }
      );
      if (!updating) {
        clear();
        remove('departureFlighCabin');
        remove('returnFlighCabin');
        remove('departureFlightPassengers');
        remove('returnFlightPassengers');
        remove('departureFlight');
        remove('returnFlight');
      }
      history.push(`/itinerary/${updating ? reservationId : response.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <PaymentElement />
      <div className='w-full mt-4'>
        <Button
          text='Confirm and reserve'
          disabled={
            (updating
              ? flightSeats?.length < numberOfSeats
              : chosenDepartureSeats?.length < departureFlightPassengers ||
                chosenReturnSeats?.length < returnFlightPassengers) ||
            !stripe ||
            !elements
          }
          isLoading={isLoading}
          loadingText='Loading...'
          onClick={handleReserve}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
