import React from 'react';
import moment from 'moment';

import { CalendarInput, TimeInput } from '../shared/UIKit/Inputs';

import { ReactComponent as XIcon } from '../../assets/icons/IconX.svg';

const FilterFlights = ({
  addOption,
  clearOption,
  options: {
    fromDepartureDate = null,
    toDepartureDate = null,
    fromArrivalDate = null,
    toArrivalDate = null,
    fromDepartureTime = null,
    toDepartureTime = null,
    fromArrivalTime = null,
    toArrivalTime = null,
  },
}) => {
  return (
    <>
      <h2>Filter</h2>
      <div className='flex'>
        <div className='w-1/2'>
          <h3>Departure Date:</h3>
          <div className='flex'>
            <div className='w-1/2 p-2'>
              <div>
                <CalendarInput
                  id='fromDepartureDate'
                  label='From:'
                  onChange={date => {
                    addOption('fromDepartureDate', moment(date).toDate());
                  }}
                  value={fromDepartureDate}
                />
                <p
                  className='flex items-center hover:cursor-pointer shrink mt-2'
                  onClick={() => clearOption('fromDepartureDate')}
                >
                  <XIcon fill='red' />
                  <span className='text-red-500'>Clear Selection</span>
                </p>
              </div>
              <div>
                <TimeInput
                  label='From:'
                  onChange={time => addOption('fromDepartureTime', time)}
                  value={fromDepartureTime}
                />
                <p
                  className='flex items-center hover:cursor-pointer shrink mt-2'
                  onClick={() => clearOption('fromDepartureTime')}
                >
                  <XIcon fill='red' />
                  <span className='text-red-500'>Clear Selection</span>
                </p>
              </div>
            </div>
            <div className='w-1/2 p-2'>
              <div>
                <CalendarInput
                  id='toDepartureDate'
                  label='To:'
                  onChange={date => {
                    addOption('toDepartureDate', moment(date).toDate());
                  }}
                  value={toDepartureDate}
                />
                <p
                  className='flex items-center hover:cursor-pointer shrink mt-2'
                  onClick={() => clearOption('toDepartureDate')}
                >
                  <XIcon fill='red' />
                  <span className='text-red-500'>Clear Selection</span>
                </p>
              </div>
              <div>
                <TimeInput
                  label='To:'
                  onChange={time => addOption('toDepartureTime', time)}
                  value={toDepartureTime}
                />
                <p
                  className='flex items-center hover:cursor-pointer shrink mt-2'
                  onClick={() => clearOption('toDepartureTime')}
                >
                  <XIcon fill='red' />
                  <span className='text-red-500'>Clear Selection</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <h3>Arrival Date:</h3>
          <div className='flex'>
            <div className='w-1/2 p-2'>
              <div>
                <CalendarInput
                  id='fromArrivalDate'
                  label='From:'
                  onChange={date => {
                    addOption('fromArrivalDate', moment(date).toDate());
                  }}
                  value={fromArrivalDate}
                />
                <p
                  className='flex items-center hover:cursor-pointer shrink mt-2'
                  onClick={() => clearOption('fromArrivalDate')}
                >
                  <XIcon fill='red' />
                  <span className='text-red-500'>Clear Selection</span>
                </p>
              </div>
              <div>
                <TimeInput
                  label='From:'
                  onChange={time => addOption('fromArrivalTime', time)}
                  value={fromArrivalTime}
                />
                <p
                  className='flex items-center hover:cursor-pointer shrink mt-2'
                  onClick={() => clearOption('fromArrivalTime')}
                >
                  <XIcon fill='red' />
                  <span className='text-red-500'>Clear Selection</span>
                </p>
              </div>
            </div>
            <div className='w-1/2 p-2'>
              <div>
                <CalendarInput
                  id='toArrivalDate'
                  label='To:'
                  onChange={date => {
                    addOption('toArrivalDate', moment(date).toDate());
                  }}
                  value={toArrivalDate}
                />
                <p
                  className='flex items-center hover:cursor-pointer shrink mt-2'
                  onClick={() => clearOption('toArrivalDate')}
                >
                  <XIcon fill='red' />
                  <span className='text-red-500'>Clear Selection</span>
                </p>
              </div>
              <div>
                <TimeInput
                  label='To:'
                  onChange={time => addOption('toArrivalTime', time)}
                  value={toArrivalTime}
                />
                <p
                  className='flex items-center hover:cursor-pointer shrink mt-2'
                  onClick={() => clearOption('toArrivalTime')}
                >
                  <XIcon fill='red' />
                  <span className='text-red-500'>Clear Selection</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterFlights;
