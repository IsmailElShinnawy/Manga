import React, { useState } from 'react';

import { useForm } from '../../hooks/form-hook';
import { ReactComponent as AirplaneIcon } from '../../assets/icons/IconAirplane.svg';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from '../../utils/validators';
import { Input, CalendarInput, TimeInput } from '../shared/UIKit/Inputs';
import { Button } from '../shared/UIKit/Buttons';

const AddFlightModalContent = () => {
  const { formState, inputHandler } = useForm(
    {
      flightNumber: { value: '', isValid: false },
      departureDate: { value: new Date(), isValid: true },
      arrivalDate: { value: new Date().getTime(), isValid: true },
      arrivalTime: { value: new Date().getTime(), isValid: true },
      departureTime: { value: new Date(), isValid: true },
      numberOfEconomy: { value: 0, isValid: false },
      numberOfBusiness: { value: 0, isValid: false },
    },
    false
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleAddFlight = event => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log(formState.inputs);
      setIsLoading(false);
    }, 1000);
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
            <div className='w-1/2 pr-4'>
              <CalendarInput
                id='departureDate'
                label='Departure Date'
                minDate={new Date()}
                value={formState.inputs.departureDate.value}
                onChange={v => inputHandler('departureDate', v, true)}
              />
              <div className='mt-4'>
                <TimeInput
                  label='Departure Time'
                  value={formState.inputs.departureTime.value}
                  onChange={v => inputHandler('departureTime', v, true)}
                />
              </div>
            </div>
            <div className='w-1/2 pl-4'>
              <CalendarInput
                id='arrivalDate'
                label='Arrival Date'
                minDate={new Date()}
                value={formState.inputs.arrivalDate.value}
                onChange={v => inputHandler('arrivalDate', v, true)}
              />
              <div className='mt-4'>
                <TimeInput
                  label='Arrival Time'
                  value={formState.inputs.arrivalTime.value}
                  onChange={v => {
                    console.log(v);
                    inputHandler('arrivalTime', v, true);
                  }}
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
        </form>
      </div>
    </>
  );
};

export default AddFlightModalContent;
