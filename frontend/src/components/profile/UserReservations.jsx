import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { Link } from 'react-router-dom';
import FlightCard from '../flights/FlightCard';
import { Button } from '../shared/UIKit/Buttons';
import Loading from '../shared/UIKit/Loading';
import Modal from '../shared/Modal/Modal';
import { ReactComponent as IconEdit } from '../../assets/icons/IconEdit.svg';
import { ReactComponent as IconRefresh } from '../../assets/icons/IconRefresh.svg';
import { ReactComponent as IconMail } from '../../assets/icons/IconMail.svg';
import NoResults from '../../assets/images/no-results.png';
import EditReservationSeatsModal from './EditReservationSeatsModal';
import UpdateFlightModal from './UpdateFlightModal';

const UserReservations = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const { sendRequest: deleteRequest, isLoading: isDeleting } = useHttpClient();
  const [reservations, setReservations] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toBeCancelled, setToBeCancelled] = useState();
  const [editing, setEditing] = useState(null);
  const [updating, setUpdating] = useState(null);

  const handleEdit = (id, type) => {
    setEditing({
      id,
      type,
    });
  };

  const handleUpdate = (id, type, oldPrice, numberOfSeats, cabin) => {
    setUpdating({
      id,
      type,
      oldPrice,
      numberOfSeats,
      cabin,
    });
  };

  const handleCloseEdit = () => {
    setEditing(null);
  };

  const handleCloseUpdate = () => {
    setUpdating(null);
  };

  const handleSubmit = async rid => {
    if (!rid) return;
    try {
      await sendRequest(`/reservation/email/${rid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const cancel = async id => {
    try {
      const response = await deleteRequest(`/reservation/${id}`, 'DELETE');
      if (response) {
        setReservations(res => res.filter(r => r._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getReservations = async () => {
      try {
        const response = await sendRequest('/reservation');
        if (response && response.data) {
          setReservations(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getReservations();
  }, [sendRequest]);

  if (isLoading) {
    return (
      <div className='w-full flex justify-center items-center'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Modal show={showConfirmModal} close={() => setShowConfirmModal(false)} sm>
        <h1 className='font-nunito text-grey-primary font-bold text-2xl leading-8 mr-auto mb-4'>
          Are you sure you want to cancel?
        </h1>
        <p className='font-nunito text-lg mb-4'>This action is irreversible</p>
        <div className='flex justify-end'>
          <div className='mr-1'>
            <Button
              text='Close'
              outline
              onClick={() => {
                setToBeCancelled(undefined);
                setShowConfirmModal(false);
              }}
            />
          </div>
          <div>
            <Button
              text='Confirm'
              onClick={() => {
                cancel(toBeCancelled);
                setShowConfirmModal(false);
                setToBeCancelled(undefined);
              }}
            />
          </div>
        </div>
      </Modal>
      <EditReservationSeatsModal close={handleCloseEdit} editing={editing} />
      <UpdateFlightModal close={handleCloseUpdate} updating={updating} />
      <div>
        {reservations?.length > 0 ? (
          reservations?.map(reservation => {
            return (
              <div key={reservation._id}>
                <div className='flex items-center'>
                  <h2 className='font-nunito font-semibold text-lg leading-6 text-grey-primary mb-4 mr-auto'>
                    Order #{reservation._id.toUpperCase()}{' '}
                    <Link
                      to={`/itinerary/${reservation._id}`}
                      className='text-primary text-base leading-5 font-bold'
                    >
                      View summary
                    </Link>
                  </h2>
                  <div className='px-2 mr-2'>
                    <Button
                      disabled={isLoading}
                      onClick={() => handleSubmit(reservation?._id)}
                      icon={<IconMail fill='#605DEC' />}
                    />
                  </div>
                  <div>
                    <Button
                      text='Cancel'
                      onClick={() => {
                        setToBeCancelled(reservation._id);
                        setShowConfirmModal(true);
                      }}
                      isLoading={isDeleting}
                      loadingText='Cancelling...'
                      disabled={isDeleting}
                    />
                  </div>
                </div>
                <div className='mb-4 flex'>
                  <FlightCard
                    arrivalTerminal={reservation?.departureFlight.arrivalTerminal}
                    arrivalTime={reservation?.departureFlight.arrivalTime}
                    departureTerminal={reservation?.departureFlight.departureTerminal}
                    departureTime={reservation?.departureFlight.departureTime}
                    flightNumber={reservation?.departureFlight.flightNumber}
                    id={reservation?.departureFlight._id}
                    noHover
                    noSeats
                    price={reservation?.departureFlight.ticketPrice}
                    baggageAllowance={reservation?.departureFlight.baggageAllowance}
                  />
                  <div className='flex items-center'>
                    <Button
                      icon={<IconEdit fill='#605DEC' />}
                      onClick={() => handleEdit(reservation._id, 'departure')}
                    />
                  </div>
                  <div className='flex items-center ml-2'>
                    <Button
                      icon={<IconRefresh fill='#605DEC' />}
                      onClick={() =>
                        handleUpdate(
                          reservation._id,
                          'departure',
                          reservation?.departureFlight.ticketPrice,
                          reservation?.departureFlightSeats.length,
                          reservation?.departureFlightCabin
                        )
                      }
                    />
                  </div>
                </div>
                <div className='mb-10 flex'>
                  <FlightCard
                    arrivalTerminal={reservation?.returnFlight.arrivalTerminal}
                    arrivalTime={reservation?.returnFlight.arrivalTime}
                    departureTerminal={reservation?.returnFlight.departureTerminal}
                    departureTime={reservation?.returnFlight.departureTime}
                    flightNumber={reservation?.returnFlight.flightNumber}
                    id={reservation?.returnFlight._id}
                    noHover
                    noSeats
                    price={reservation?.returnFlight.ticketPrice}
                    baggageAllowance={reservation?.returnFlight.baggageAllowance}
                  />
                  <div className='flex items-center'>
                    <Button
                      icon={<IconEdit fill='#605DEC' />}
                      onClick={() => handleEdit(reservation._id, 'return')}
                    />
                  </div>
                  <div className='flex items-center ml-2'>
                    <Button
                      icon={<IconRefresh fill='#605DEC' />}
                      onClick={() =>
                        handleUpdate(
                          reservation._id,
                          'return',
                          reservation?.returnFlight.ticketPrice,
                          reservation?.returnFlightSeats.length,
                          reservation?.returnFlightCabin
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className='w-full flex flex-col opacity-50 justify-center items-center'>
            <img src={NoResults} width='25%' height='25%' alt='No reservations' />
            <p>It seams that you did not reserve any flights yet!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserReservations;
