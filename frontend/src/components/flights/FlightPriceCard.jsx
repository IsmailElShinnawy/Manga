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
          <span>USD {newFlightPrice}</span>
        </div>
        <div className='mb-2'>
          <span className='mr-10'>Old Flight Price</span>
          <span>USD {oldFlightPrice}</span>
        </div>
        <div className='mb-2'>
          <span className='mr-10'>Changing Flight Fee</span>
          <span>USD {process.env.REACT_APP_CHANGING_FLIGHT_FEE}</span>
        </div>
        <div className='mb-2'>
          <span className='mr-10'>Total</span>
          <span>
            USD{' '}
            {(priceDifference >= 0 ? priceDifference : 0) +
              Number(process.env.REACT_APP_CHANGING_FLIGHT_FEE)}
          </span>
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
            USD {(departureFlightPrice || 0) * (departureFlightPassengers || 0)}
          </span>
        </div>
      )}
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
