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
        <span>USD {(departureFlightPrice || 0) * (departureFlightPassengers || 0)}</span>
      </div>
      {returnFlightPrice && returnFlightPassengers && (
        <div className='mb-2'>
          <span className='mr-10'>Return Flight (seats x{returnFlightPassengers})</span>
          <span>USD {(returnFlightPrice || 0) * (returnFlightPassengers || 0)}</span>
        </div>
      )}
      <div className='mb-2'>
        <span className='mr-10'>Total</span>
        <span>
          USD{' '}
          {(departureFlightPrice || 0) * (departureFlightPassengers || 0) +
            (returnFlightPrice || 0) * (returnFlightPassengers || 0)}
        </span>
      </div>
    </div>
  );
};

export default FlightPriceCard;
