import React from 'react';
import { ReactComponent as XIcon } from '../../../../assets/icons/IconX.svg';

import TimePicker from 'react-time-picker';

const TimeInput = ({ label, value, onChange, clear }) => {
  return (
    <>
      <label className='w-full font-bold block mb-2'>{label}</label>
      <div className='flex'>
        <TimePicker
          value={value}
          onChange={onChange}
          disableClock={true}
          closeClock={true}
          clearIcon={false}
          className='mb-2'
        />
        {clear && (
          <XIcon fill='red' className='hover:cursor-pointer ml-2' onClick={clear} />
        )}
      </div>
    </>
  );
};

export default TimeInput;
