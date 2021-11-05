import React, { useEffect, useState } from 'react';

import './CheckBox.scss';

const CheckBox = ({ checked, onInput, id, danger }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    if (onInput) {
      onInput(id, isChecked);
    }
  }, [isChecked, id, onInput]);

  return (
    <label className='flex items-center checkbox-label'>
      <input className='checkbox opacity-0 w-0 h-0' type='checkbox' />
      <div
        className={`relative w-6 h-6 bg-input-background checkbox-div hover:cursor-pointer rounded-md ${
          isChecked
            ? `border-2 checked ${
                danger ? 'border-red-700 danger' : 'border-input-focus'
              }`
            : ''
        }`}
        onClick={() => setIsChecked(wasChecked => !wasChecked)}
      />
    </label>
  );
};

export default CheckBox;
