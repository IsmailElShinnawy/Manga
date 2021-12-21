import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import Modal from '../shared/Modal/Modal';

const Seats = ({ reservation, type }) => {
  const cabin =
    type === 'departure'
      ? reservation.departureFlightCabin
      : reservation.returnFlightCabin;

  const userChosenSeats =
    type === 'departure'
      ? reservation.departureFlightSeats
      : reservation.returnFlightSeats;

  const numberOfUserSeats = userChosenSeats.length;

  const allSeats =
    reservation[type === 'departure' ? 'departureFlight' : 'returnFlight'][
      cabin === 'economy' ? 'allEconomySeats' : 'allBusinessSeats'
    ];

  const [selectedSeats, setSelectedSeats] = useState(userChosenSeats);
  const [allAvailableSeats, setAllAvailableSeats] = useState(allSeats);

  const isSelectedSeat = seat => selectedSeats.includes(seat);

  const addSeat = seat => {
    if (selectedSeats.length === numberOfUserSeats) return;
    setSelectedSeats(seats => [...seats, seat]);
    setAllAvailableSeats(seats => {
      const newSeats = seats;
      newSeats[seat] = false;
      return newSeats;
    });
  };

  const removeSeat = seat => {
    setSelectedSeats(seats => seats.filter(s => s !== seat));
    setAllAvailableSeats(seats => {
      const newSeats = seats;
      newSeats[seat] = true;
      return newSeats;
    });
  };

  return (
    <div className='flex flex-wrap w-full'>
      {allAvailableSeats.map(
        (available, seat) =>
          (available || isSelectedSeat(seat)) && (
            <span
              className={`select-none mr-3 mb-6 w-10 h-10 flex justify-center items-center rounded-full ${
                isSelectedSeat(seat) ? 'bg-primary text-white' : 'bg-pale-purple'
              } hover:cursor-pointer`}
              key={`seat${seat}`}
              onClick={() => (isSelectedSeat(seat) ? removeSeat(seat) : addSeat(seat))}
            >
              {cabin[0].toUpperCase()}
              {seat}
            </span>
          )
      )}
    </div>
  );
};

const EditReservationSeatsModal = ({ editing, close }) => {
  const { sendRequest } = useHttpClient();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      const response = await sendRequest(`/reservation/${editing.id}`);
      if (response) {
        setReservation(response.data);
      }
    };
    if (editing?.id) {
      fetchReservation();
    }
  }, [editing, sendRequest]);

  return (
    <Modal show={Boolean(editing)} close={close} sm>
      <h1 className='font-nunito text-grey-primary font-bold text-2xl leading-8 mr-auto mb-4'>
        Edit {editing?.type} flight seats
      </h1>
      {reservation && <Seats reservation={reservation} type={editing?.type} />}
    </Modal>
  );
};

export default EditReservationSeatsModal;
