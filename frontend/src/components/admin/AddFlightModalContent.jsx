import React from 'react';
import moment from 'moment';

import { useForm } from '../../hooks/form-hook';
import { ReactComponent as AirplaneIcon } from '../../assets/icons/IconAirplane.svg';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from '../../utils/validators';
import { Input, CalendarInput, TimeInput } from '../shared/UIKit/Inputs';
import { Button } from '../shared/UIKit/Buttons';
import { useHttpClient } from '../../hooks/http-hook';

const AddFlightModalContent = () => {
  const { formState, inputHandler } = useForm(
    {
      flightNumber: { value: '', isValid: false },
      departureDate: { value: moment(), isValid: true },
      arrivalDate: { value: moment(), isValid: true },
      arrivalTime: { value: '12:00', isValid: true },
      departureTime: { value: '12:00', isValid: true },
      numberOfEconomy: { value: 0, isValid: false },
      numberOfBusiness: { value: 0, isValid: false },
      departureTerminal: { value: '', isValid: false },
      arrivalTerminal: { value: '', isValid: false },
    },
    false
  );
  const { sendRequest, error, isLoading } = useHttpClient();
  const handleAddFlight = async event => {
    event.preventDefault();
    try {
      // console.log(formState.inputs);
      const flightNumber = formState.inputs.flightNumber.value;
      const departureDate = formState.inputs.departureDate.value;
      const departureTime = formState.inputs.departureTime.value;
      const arrivalDate = formState.inputs.arrivalDate.value;
      const arrivalTime = formState.inputs.arrivalTime.value;
      const extractedDepartureDate = departureDate.format('YYYY-MM-DD');
      const extractedArrivalDate = arrivalDate.format('YYYY-MM-DD');
      const departureDateTime = moment(`${extractedDepartureDate} ${departureTime}`);
      const arrivalDateTime = moment(`${extractedArrivalDate} ${arrivalTime}`);
      const numberOfEconomy = formState.inputs.numberOfEconomy.value;
      const numberOfBusiness = formState.inputs.numberOfBusiness.value;
      const departureTerminal = formState.inputs.departureTerminal.value;
      const arrivalTerminal = formState.inputs.arrivalTerminal.value;
      const response = await sendRequest(
        '/flight',
        'POST',
        {
          flightNumber,
          departureTime: departureDateTime,
          arrivalTime: arrivalDateTime,
          economySeats: numberOfEconomy,
          businessSeats: numberOfBusiness,
          departureTerminal,
          arrivalTerminal,
        },
        { 'Content-Type': 'application/json' }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className='flex items-center bg-button-background-primary rounded-t-lg py-4'>
        <AirplaneIcon
          fill='#ffffff'
          stroke='#ffffff'
          width='48px'
          height='48px'
          className='ml-2 mr-2'
          outline='none'
        />
        <h2 className='text-white text-3xl'>New Flight</h2>
      </div>
      <div className='w-full p-4'>
        <form onSubmit={handleAddFlight}>
          <div className='w-1/3'>
            <Input
              id='flightNumber'
              label='Flight Number'
              validators={[VALIDATOR_REQUIRE()]}
              errorMsg='Please enter a flight number'
              onInput={inputHandler}
              value={formState.inputs.flightNumber.value}
              isValid={formState.inputs.flightNumber.isValid}
              placeholder='ex: 6182'
            />
          </div>
          <div className='w-2/3 flex'>
            <div className='w-1/2'>
              <div className='max-w-max'>
                <Input
                  id='departureTerminal'
                  isValid={formState.inputs.departureTerminal.isValid}
                  label='Departure Terminal'
                  onInput={inputHandler}
                  placeholder='ex: EGY'
                  validators={[VALIDATOR_REQUIRE()]}
                  errorMsg='required'
                  value={formState.inputs.departureTerminal.value}
                />
              </div>
            </div>
            <div className='w-1/2'>
              <div className='max-w-max'>
                <Input
                  id='arrivalTerminal'
                  isValid={formState.inputs.arrivalTerminal.isValid}
                  label='Arrival Terminal'
                  onInput={inputHandler}
                  placeholder='ex: JAP'
                  validators={[VALIDATOR_REQUIRE()]}
                  errorMsg='required'
                  value={formState.inputs.arrivalTerminal.value}
                />
              </div>
            </div>
          </div>
          <div className='w-2/3 flex'>
            <div className='w-1/2 pr-4'>
              <CalendarInput
                id='departureDate'
                label='Departure Date'
                minDate={moment().toDate()}
                value={formState.inputs.departureDate.value.toDate()}
                onChange={date => inputHandler('departureDate', moment(date), true)}
              />
              <div className='mt-4'>
                <TimeInput
                  label='Departure Time'
                  value={formState.inputs.departureTime.value}
                  onChange={time => inputHandler('departureTime', time, true)}
                />
              </div>
            </div>
            <div className='w-1/2 pl-4'>
              <CalendarInput
                id='arrivalDate'
                label='Arrival Date'
                minDate={formState.inputs.departureDate.value.toDate()}
                value={formState.inputs.arrivalDate.value.toDate()}
                onChange={date => inputHandler('arrivalDate', moment(date), true)}
              />
              <div className='mt-4'>
                <TimeInput
                  label='Arrival Time'
                  value={formState.inputs.arrivalTime.value}
                  onChange={time => inputHandler('arrivalTime', time, true)}
                />
              </div>
            </div>
          </div>
          <div className='w-2/3 flex'>
            <div className='w-1/2 pr-4'>
              <div className='max-w-max'>
                <Input
                  id='numberOfEconomy'
                  value={formState.inputs.numberOfEconomy.value}
                  label='Number of economy seats'
                  validators={[VALIDATOR_MIN(1)]}
                  onInput={inputHandler}
                  isValid={formState.inputs.numberOfEconomy.isValid}
                  errorMsg='Please enter 1 or more'
                />
              </div>
            </div>
            <div className='w-1/2 pl-4'>
              <div className='max-w-max'>
                <Input
                  id='numberOfBusiness'
                  value={formState.inputs.numberOfBusiness.value}
                  label='Number of business seats'
                  validators={[VALIDATOR_MIN(1)]}
                  onInput={inputHandler}
                  isValid={formState.inputs.numberOfBusiness.isValid}
                  errorMsg='Please enter 1 or more'
                />
              </div>
            </div>
          </div>
          <div className='w-1/3'>
            <Button
              text='Add'
              disabled={!formState.isValid}
              type='submit'
              onClick={handleAddFlight}
              isLoading={isLoading}
              loadingText='Adding...'
            />
          </div>
          {error && (
            <p className='text-red-500'>
              Could not complete your request: {error.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default AddFlightModalContent;
