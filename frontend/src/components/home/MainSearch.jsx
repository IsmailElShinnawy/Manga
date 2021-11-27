import React, { useState } from 'react';
import moment from 'moment';

import { Button } from '../shared/UIKit/Buttons';
import Backdrop from '../shared/Backdrop/Backdrop';
import { useHttpClient } from '../../hooks/http-hook';
import { useForm } from '../../hooks/form-hook';
import Calendar from 'react-calendar';
import { cabinCodes } from '../../config/flight.config';

import { ReactComponent as IconAirplaneDeparture } from '../../assets/icons/IconPlaneDeparture.svg';
import { ReactComponent as IconAirplaneLanding } from '../../assets/icons/IconPlaneLanding.svg';
import { ReactComponent as IconCalendar } from '../../assets/icons/IconCalendar.svg';
import { ReactComponent as IconPerson } from '../../assets/icons/IconPerson.svg';
import { ReactComponent as IconDiamond } from '../../assets/icons/IconDiamond.svg';
import { ReactComponent as IconPlus } from '../../assets/icons/IconPlus.svg';
import { ReactComponent as IconMinus } from '../../assets/icons/IconMinus.svg';

import './MainSearch.scss';

const cabinOptions = [
  {
    name: 'Business Class',
    code: cabinCodes.businessClass,
  },
  {
    name: 'Economy Class',
    code: cabinCodes.economyClass,
  },
];

const MainSearch = () => {
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [showPassengersPicker, setShowPassengersPicker] = useState(false);
  const [showCabinPicker, setShowCabinPicker] = useState(false);

  const { sendRequest, isLoading } = useHttpClient();

  const { formState, inputHandler } = useForm(
    {
      departureTerminal: { value: '', isValid: false },
      arrivalTerminal: { value: '', isValid: false },
      departureDate: { value: '', isValid: false },
      returnDate: { value: '', isValid: false },
      adults: { value: 0, isValid: false },
      children: { value: 0, isValid: false },
      cabin: { value: '', isValid: false },
    },
    false
  );

  const searchHandler = async event => {
    event.preventDefault();
    try {
      console.log('inputs:', formState.inputs);
      // const results = await sendRequest()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className='MainSearch mb-12 grid grid-cols-6 w-full bg-white rounded-4 border-1 border-grey-ternary  shadow-main-search'>
        <div className='py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4'>
          <IconAirplaneDeparture />
          <input
            type='text'
            placeholder='From where?'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none'
            value={formState.inputs.departureTerminal.value}
            onChange={e => inputHandler('departureTerminal', e.target.value, true)}
          />
        </div>
        <div className='py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4'>
          <IconAirplaneLanding />
          <input
            type='text'
            placeholder='To where?'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none'
            value={formState.inputs.arrivalTerminal.value}
            onChange={e => inputHandler('arrivalTerminal', e.target.value, true)}
          />
        </div>
        <div className='py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4 relative'>
          <IconCalendar />
          <input
            type='text'
            placeholder='Depart Date'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none'
            onFocus={() => setShowDepartureDatePicker(true)}
            value={
              formState.inputs.departureDate.value
                ? moment(formState.inputs.departureDate.value).format('MMM DD yyyy')
                : ''
            }
            readOnly
          />
          {showDepartureDatePicker && (
            <>
              <Backdrop hide close={() => setShowDepartureDatePicker(false)} />
              <div className='absolute -top-10 -left-1 z-10 bg-white px-5 py-8 rounded-xl border-1 border-grey-secondary'>
                <Calendar
                  value={formState.inputs.departureDate.value || null}
                  onChange={date => inputHandler('departureDate', date, true)}
                />
                <div className='w-1/4 mt-5'>
                  <Button text='Done' onClick={() => setShowDepartureDatePicker(false)} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className='py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4 relative'>
          <IconCalendar />
          <input
            type='text'
            placeholder='Return Date'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none'
            onFocus={() => setShowReturnDatePicker(true)}
            value={
              formState.inputs.returnDate.value
                ? moment(formState.inputs.returnDate.value).format('MMM DD YYYY')
                : ''
            }
            readOnly
          />
          {showReturnDatePicker && (
            <>
              <Backdrop hide close={() => setShowReturnDatePicker(false)} />
              <div className='absolute -top-10 -left-1 z-10 bg-white px-5 py-8 rounded-xl border-1 border-grey-secondary'>
                <Calendar
                  value={formState.inputs.returnDate.value || null}
                  onChange={date => inputHandler('returnDate', date, true)}
                />
                <div className='w-1/4 mt-5'>
                  <Button text='Done' onClick={() => setShowReturnDatePicker(false)} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className='py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4 relative'>
          <IconPerson />
          <input
            type='text'
            placeholder='How many?'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none'
            value={
              formState.inputs.adults.value + formState.inputs.children.value > 0
                ? `${
                    formState.inputs.adults.value > 0
                      ? `${formState.inputs.adults.value} Adult(s) `
                      : ''
                  } ${
                    formState.inputs.children.value > 0
                      ? `${formState.inputs.children.value} Children`
                      : ''
                  }`
                : ''
            }
            readOnly
            onFocus={() => setShowPassengersPicker(true)}
          />
          {showPassengersPicker && (
            <>
              <Backdrop hide close={() => setShowPassengersPicker(false)} />
              <div className='absolute -top-10 -left-1 z-10 bg-white px-5 py-8 rounded-xl border-1 border-grey-secondary'>
                <div className='w-full flex items-center mb-2'>
                  <span className='font-nunito text-grey-primary leading-5 mr-auto select-none'>
                    Adults:
                  </span>
                  <IconMinus
                    className={`ml-2 mr-2 ${
                      formState.inputs.adults.value <= 0 ? 'opacity-50' : ''
                    }`}
                    onClick={() => {
                      if (formState.inputs.adults.value > 0)
                        inputHandler('adults', formState.inputs.adults.value - 1, true);
                    }}
                  />
                  <span className='font-nunito text-grey-primary w-8 mr-2 text-center select-none'>
                    {formState.inputs.adults.value}
                  </span>
                  <IconPlus
                    onClick={() =>
                      inputHandler('adults', formState.inputs.adults.value + 1, true)
                    }
                  />
                </div>
                <div className='w-full flex items-center'>
                  <span className='font-nunito text-grey-primary leading-5 mr-auto select-none'>
                    Children:
                  </span>
                  <IconMinus
                    className={`ml-2 mr-2 ${
                      formState.inputs.children.value <= 0 ? 'opacity-50' : ''
                    }`}
                    onClick={() => {
                      if (formState.inputs.children.value > 0)
                        inputHandler(
                          'children',
                          formState.inputs.children.value - 1,
                          true
                        );
                    }}
                  />
                  <span className='font-nunito text-grey-primary w-8 mr-2 text-center select-none'>
                    {formState.inputs.children.value}
                  </span>
                  <IconPlus
                    onClick={() =>
                      inputHandler('children', formState.inputs.children.value + 1, true)
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className='py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4 relative'>
          <IconDiamond width='24px' height='24px' />
          <input
            type='text'
            placeholder='Cabin?'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none'
            value={formState.inputs.cabin.value.name || ''}
            readOnly
            onFocus={() => setShowCabinPicker(true)}
          />
          {showCabinPicker && (
            <>
              <Backdrop hide close={() => setShowCabinPicker(false)} />
              <div className='flex font-nunito flex-col absolute -top-10 -left-1 z-10 bg-white px-5 py-8 rounded-xl border-1 border-grey-secondary'>
                {cabinOptions.map(cabin => (
                  <span
                    key={cabin.name}
                    className={`${
                      cabin.code === formState.inputs.cabin.value.code
                        ? 'bg-primary text-white'
                        : 'hover:bg-grey-ternary hover:bg-opacity-50'
                    } mb-2 rounded-4 hover:cursor-pointer py-2 px-3`}
                    onClick={() => inputHandler('cabin', cabin, true)}
                  >
                    {cabin.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <div className='w-1/6'>
          <Button text='Search' type='submit' onClick={searchHandler} />
        </div>
      </div>
    </form>
  );
};

export default MainSearch;
