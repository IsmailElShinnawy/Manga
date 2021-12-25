import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import FlightCard from '../flights/FlightCard';
import Modal from '../shared/Modal/Modal';
import Loading from '../shared/UIKit/Loading';
import './UpdateFlightModal.scss';
import moment from 'moment';
import { ReactComponent as IconArrowLeft } from '../../assets/icons/IconArrowLeft.svg';
import { ReactComponent as IconClock } from '../../assets/icons/IconClock.svg';
import { ReactComponent as IconBag } from '../../assets/icons/IconBag.svg';
import { ReactComponent as IconMoney } from '../../assets/icons/IconMoney.svg';
import { ReactComponent as IconUser } from '../../assets/icons/IconUser.svg';
import { Button } from '../shared/UIKit/Buttons';
import { Link } from 'react-router-dom';
// import { useReservation } from '../context/ReservationContext';
// import { useHistory } from 'react-router-dom';
// import { remove, write } from '../../service/localStorage.service';

const NewFlightDetails = ({ flight, numberOfSeats, cabin, reservation, type }) => {
  const duration = moment(flight.arrivalTime).diff(
    moment(flight.departureTime),
    'minutes'
  );

  // const {
  //   chooseDepartureFlight,
  //   chooseReturnFlight,
  //   chooseDepartureFlightCabin,
  //   chooseReturnFlightCabin,
  //   chooseDepartureFlightPassengers,
  //   chooseReturnFlightPassengers,
  //   clear,
  // } = useReservation();

  // const history = useHistory();

  // const clearLocalStorage = () => {
  //   remove('departureFlight');
  //   remove('departureFlightCabin');
  //   remove('departureFlightPassengers');

  //   remove('returnFlight');
  //   remove('returnFlightCabin');
  //   remove('returnFlightPassengers');
  // };

  // const handleClick = () => {
  //   clear();
  //   clearLocalStorage();
  //   if (type === 'departure') {
  //     chooseDepartureFlight(flight._id);
  //     write('departureFlight', flight._id);
  //     chooseDepartureFlightCabin(cabin);
  //     write('departureFlightCabin', cabin);
  //     chooseDepartureFlightPassengers(numberOfSeats);
  //     write('departureFlightPassengers', numberOfSeats);
  //   } else {
  //     chooseReturnFlight(flight._id);
  //     write('returnFlight', flight._id);
  //     chooseReturnFlightCabin(cabin);
  //     write('returnFlightCabin', cabin);
  //     chooseReturnFlightPassengers(numberOfSeats);
  //     write('returnFlightPassengers', numberOfSeats);
  //   }
  //   history.push(`/checkout/${reservation}/${flight._id}/${type}/${cabin}`);
  // };

  return (
    <div>
      <h2 className='text-grey-secondary text-xl mb-2'>#{flight.flightNumber}</h2>
      <div className='flex mb-2'>
        <div className='flex flex-col w-1/2'>
          <span className='font-bold mb-1 text-lg'>{flight.departureTerminal}</span>
          <span className='text-grey-secondary mb-1'>Departing</span>
          <span className='font-semibold mb-1'>
            {moment(flight.departureTime).format('DD MMM YYYY')}
          </span>
          <span className='font-semibold mb-1'>
            {moment(flight.departureTime).format('hh:mm A')}
          </span>
        </div>
        <div className='flex flex-col w-1/2'>
          <span className='font-bold mb-1 text-lg'>{flight.arrivalTerminal}</span>
          <span className='text-grey-secondary mb-1'>Arrival</span>
          <span className='font-semibold mb-1'>
            {moment(flight.arrivalTime).format('DD MMM YYYY')}
          </span>
          <span className='font-semibold mb-1'>
            {moment(flight.arrivalTime).format('hh:mm A')}
          </span>
        </div>
      </div>
      <div className='flex mb-2'>
        <div className='flex mb-1 w-1/2'>
          <IconClock fill='#605DEC' className='mr-2' />
          <span className='text-grey-secondary'>
            Duration {Math.abs(duration / 60)}h {Math.abs(duration % 60)}m
          </span>
        </div>
        <div className='flex mb-1 w-1/2'>
          <IconBag fill='#605DEC' className='mr-2' />
          <span className='text-grey-secondary'>{flight.baggageAllowance} kg</span>
        </div>
      </div>
      <div className='flex mb-2'>
        <div className='flex mb-1 w-1/2'>
          <IconUser fill='#605DEC' className='mr-2' />
          <span className='text-grey-secondary'>
            {/* {flight.allEconomySeats.length} economy seats */}
            {numberOfSeats} {cabin} seat(s)
          </span>
        </div>
        <div className='flex mb-1 w-1/2'>
          <IconMoney fill='#605DEC' className='mr-2' />
          <span className='text-grey-secondary'>USD {flight.ticketPrice}</span>
        </div>
      </div>
      <div className='flex w-full justify-end mt-2'>
        <div>
          <Link
            to={`/checkout/${reservation}/${flight._id}/${type}/${cabin}`}
            className='text-white bg-primary ml-2 py-3 px-5 rounded-4'
          >
            Confirm and Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

const AlternativeFlights = ({ flights, oldPrice, chooseFlight }) => {
  return (
    <>
      <div
        className='overflow-y-scroll mb-4 flights'
        style={{ maxHeight: 'calc(100vh - 200px)', minHeight: 'calc(100vh - 200px)' }}
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
            price={flight.ticketPrice}
            key={flight._id}
            oldPrice={oldPrice}
            onClick={() => chooseFlight({ ...flight, oldPrice })}
          />
        ))}
      </div>
      {/* <div className='w-3/12'>
        <Button text={'Choose new flight'} />
      </div> */}
    </>
  );
};

const UpdateFlightModal = ({ updating, close }) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [alternativeFlights, setAlternativeFlights] = useState([]);
  const [chosenFlight, setChosenFlight] = useState(null);

  useEffect(() => {
    const getAlternativeFlights = async () => {
      const response = await sendRequest(`/flight/alternative/${updating.id}`, 'POST', {
        type: updating.type,
      });
      if (response && response.data) {
        // const fakeFlights = new Array(50).fill(response.data[0]);
        // setAlternativeFlights(fakeFlights);
        setAlternativeFlights(response.data);
      }
    };
    if (Boolean(updating)) {
      getAlternativeFlights();
    }
    return () => {
      setChosenFlight(null);
    };
  }, [sendRequest, updating]);

  const modalContent = isLoading ? (
    <div className='min-w-full min-h-full flex justify-center items-center'>
      <Loading />
    </div>
  ) : Boolean(chosenFlight) ? (
    <>
      <h1 className='font-nunito text-grey-primary font-bold text-2xl leading-8 mr-auto mb-4 flex items-center'>
        <span className='hover:cursor-pointer mr-1' onClick={() => setChosenFlight(null)}>
          <IconArrowLeft fill='#6E7491' />
        </span>
        <span>Confirm new {updating?.type} flight</span>
      </h1>
      <NewFlightDetails
        flight={chosenFlight}
        numberOfSeats={updating?.numberOfSeats}
        cabin={updating?.cabin}
        reservation={updating?.id}
        type={updating?.type}
      />
    </>
  ) : (
    <>
      <h1 className='font-nunito text-grey-primary font-bold text-2xl leading-8 mr-auto mb-4'>
        Choose a new {updating?.type} flight
      </h1>
      <AlternativeFlights
        flights={alternativeFlights}
        oldPrice={updating?.oldPrice}
        chooseFlight={setChosenFlight}
      />
    </>
  );

  return (
    <Modal
      show={Boolean(updating)}
      close={close}
      sm={Boolean(chosenFlight)}
      center={isLoading}
    >
      {modalContent}
    </Modal>
  );
};

export default UpdateFlightModal;
