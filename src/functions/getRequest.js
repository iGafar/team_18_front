import React, { useState } from 'react';

export default function useGetRequest () {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});


  async function sendRequest(url) {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });

      if (!response.ok) {
        throw new Error("что то пошло не так");
      }

      setIsSuccess(true);
      setData(await response.json());
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false)
    }
}

  return { isSuccess, isError, isLoading, data, sendRequest };
}