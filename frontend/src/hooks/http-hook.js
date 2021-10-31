import { useCallback, useState } from 'react';

import { default as api } from '../service/api.service';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(
    async (url, method = 'GET', body = {}, headers = {}) => {
      setError('');
      let response;
      try {
        setIsLoading(true);
        response = await api({
          url,
          method,
          data: body,
          headers,
        });
        setIsLoading(false);
        return response;
      } catch (err) {
        setIsLoading(false);
        setError(err);
        throw err;
      }
    },
    []
  );

  const clearError = () => setError('');

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
