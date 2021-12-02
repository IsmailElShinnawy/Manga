import React from 'react';

const Loading = ({ sm }) => {
  return (
    <div
      className={`${
        sm ? 'w-8 h-8 border-b-2' : 'w-24 h-24 border-b-4'
      } border-primary rounded-full animate-spin`}
    />
  );
};

export default Loading;
