import React from 'react';
import { ReactComponent as XIcon } from '../../../../assets/icons/IconX.svg';

const DateInput = ({ id, value, onChange, label, clear }) => {
  return (
    <div className=''>
      <label htmlFor={id} className='w-full font-bold block mb-2'>
        {label}
      </label>
      <div className='flex'>
        <input className='mr-2' id={id} type='date' value={value} onChange={onChange} />
        <XIcon fill='red' className='hover:cursor-pointer' onClick={clear} />
      </div>
    </div>
  );
};

export default DateInput;
