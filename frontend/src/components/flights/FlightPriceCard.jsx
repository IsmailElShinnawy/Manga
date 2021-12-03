const FlightPriceCard = ({ departureFlightPrice, returnFlightPrice }) => {
  const taxes = ((departureFlightPrice || 0) + (returnFlightPrice || 0)) * 0.14;
  return (
    <div className='flex flex-col w-full items-end text-grey-4 font-nunito font-semibold pr-4'>
      <div className='mb-2'>
        <span className='mr-10'>Subtotal</span>
        <span>${(departureFlightPrice || 0) + (returnFlightPrice || 0)}</span>
      </div>
      <div className='mb-2'>
        <span className='mr-10'>Taxes</span>
        <span>${taxes}</span>
      </div>
      <div>
        <span className='mr-10'>Total</span>
        <span>${(departureFlightPrice || 0) + (returnFlightPrice || 0) + taxes}</span>
      </div>
    </div>
  );
};

export default FlightPriceCard;
