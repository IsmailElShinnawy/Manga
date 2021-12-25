import React from 'react';

import moment from 'moment';

import EgyptAirLogo from '../../assets/images/egypt-air-logo.png';

const FlightCard = ({
  id,
  flightNumber,
  departureTime,
  departureTerminal,
  arrivalTerminal,
  arrivalTime,
  economySeats,
  businessSeats,
  price,
  onClick,
  noHover,
  noSeats,
  baggageAllowance,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full flex justify-around border-b-1 border-pale-purple last:border-b-0 py-3 px-4 ${
        !noHover ? 'hover:bg-hover hover:cursor-pointer' : ''
      }`}
    >
      <div className='flex justify-center items-center'>
        <img src={EgyptAirLogo} alt='Egypt Air' />
      </div>
      <div className='flex items-center'>
        <span className='text-grey-secondary leading-5'>{flightNumber}</span>
      </div>
      <div className='flex flex-col justify-around'>
        <span className='text-grey-4 font-nunito leading-5 mb-1'>
          {moment(departureTime).format('DD MMM')} Departing
        </span>
        <span className='text-grey-4 font-nunito leading-5'>
          {moment(arrivalTime).format('DD MMM')} Arriving
        </span>
      </div>
      <div className='flex flex-col justify-around'>
        <span className='text-grey-4 font-nunito leading-5 mb-1 text-right'>From</span>
        <span className='font-nunito text-right w-full text-grey-secondary leading-5'>
          {departureTerminal}
        </span>
      </div>
      <div className='flex flex-col justify-around'>
        <span className='text-grey-4 font-nunito leading-5 mb-1 text-right'>To</span>
        <span className='font-nunito text-right w-full text-grey-secondary leading-5'>
          {arrivalTerminal}
        </span>
      </div>
      <div className='flex flex-col justify-around'>
        <span className='text-grey-4 font-nunito leading-5 mb-1 text-right'>
          {moment(departureTime).format('hh:mm a')} -{' '}
          {moment(arrivalTime).format('hh:mm a')}
        </span>
        <span className='font-nunito text-right w-full text-grey-secondary leading-5'>
          {/* {Math.floor(duration / 60)} hrs {duration % 60} mins */}
          {Math.abs(
            Math.floor(moment(arrivalTime).diff(moment(departureTime), 'minutes') / 60)
          )}
          h {moment(arrivalTime).diff(moment(departureTime), 'minutes') % 60}m
        </span>
      </div>
      {!noSeats && (
        <div className='flex flex-col justify-around'>
          <span className='text-grey-4 font-nunito leading-5 mb-1 text-right'>
            Business Cabin
          </span>
          <span className='font-nunito text-right w-full text-grey-secondary leading-5'>
            {businessSeats || 'N/A'} seats
          </span>
        </div>
      )}
      {!noSeats && (
        <div className='flex flex-col justify-around'>
          <span className='text-grey-4 font-nunito leading-5 mb-1 text-right'>
            Economy Cabin
          </span>
          <span className='font-nunito text-right w-full text-grey-secondary leading-5'>
            {economySeats || 'N/A'} seats
          </span>
        </div>
      )}
      <div className='flex flex-col justify-around'>
        <span className='text-grey-4 font-nunito leading-5 mb-1 text-right'>
          Baggage Allowance
        </span>
        <span className='font-nunito text-right w-full text-grey-secondary leading-5'>
          {baggageAllowance} Kg
        </span>
      </div>
      <div className='flex flex-col justify-around'>
        <span className='text-grey-4 font-nunito leading-5 mb-1 text-right'>Price</span>
        <span className='font-nunito text-right w-full text-grey-secondary leading-5'>
          USD {price}
        </span>
      </div>
    </div>
  );
};

export default FlightCard;
