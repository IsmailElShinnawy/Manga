import React, { useCallback, useEffect, useState } from 'react';
import { Search } from '../shared/UIKit/Inputs';
import { useHttpClient } from '../../hooks/http-hook';
import moment from 'moment';
import FilterFlights from './FilterFlights';
import { ReactComponent as FilterIcon } from '../../assets/icons/IconFilter.svg';
import Modal from '../shared/Modal/Modal';
import AddFlightModalContent from './AddFlightModalContent';

const FlightList = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [flights, setFlights] = useState([]);
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [options, setOptions] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [flightToEdit, setFlightToEdit] = useState({});

  useEffect(() => {
    const fetchAndSetFlights = async () => {
      try {
        const response = await sendRequest('/flight');
        if (response && response.data) {
          setFlights(response.data);
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAndSetFlights();
  }, [sendRequest, setFlights]);

  const onResponse = useCallback(flights => {
    setFlights(flights);
  }, []);

  const addOption = (id, value) => {
    setOptions(oldOptions => ({
      ...oldOptions,
      [id]: value,
    }));
  };

  const clearOption = id => {
    setOptions(oldOptions => ({
      ...oldOptions,
      [id]: null,
    }));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Modal close={() => setIsEditing(false)} show={isEditing}>
        <AddFlightModalContent edit={true} flight={flightToEdit} />
      </Modal>
      <div className='w-full p-4 bg-white rounded-xl shadow-xl'>
        <div className='flex items-center'>
          <h1>All flights</h1>
          <FilterIcon
            className='ml-auto hover:cursor-pointer hover:bg-gray-300 rounded-md'
            fill='#ffffff'
            stroke='#0000ff'
            width='32px'
            height='32px'
            onClick={() => setIsFilterOpened(isFilterOpened => !isFilterOpened)}
          />
          <div className='w-3/12'>
            <Search
              placeholder='Search using flight number or airport terminals...'
              url='/flight/search'
              onResponse={onResponse}
              options={options}
            />
          </div>
        </div>
        {isFilterOpened && (
          <div className='p-8'>
            <FilterFlights
              addOption={addOption}
              clearOption={clearOption}
              options={options}
            />
          </div>
        )}
        <table className='w-full'>
          <thead style={{ background: '#fafafa' }}>
            <tr>
              <th scope='col' className='p-2 pl-0 text-left'>
                Flight Number
              </th>
              <th scope='col' className='p-2 pl-0 text-left'>
                Departure Time
              </th>
              <th scope='col' className='p-2 pl-0 text-left'>
                Arrival Time
              </th>
              <th scope='col' className='p-2 pl-0 text-left'>
                Departure Terminal
              </th>
              <th scope='col' className='p-2 pl-0 text-left'>
                Arrival Terminal
              </th>
              <th scope='col' className='p-2 pl-0 text-left'>
                Economy Seats
              </th>
              <th scope='col' className='p-2 pl-0 text-left'>
                Busines Seats
              </th>
            </tr>
          </thead>
          <tbody className='divide-y'>
            {flights.map(flight => {
              return (
                <tr
                  key={flight._id}
                  className='hover:bg-blue-500 hover:bg-opacity-10 hover:cursor-pointer'
                  onClick={() => {
                    setFlightToEdit(flight);
                    setIsEditing(true);
                  }}
                >
                  <td className='py-2'>{flight.flightNumber}</td>
                  <td className='py-2'>
                    {moment(flight.departureTime).format('DD-MMM-YYYY hh:mm A')}
                  </td>
                  <td className='py-2'>
                    {moment(flight.arrivalTime).format('DD-MMM-YYYY hh:mm A')}
                  </td>
                  <td className='py-2'>{flight.departureTerminal}</td>
                  <td className='py-2'>{flight.arrivalTerminal}</td>
                  <td className='py-2'>{flight.economySeats}</td>
                  <td className='py-2'>{flight.businessSeats}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FlightList;
