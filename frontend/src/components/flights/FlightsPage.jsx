import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';

const FlightsPage = () => {
  const location = useLocation();
  //   const [flights, setFlights] = useState([]);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const departureTerminal = params.get('departureTerminal');
    const arrivalTerminal = params.get('arrivalTerminal');
    const departureDate = params.get('departureDate')
      ? new Date(params.get('departureDate'))
      : null;
    const returnDate = params.get('returnDate')
      ? new Date(params.get('returnDate'))
      : null;
    const passengers = +params.get('passengers');
    const cabin = params.get('cabin');

    console.log('IN USE EFFECT');
    const fetchFlights = async () => {
      console.log('fetching flights');
      try {
        const response = await sendRequest('/flight/user/search', 'POST', {
          departureTerminal,
          arrivalTerminal,
          departureDate,
          returnDate,
          passengers,
          cabinClass: cabin,
        });
        if (response && response.data) {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFlights();
  }, [location.search, sendRequest]);

  return <main className='FlightsPage page'></main>;
};

export default FlightsPage;
