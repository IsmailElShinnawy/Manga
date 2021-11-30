import React from 'react';

const Avatar = ({ firstName, lastName, lg }) => {
  const name = `${firstName[0]}${lastName[0]}`;
  return (
    <div
      className={`${
        lg ? 'w-24 h-24 text-4xl' : 'w-12 h-12'
      } rounded-full bg-primary text-white font-nunito flex justify-center items-center font-bold`}
    >
      {name}
    </div>
  );
};

export default Avatar;
