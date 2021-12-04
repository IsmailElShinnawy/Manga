import moment from 'moment';
import EgyptAirLogo from '../../assets/images/egypt-air-logo.png';

const FlightSummary = ({
  departureTime,
  arrivalTime,
  cabinClass,
  flightNumber,
  departureTerminal,
  arrivalTerminal,
}) => {
  return (
    <div className='flex items-center justify-around'>
      <div className='flex justify-center items-center'>
        <img src={EgyptAirLogo} alt='Egypt Air' />
      </div>
      <div className='flex flex-col'>
        <span className='font-nunito text-grey-4 mb-1'>
          {moment(departureTime).format('DD MMM')} Departing
        </span>
        <span className='font-nunito text-grey-secondary mb-1'>{flightNumber}</span>
        <span className='font-nunito text-grey-secondary mb-1'>
          {departureTerminal} - {arrivalTerminal}
        </span>
      </div>
      <div className='flex flex-col'>
        <span className='font-nunito text-grey-4 mb-1'>
          {Math.abs(
            Math.floor(moment(arrivalTime).diff(moment(departureTime), 'minutes') / 60)
          )}
          h {moment(arrivalTime).diff(moment(departureTime), 'minutes') % 60}m
        </span>
        <span className='font-nunito text-grey-4 mb-1'>
          {moment(departureTime).format('h:mm A')} -{' '}
          {moment(arrivalTime).format('h:mm A')}
        </span>
        <span className='font-nunito text-grey-4 mb-1'>{cabinClass} class</span>
      </div>
    </div>
  );
};

export default FlightSummary;
