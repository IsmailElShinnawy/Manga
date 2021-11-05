import React from 'react';
import moment from 'moment';

import { CalendarInput } from '../shared/UIKit/Inputs';

const FilterFlights = ({
  addOption,
  options: {
    fromDepartureDate = null,
    toDepartureDate = null,
    fromArrivalDate = null,
    toArrivalDate = null,
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
              <CalendarInput
                id='fromDepartureDate'
                label='From:'
                onChange={date => {
                  addOption('fromDepartureDate', moment(date).toDate());
                }}
                value={fromDepartureDate}
              />
            </div>
            <div className='w-1/2 p-2'>
              <CalendarInput
                id='toDepartureDate'
                label='To:'
                onChange={date => {
                  addOption('toDepartureDate', moment(date).toDate());
                }}
                value={toDepartureDate}
              />
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <h3>Arrival Date:</h3>
          <div className='flex'>
            <div className='w-1/2 p-2'>
              <CalendarInput
                id='fromArrivalDate'
                label='From:'
                onChange={date => {
                  addOption('fromArrivalDate', moment(date).toDate());
                }}
                value={fromArrivalDate}
              />
            </div>
            <div className='w-1/2 p-2'>
              <CalendarInput
                id='toArrivalDate'
                label='To:'
                onChange={date => {
                  addOption('toArrivalDate', moment(date).toDate());
                }}
                value={toArrivalDate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterFlights;
