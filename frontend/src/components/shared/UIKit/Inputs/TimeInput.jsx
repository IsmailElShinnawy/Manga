import React from 'react';

import TimePicker from 'react-time-picker';

const TimeInput = ({ label, value, onChange }) => {
  return (
    <>
      <label className='w-full font-bold block mb-2'>{label}</label>
      <TimePicker
        value={value}
        onChange={onChange}
        disableClock={true}
        closeClock={true}
        clearIcon={false}
        className='mb-2'
      />
    </>
  );
};

export default TimeInput;
