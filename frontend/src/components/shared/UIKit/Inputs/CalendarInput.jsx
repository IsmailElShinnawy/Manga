import React from 'react';
import Calendar from 'react-calendar';

const CalendarInput = ({ id, label, minDate, maxDate, value = new Date(), onChange }) => {
  return (
    <>
      <label htmlFor={id} className='block w-full mb-2 font-bold'>
        {label}
      </label>
      <div className='shadow-lg'>
        <Calendar
          minDate={minDate}
          maxDate={maxDate}
          value={value}
          onChange={onChange}
          className='rounded-lg w-full'
          calendarType='ISO 8601'
        />
      </div>
    </>
  );
};

export default CalendarInput;
