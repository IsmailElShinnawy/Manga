import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import { remove, write } from '../../service/localStorage.service';
import { useReservation } from '../context/ReservationContext';
import MainSearch from '../home/MainSearch';
import { Button } from '../shared/UIKit/Buttons';
import Loading from '../shared/UIKit/Loading';
import ConfirmChooseFlight from './ConfirmChooseFlight';
import FlightCard from './FlightCard';
import './FlightsPage.scss';
import FlightSummaryCard from './FlightSummaryCard';

const FlightsPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { sendRequest, isLoading } = useHttpClient();
  const { departureFlight, chooseDepartureFlight, chooseReturnFlight } = useReservation();

  const [showAllFlights, setShowAllFlights] = useState(false);
  const [flights, setFlights] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [chosenFlight, setChosenFlight] = useState();

  const params = new URLSearchParams(location.search);

  const departureTerminal = params.get('departureTerminal');
  const arrivalTerminal = params.get('arrivalTerminal');
  const departureDate = params.get('departureDate');
  const arrivalDate = params.get('arrivalDate');
  const adults = +params.get('adults');
  const children = +params.get('children');
  const cabin = params.get('cabin');
  const type = params.get('type');

  useEffect(() => {
    const fetchDepartureFlights = async () => {
      const passengers = (adults || 0) + (children || 0);
      try {
        const response = await sendRequest('/flight/user/search', 'POST', {
          departureTerminal,
          arrivalTerminal,
          departureDate: departureDate ? new Date(departureDate) : null,
          arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
          passengers,
          cabinClass: cabin,
        });
        if (response && response.data) {
          setFlights(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchReturnFlights = async () => {
      const passengers = (adults || 0) + (children || 0);
      try {
        const response = await sendRequest(`/flight/return/${departureFlight}`, 'POST', {
          cabinClass: cabin,
          numberOfPassengers: passengers,
        });
        if (response && response.data) {
          setFlights(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (type === 'departure') fetchDepartureFlights();
    else if (type === 'return' && departureFlight) fetchReturnFlights();
  }, [
    arrivalTerminal,
    cabin,
    departureDate,
    departureTerminal,
    location.search,
    adults,
    children,
    arrivalDate,
    sendRequest,
    type,
    departureFlight,
  ]);

  const handleConfirm = () => {
    if (type === 'departure') {
      chooseDepartureFlight(chosenFlight);
      write('departureFlight', chosenFlight);

      chooseReturnFlight(null);
      remove('returnFlight');

      let url = '/flights?type=return&';
      if (departureTerminal) {
        url += `departureTerminal=${encodeURIComponent(departureTerminal)}&`;
      }
      if (arrivalTerminal) {
        url += `arrivalTerminal=${encodeURIComponent(arrivalTerminal)}&`;
      }
      if (departureDate) {
        url += `departureDate=${encodeURIComponent(departureDate)}&`;
      }
      if (arrivalDate) {
        url += `arrivalDate=${encodeURIComponent(arrivalDate)}&`;
      }
      if (adults) {
        url += `adults=${encodeURIComponent(adults)}&`;
      }
      if (children) {
        url += `children=${encodeURIComponent(children)}&`;
      }

      url = url.slice(0, url.length - 1);

      history.push(url);
    } else if (type === 'return') {
      chooseReturnFlight(chosenFlight);
      write('returnFlight', chosenFlight);
    }
  };

  return (
    <>
      <ConfirmChooseFlight
        show={showConfirmModal}
        cabinClass={cabin}
        adults={adults}
        children={children}
        close={() => setShowConfirmModal(false)}
        confirm={handleConfirm}
        type={type}
      />
      <main className='FlightsPage page px-16'>
        <div className='w-8/12'>
          <MainSearch
            searchResults
            arrivalTerminal={arrivalTerminal}
            departureTerminal={departureTerminal}
            cabin={cabin}
            departureDate={departureDate ? new Date(departureDate) : null}
            arrivalDate={arrivalDate ? new Date(arrivalDate) : null}
            adults={adults}
            children={children}
          />
        </div>
        <p className='font-nunito text-lg leading-6 text-grey-primary font-semibold mt-12 mb-4'>
          Choose your{' '}
          <span className='text-primary'>
            {type === 'departure' ? 'departing ' : 'returning '}
          </span>
          flight
        </p>
        <section className='flex'>
          <div className='w-8/12'>
            {!isLoading ? (
              <div
                className={`w-full rounded-xl border-1 border-pale-purple p-4 ${
                  showAllFlights ? '' : 'max-h-456 overflow-y-scroll'
                }`}
              >
                {flights.map(flight => (
                  <FlightCard
                    onClick={() => {
                      setChosenFlight(flight._id);
                      setShowConfirmModal(true);
                    }}
                    key={flight._id}
                    id={flight._id}
                    flightNumber={flight.flightNumber}
                    arrivalTime={flight.arrivalTime}
                    departureTime={flight.departureTime}
                    businessSeats={flight.businessSeats}
                    economySeats={flight.economySeats}
                    price={200}
                    departureTerminal={flight.departureTerminal}
                    arrivalTerminal={flight.arrivalTerminal}
                  />
                ))}
              </div>
            ) : (
              <div className='w-full rounded-xl border-1 border-pale-purple min-h-456 flex justify-center items-center'>
                <Loading />
              </div>
            )}
            {!showAllFlights && (
              <div className='w-full flex justify-end mt-4'>
                <div>
                  <Button
                    outline
                    text='Show all flights'
                    onClick={() => setShowAllFlights(b => !b)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className='w-4/12 flex flex-col'>
            <FlightSummaryCard />
          </div>
        </section>
      </main>
    </>
  );
};

export default FlightsPage;
