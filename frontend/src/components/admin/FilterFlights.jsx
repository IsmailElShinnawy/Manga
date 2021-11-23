import moment from 'moment';
import React from 'react';
import { useAdminDashboard } from '../context/AdminDashboardContext';
import { Search, TimeInput } from '../shared/UIKit/Inputs';
import DateInput from '../shared/UIKit/Inputs/DateInput';

const FilterFlights = () => {
  const { filterOptions, addOption, removeOption, setFlights } = useAdminDashboard();

  const {
    fromDepartureDate = '',
    toDepartureDate = '',
    fromArrivalDate = '',
    toArrivalDate = '',
    fromDepartureTime = '',
    toDepartureTime = '',
    fromArrivalTime = '',
    toArrivalTime = '',
  } = filterOptions;

  return (
    <div className='flex flex-col bg-white rounded-xl shadow-xl p-2'>
      <Search
        placeholder='Search for a flight using flight number or airport terminals'
        options={filterOptions}
        url='/flight/search'
        onResponse={setFlights}
      />
      <div className='grid grid-cols-2'>
        <div className='mb-2'>
          <DateInput
            id='fromDepartureDate'
            label='From Departure Date:'
            onChange={event =>
              addOption('fromDepartureDate', moment(event.target.value).toDate())
            }
            value={
              !!fromDepartureDate ? moment(fromDepartureDate).format('yyyy-MM-DD') : ''
            }
            clear={() => removeOption('fromDepartureDate')}
          />
        </div>
        <div className='mb-2'>
          <TimeInput
            label='From Departure Time:'
            value={fromDepartureTime}
            onChange={time => addOption('fromDepartureTime', time)}
            clear={() => removeOption('fromDepartureTime')}
          />
        </div>
        <div className='mb-2'>
          <DateInput
            id='toDepartureDate'
            label='To Departure Date:'
            onChange={event =>
              addOption('toDepartureDate', moment(event.target.value).toDate())
            }
            value={!!toDepartureDate ? moment(toDepartureDate).format('yyyy-MM-DD') : ''}
            clear={() => removeOption('toDepartureDate')}
          />
        </div>
        <div className='mb-2'>
          <TimeInput
            label='To Departure Time:'
            value={toDepartureTime}
            onChange={time => addOption('toDepartureTime', time)}
            clear={() => removeOption('toDepartureTime')}
          />
        </div>
        <div className='mb-2'>
          <DateInput
            id='fromArrivalDate'
            label='From Arrival Date:'
            onChange={event =>
              addOption('fromArrivalDate', moment(event.target.value).toDate())
            }
            value={!!fromArrivalDate ? moment(fromArrivalDate).format('yyyy-MM-DD') : ''}
            clear={() => removeOption('fromArrivalDate')}
          />
        </div>
        <div className='mb-2'>
          <TimeInput
            label='From Arrival Time:'
            value={fromArrivalTime}
            onChange={time => addOption('fromArrivalTime', time)}
            clear={() => removeOption('fromArrivalTime')}
          />
        </div>
        <div className='mb-2'>
          <DateInput
            id='toArrivalDate'
            label='To Arrival Date:'
            onChange={event =>
              addOption('toArrivalDate', moment(event.target.value).toDate())
            }
            value={!!toArrivalDate ? moment(toArrivalDate).format('yyyy-MM-DD') : ''}
            clear={() => removeOption('toArrivalDate')}
          />
        </div>
        <div className='mb-2'>
          <TimeInput
            label='To Arrival Time:'
            value={toArrivalTime}
            onChange={time => addOption('toArrivalTime', time)}
            clear={() => removeOption('toArrivalTime')}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterFlights;
