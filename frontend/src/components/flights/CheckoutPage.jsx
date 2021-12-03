import React, { useEffect, useState } from 'react';
import { useReservation } from '../context/ReservationContext';
import { useHttpClient } from '../../hooks/http-hook';
import Loading from '../shared/UIKit/Loading';

const CheckoutPage = () => {
  const {
    departureFlight,
    returnFlight,
    departureFlightCabin,
    returnFlightCabin,
    departureFlightPassengers,
    returnFlightPassengers,
  } = useReservation();
  const { sendRequest: sendDepartureRequest, isLoading: isDepartureLoading } =
    useHttpClient();
  const { sendRequest: sendReturnRequest, isLoading: isReturnLoading } = useHttpClient();

  const [departureFlightAvailableSeats, setDepartureFlightAvailableSeats] = useState([]);
  const [returnFlightAvailableSeats, setReturnFlightAvailableSeats] = useState([]);

  const [chosenDepartureSeats, setChosenDepartureSeats] = useState([]);
  const [chosenReturnSeats, setChosenReturnSeats] = useState([]);

  const addDepartureSeat = seat => {
    setChosenDepartureSeats(seats => [...seats, seat]);
  };

  const removeDepartureSeat = seat => {
    setChosenDepartureSeats(seats => seats.filter(s => s !== seat));
  };

  const addReturnSeat = seat => {
    setChosenReturnSeats(seats => [...seats, seat]);
  };

  const removeReturnSeat = seat => {
    setChosenReturnSeats(seats => seats.filter(s => s !== seat));
  };

  const isDepartureSeat = seat => {
    const idx = chosenDepartureSeats.findIndex(s => s === seat);
    return idx >= 0;
  };

  const isReturnSeat = seat => {
    const idx = chosenReturnSeats.findIndex(s => s === seat);
    return idx >= 0;
  };

  const toggleDepartureSeat = seat => {
    if (isDepartureSeat(seat)) {
      removeDepartureSeat(seat);
    } else {
      if (chosenDepartureSeats.length === departureFlightPassengers) return;
      addDepartureSeat(seat);
    }
  };

  const toggleReturnSeat = seat => {
    if (isReturnSeat(seat)) {
      removeReturnSeat(seat);
    } else {
      if (chosenReturnSeats.length === returnFlightPassengers) return;
      addReturnSeat(seat);
    }
  };

  useEffect(() => {
    const fetchDepartureFlightSeats = async () => {
      try {
        const response = await sendDepartureRequest(
          `/flight/seats/${departureFlight}`,
          'POST',
          {
            cabin: departureFlightCabin,
          }
        );
        if (response && response.data) {
          setDepartureFlightAvailableSeats(response.data);
        }
      } catch (err) {}
    };
    const fetchReturnFlightSeats = async () => {
      try {
        const response = await sendReturnRequest(
          `/flight/seats/${returnFlight}`,
          'POST',
          {
            cabin: returnFlightCabin,
          }
        );
        if (response && response.data) {
          setReturnFlightAvailableSeats(response.data);
        }
      } catch (err) {}
    };
    if (departureFlight) fetchDepartureFlightSeats();
    if (returnFlight) fetchReturnFlightSeats();
  }, [
    departureFlight,
    departureFlightCabin,
    returnFlight,
    returnFlightCabin,
    sendDepartureRequest,
    sendReturnRequest,
  ]);

  return (
    <main className='CheckoutPage page px-16 pt-14'>
      <h3 className='text-2xl font-bold font-nunito leading-8 text-primary mb-4'>
        Checkout
      </h3>
      <div className='flex w-full'>
        <section className='w-1/3'>
          <h2 className='text-xl font-semibold font-nunito leading-6 text-grey-primary mb-4'>
            Step 1 - Choosing your seats
          </h2>
          <h3 className='text-lg font-medium font-nunito leading-4 text-grey-secondary mb-4'>
            Departure flight seats{' '}
            <span className='italic text-sm'>(choose {departureFlightPassengers})</span>
          </h3>
          {!isDepartureLoading ? (
            <div className='flex w-full flex-wrap'>
              {departureFlightAvailableSeats.map(
                (seat, idx) =>
                  seat && (
                    <span
                      onClick={() => toggleDepartureSeat(idx)}
                      className={`mr-3 mb-3 w-10 h-10 flex justify-center items-center rounded-full ${
                        isDepartureSeat(idx) ? 'bg-primary text-white' : 'bg-pale-purple'
                      } hover:cursor-pointer`}
                      key={`departureSeat${idx}`}
                    >
                      {departureFlightCabin === 'business' ? 'B' : 'E'}
                      {idx}
                    </span>
                  )
              )}
            </div>
          ) : (
            <div className='w-full flex justify-center items-center p-4'>
              <Loading sm />
            </div>
          )}
          <h3 className='text-lg font-medium font-nunito leading-4 text-grey-secondary mb-4'>
            Return flight seats{' '}
            <span className='italic text-sm'>(choose {returnFlightPassengers})</span>
          </h3>
          {!isReturnLoading ? (
            <div className='flex w-full flex-wrap'>
              {returnFlightAvailableSeats.map(
                (seat, idx) =>
                  seat && (
                    <span
                      onClick={() => toggleReturnSeat(idx)}
                      className={`mr-3 mb-3 w-10 h-10 flex justify-center items-center rounded-full ${
                        isReturnSeat(idx) ? 'bg-primary text-white' : 'bg-pale-purple'
                      } hover:cursor-pointer`}
                      key={`returnSeat${idx}`}
                    >
                      {returnFlightCabin === 'business' ? 'B' : 'E'}
                      {idx}
                    </span>
                  )
              )}
            </div>
          ) : (
            <div className='w-full flex justify-center items-center p-4'>
              <Loading sm />
            </div>
          )}
        </section>
        <section className='w-1/3'>
          <h2 className='text-xl font-semibold font-nunito leading-6 text-grey-primary mb-4'>
            Step 2 - Payment
          </h2>
        </section>
      </div>
    </main>
  );
};

export default CheckoutPage;
