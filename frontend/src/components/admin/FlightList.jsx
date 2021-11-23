import React, { useCallback, useState } from 'react';
import { CheckBox } from '../shared/UIKit/Inputs';
import { useHttpClient } from '../../hooks/http-hook';
import moment from 'moment';
import Modal from '../shared/Modal/Modal';
import AddFlightModalContent from './AddFlightModalContent';
import { Button } from '../shared/UIKit/Buttons';
import { useAdminDashboard } from '../context/AdminDashboardContext';

const FlightList = () => {
  const { flights, addFlight, removeFlight, updateFlight } = useAdminDashboard();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState();
  const [flightsToDelete, setFlightsToDelete] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const addFlightToDelete = id => {
    setFlightsToDelete(oldFlightsToDelete => [...oldFlightsToDelete, id]);
  };

  const removeFlightToDelete = id => {
    setFlightsToDelete(oldFlightsToDelete =>
      oldFlightsToDelete.filter(flightId => flightId !== id)
    );
  };

  const checkboxInputHandler = useCallback((id, checked) => {
    if (checked) addFlightToDelete(id);
    else removeFlightToDelete(id);
  }, []);

  const deleteFlights = async () => {
    try {
      const response = await sendRequest(
        '/flight',
        'DELETE',
        {
          flights: flightsToDelete,
        },
        { 'Content-Type': 'application/json' }
      );
      setShowConfirmDelete(false);
      if (response) {
        flightsToDelete.forEach(flightId => removeFlight(flightId));
      }
      setFlightsToDelete([]);
    } catch (err) {
      console.log(err);
    }
  };

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
      <Modal close={() => setShowEditModal(false)} show={showEditModal}>
        <AddFlightModalContent
          edit={true}
          flight={selectedFlight}
          onResponse={flight => {
            updateFlight(flight);
            setShowEditModal(false);
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
                disabled={isLoading}
              />
            </div>
            <div>
              <Button
                danger
                loadingText='Deleting...'
                text='Confirm Delete'
                isLoading={isLoading}
                onClick={deleteFlights}
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className='w-full p-4 bg-white rounded-xl shadow-xl'>
        <div className='flex items-center mb-2'>
          <div>
            <Button text='Add flight' lg onClick={() => setShowAddModal(true)} />
          </div>
          <div className='ml-2'>
            <Button
              lg
              disabled={flightsToDelete.length === 0}
              text='Delete Selected'
              danger
              onClick={() => setShowConfirmDelete(true)}
            />
          </div>
        </div>
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
                      setSelectedFlight(flight);
                      setShowEditModal(true);
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
