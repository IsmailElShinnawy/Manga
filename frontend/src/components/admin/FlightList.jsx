import React, { useCallback, useEffect, useState } from 'react';
import { CheckBox, Search } from '../shared/UIKit/Inputs';
import { useHttpClient } from '../../hooks/http-hook';
import moment from 'moment';
import FilterFlights from './FilterFlights';
import { ReactComponent as FilterIcon } from '../../assets/icons/IconFilter.svg';
import Modal from '../shared/Modal/Modal';
import AddFlightModalContent from './AddFlightModalContent';
import { Button } from '../shared/UIKit/Buttons';

const FlightList = () => {
  // fetching flights
  const { isLoading, sendRequest } = useHttpClient();
  const [flights, setFlights] = useState([]);

  // adding flight
  const [showAddModal, setShowAddModal] = useState(false);

  // filtering
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [options, setOptions] = useState({});

  // updating flight
  const [isEditing, setIsEditing] = useState(false);
  const [flightToEdit, setFlightToEdit] = useState({});

  // deleting flight
  const { isLoading: isDeleting, sendRequest: sendDeleteRequest } = useHttpClient();
  const [flightsToDelete, setFlightsToDelete] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchAndSetFlights = async () => {
      try {
        const response = await sendRequest('/flight');
        if (response && response.data) setFlights(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAndSetFlights();
  }, [sendRequest, setFlights]);

  const deleteFlights = async () => {
    try {
      const response = await sendDeleteRequest(
        '/flight',
        'DELETE',
        {
          flights: flightsToDelete,
        },
        { 'Content-Type': 'application/json' }
      );
      setShowConfirmDelete(false);
      if (response) {
        flightsToDelete.forEach(flightId => {
          setFlights(flights => flights.filter(f => f._id !== flightId));
        });
      }
      setFlightsToDelete([]);
    } catch (err) {
      console.log(err);
    }
  };

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

  const addFlightToDelete = id => {
    setFlightsToDelete(oldFlightsToDelete => [...oldFlightsToDelete, id]);
  };

  const removeFlightToDelete = id => {
    setFlightsToDelete(oldFlightsToDelete =>
      oldFlightsToDelete.filter(flight => flight !== id)
    );
  };

  const checkboxInputHandler = useCallback((id, checked) => {
    if (checked) addFlightToDelete(id);
    else removeFlightToDelete(id);
  }, []);

  const addFlight = flight => {
    setFlights(oldFlights => [...oldFlights, flight]);
  };

  const updateFlight = flight => {
    setFlights(oldFlights => [...oldFlights.filter(f => f._id !== flight._id), flight]);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Modal show={showAddModal} close={() => setShowAddModal(false)}>
        <AddFlightModalContent
          onResponse={flight => {
            addFlight(flight);
            setShowAddModal(false);
          }}
        />
      </Modal>
      <Modal close={() => setIsEditing(false)} show={isEditing}>
        <AddFlightModalContent
          edit={true}
          flight={flightToEdit}
          onResponse={flight => {
            updateFlight(flight);
            setIsEditing(false);
          }}
        />
      </Modal>
      <Modal show={showConfirmDelete} close={() => setShowConfirmDelete(false)} sm>
        <div className='w-full h-full flex flex-col p-6'>
          <h1 className='text-2xl pb-2'>Are you sure?</h1>
          <h2 className='text-lg pt-2 mb-16'>
            You are about to delete {flightsToDelete.length} flight(s). This action is
            irreversibile!
          </h2>
          <div className='flex justify-end'>
            <div className='mr-2'>
              <Button
                onClick={() => setShowConfirmDelete(false)}
                text='Cancel'
                disabled={isDeleting}
              />
            </div>
            <div>
              <Button
                danger
                loadingText='Deleting...'
                text='Confirm Delete'
                isLoading={isDeleting}
                onClick={deleteFlights}
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className='w-max ml-auto mr-8'>
        <Button text='Add flight' lg onClick={() => setShowAddModal(true)} />
      </div>
      <div className='w-full p-4 bg-white rounded-xl shadow-xl'>
        <div className='flex items-center'>
          <h1>All flights</h1>
          <div className='ml-4'>
            <Button
              disabled={flightsToDelete.length === 0}
              text='Delete Selected'
              danger
              onClick={() => setShowConfirmDelete(true)}
            />
          </div>
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
              <th />
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
                  onClick={event => {
                    if (
                      !event.target.classList.contains('checkbox-div') &&
                      !event.target.classList.contains('checkbox')
                    ) {
                      setFlightToEdit(flight);
                      setIsEditing(true);
                    }
                  }}
                >
                  <td>
                    <CheckBox id={flight._id} onInput={checkboxInputHandler} danger />
                  </td>
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
