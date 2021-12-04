const FlightPriceCard = ({
  departureFlightPrice,
  returnFlightPrice,
  departureFlightPassengers,
  returnFlightPassengers,
}) => {
  return (
    <div className='flex flex-col w-full items-end text-grey-4 font-nunito font-semibold pr-4'>
      <div className='mb-2'>
        <span className='mr-10'>
          Departure Flight (seats x{departureFlightPassengers})
        </span>
        <span>EGP {(departureFlightPrice || 0) * departureFlightPassengers}</span>
      </div>
      <div className='mb-2'>
        <span className='mr-10'>Return Flight (seats x{returnFlightPassengers})</span>
        <span>EGP {(returnFlightPrice || 0) * returnFlightPassengers}</span>
      </div>
      <div className='mb-2'>
        <span className='mr-10'>Total</span>
        <span>
          EGP{' '}
          {(departureFlightPrice || 0) * departureFlightPassengers +
            (returnFlightPrice || 0) * returnFlightPassengers}
        </span>
      </div>
    </div>
  );
};

export default FlightPriceCard;
