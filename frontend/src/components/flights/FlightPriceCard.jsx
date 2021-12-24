const FlightPriceCard = ({
  departureFlightPrice,
  returnFlightPrice,
  departureFlightPassengers,
  returnFlightPassengers,
  flightPrice,
  oldPrice,
  numberOfPassengers,
}) => {
  if (flightPrice) {
    const newFlightPrice = (flightPrice || 0) * (numberOfPassengers || 0);
    const oldFlightPrice = (oldPrice || 0) * (numberOfPassengers || 0);
    const priceDifference = newFlightPrice - oldFlightPrice;

    return (
      <div className='flex flex-col w-full items-end text-grey-4 font-nunito font-semibold pr-4'>
        <div className='mb-2'>
          <span className='mr-10'>New Flight (seats x{numberOfPassengers})</span>
          <span>EGP {newFlightPrice}</span>
        </div>
        <div className='mb-2'>
          <span className='mr-10'>Old Flight Price</span>
          <span>EGP {oldFlightPrice}</span>
        </div>
        <div className='mb-2'>
          <span className='mr-10'>{priceDifference >= 0 ? 'Total' : 'Refunded'}</span>
          <span>EGP {Math.abs(priceDifference)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full items-end text-grey-4 font-nunito font-semibold pr-4'>
      {departureFlightPrice && departureFlightPassengers && (
        <div className='mb-2'>
          <span className='mr-10'>
            Departure Flight (seats x{departureFlightPassengers})
          </span>
          <span>
            EGP {(departureFlightPrice || 0) * (departureFlightPassengers || 0)}
          </span>
        </div>
      )}
      {returnFlightPrice && returnFlightPassengers && (
        <div className='mb-2'>
          <span className='mr-10'>Return Flight (seats x{returnFlightPassengers})</span>
          <span>EGP {(returnFlightPrice || 0) * (returnFlightPassengers || 0)}</span>
        </div>
      )}
      <div className='mb-2'>
        <span className='mr-10'>Total</span>
        <span>
          EGP{' '}
          {(departureFlightPrice || 0) * (departureFlightPassengers || 0) +
            (returnFlightPrice || 0) * (returnFlightPassengers || 0)}
        </span>
      </div>
    </div>
  );
};

export default FlightPriceCard;
