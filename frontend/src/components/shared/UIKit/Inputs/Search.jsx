import React, { useEffect, useState } from 'react';
import { Input } from '.';
import useDebounced from '../../../../hooks/debounced-hook';
import { useHttpClient } from '../../../../hooks/http-hook';

const Search = ({ placeholder, url, options = {}, onResponse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, sendRequest } = useHttpClient();
  const debouncedSearchTerm = useDebounced(searchTerm, 1000);

  useEffect(() => {
    const search = async () => {
      try {
        const response = await sendRequest(
          `${url}?term=${debouncedSearchTerm}`,
          'POST',
          options,
          {
            'Content-Type': 'application/json',
          }
        );
        onResponse(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    search();
  }, [debouncedSearchTerm, options]);

  return (
    <div className='w-full flex items-center'>
      <div className='w-11/12'>
        <Input
          id='searchTerm'
          onInput={(_, value) => setSearchTerm(value)}
          placeholder={placeholder}
          validators={[]}
          isValid={true}
        />
      </div>
      {isLoading && (
        <div className='w-1/12 mb-2 pl-2'>
          <div className='animate-spin w-5 h-5 border-b-2 rounded-full border-input-focus' />
        </div>
      )}
    </div>
  );
};

export default Search;
