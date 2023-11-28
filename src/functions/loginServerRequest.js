import React, { useState } from 'react';

export default function useLoginServerRequest () {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  async function sendRequest(url, method, body) {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const fetchArgs = {
        method: method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      if (method==="POST") {
        let formBody = [];
        for (let property in body) {
          formBody.push(property + "=" + body[property]);
        }
        formBody = formBody.join("&");
        fetchArgs.body = formBody
      }

      const response = await fetch(url, fetchArgs);

      if (!response.ok) {
        throw new Error("что то пошло не так");
      }

      if (response.status !== 204) {
        await response.json();
      }

      setIsSuccess(true);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
};

  return { isLoading, isSuccess, isError, setIsError, sendRequest };
};