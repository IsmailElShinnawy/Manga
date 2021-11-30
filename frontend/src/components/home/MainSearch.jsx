import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { Button } from '../shared/UIKit/Buttons';
import Backdrop from '../shared/Backdrop/Backdrop';
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

const MainSearch = ({
  searchResults,
  departureTerminal,
  arrivalTerminal,
  departureDate,
  arrivalDate,
  adults,
  children,
  cabin,
}) => {
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showArrivalDatePicker, setShowArrivalDatePicker] = useState(false);
  const [showPassengersPicker, setShowPassengersPicker] = useState(false);
  const [showCabinPicker, setShowCabinPicker] = useState(false);

  const history = useHistory();

  const { formState, inputHandler } = useForm(
    {
      departureTerminal: { value: departureTerminal || '', isValid: false },
      arrivalTerminal: { value: arrivalTerminal || '', isValid: false },
      departureDate: { value: departureDate || '', isValid: false },
      arrivalDate: { value: arrivalDate || '', isValid: false },
      adults: { value: adults || 0, isValid: false },
      children: { value: children || 0, isValid: false },
      cabin: {
        value: cabin ? cabinOptions.find(c => c.code === cabin) || '' : '',
        isValid: false,
      },
    },
    false
  );

  const searchHandler = async event => {
    event.preventDefault();
    const {
      departureTerminal,
      arrivalTerminal,
      departureDate,
      arrivalDate,
      adults,
      children,
      cabin,
    } = formState.inputs;

    try {
      const queries = [];
      queries.push(
        departureTerminal.value
          ? `departureTerminal=${encodeURIComponent(departureTerminal.value)}`
          : '',
        arrivalTerminal.value
          ? `arrivalTerminal=${encodeURIComponent(arrivalTerminal.value)}`
          : '',
        departureDate.value
          ? `departureDate=${encodeURIComponent(departureDate.value.toISOString())}`
          : '',
        arrivalDate.value
          ? `arrivalDate=${encodeURIComponent(arrivalDate.value.toISOString())}`
          : '',
        adults.value > 0 ? `adults=${encodeURIComponent(adults.value)}` : '',
        children.value > 0 ? `children=${encodeURIComponent(children.value)}` : '',
        cabin.value ? `cabin=${encodeURIComponent(cabin.value.code)}` : ''
      );
      let url = '/flights?type=departure&';
      queries.forEach(query => {
        if (query !== '') url += query + '&';
      });
      const slicedUrl = url.slice(0, url.length - 1);
      history.push(slicedUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div
        className={`MainSearch flex w-full bg-white rounded-4 border-1 border-grey-ternary ${
          searchResults ? 'shadow-results-search' : 'shadow-main-search'
        }`}
      >
        <div className='w-1/7 py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4'>
          <IconAirplaneDeparture />
          <input
            type='text'
            placeholder='From where?'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none min-w-0'
            value={formState.inputs.departureTerminal.value}
            onChange={e => inputHandler('departureTerminal', e.target.value, true)}
          />
        </div>
        <div className='w-1/7 py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4'>
          <IconAirplaneLanding />
          <input
            type='text'
            placeholder='To where?'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none min-w-0'
            value={formState.inputs.arrivalTerminal.value}
            onChange={e => inputHandler('arrivalTerminal', e.target.value, true)}
          />
        </div>
        <div className='w-1/7 py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4 relative'>
          <IconCalendar />
          <input
            type='text'
            placeholder='Depart Date'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none min-w-0'
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
                <div className='flex'>
                  <div className='mt-5 mr-2'>
                    <Button
                      type='button'
                      text='Done'
                      onClick={() => setShowDepartureDatePicker(false)}
                    />
                  </div>
                  <div className='mt-5'>
                    <Button
                      type='button'
                      outline
                      text='Clear Selection'
                      onClick={() => inputHandler('departureDate', '', true)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className='w-1/7 py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4 relative'>
          <IconCalendar />
          <input
            type='text'
            placeholder='Arrival Date'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none min-w-0'
            onFocus={() => setShowArrivalDatePicker(true)}
            value={
              formState.inputs.arrivalDate.value
                ? moment(formState.inputs.arrivalDate.value).format('MMM DD YYYY')
                : ''
            }
            readOnly
          />
          {showArrivalDatePicker && (
            <>
              <Backdrop hide close={() => setShowArrivalDatePicker(false)} />
              <div className='absolute -top-10 -left-1 z-10 bg-white px-5 py-8 rounded-xl border-1 border-grey-secondary'>
                <Calendar
                  value={formState.inputs.arrivalDate.value || null}
                  onChange={date => inputHandler('arrivalDate', date, true)}
                />
                <div className='flex'>
                  <div className='mt-5 mr-2'>
                    <Button
                      type='button'
                      text='Done'
                      onClick={() => setShowArrivalDatePicker(false)}
                    />
                  </div>
                  <div className='mt-5'>
                    <Button
                      outline
                      type='button'
                      text='Clear Selection'
                      onClick={() => inputHandler('arrivalDate', '', true)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className='w-1/7 py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4 relative'>
          <IconPerson />
          <input
            type='text'
            placeholder='How many?'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none min-w-0'
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
        <div className='w-1/7 py-2 px-3 flex items-center font-nunito focus-within:ring-2 focus-within:ring-primary rounded-4 relative'>
          <IconDiamond width='24px' height='24px' />
          <input
            type='text'
            placeholder='Cabin?'
            className='placeholder-shown:text-grey-secondary ml-4 flex-grow outline-none min-w-0'
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
        <div className='w-1/7'>
          <Button text='Search' type='submit' onClick={searchHandler} />
        </div>
      </div>
      {/* <div className='w-full flex justify-center'>
        <div className='w-1/6'>
          <Button text='Search' type='submit' onClick={searchHandler} />
        </div>
      </div> */}
    </form>
  );
};

export default MainSearch;
