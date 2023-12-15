import React, { useReducer, useCallback } from 'react';

function reducer(state, action) {
 switch (action.type) {
   case 'START':
     return { isLoading: true, isError: false, isSuccess: false, data: {} };
   case 'SUCCESS':
     return { isLoading: false, isError: false, isSuccess: true, data: action.data };
   case 'ERROR':
     return { isLoading: false, isError: true, isSuccess: false, data: {} };
   default:
     throw new Error();
 }
}

export default function useGetRequest () {
 const [state, dispatch] = useReducer(reducer, {
   isLoading: false,
   isError: false,
   isSuccess: false,
   data: {}
 });

 const sendRequest = useCallback(async (url) => {
   dispatch({ type: 'START' });
   try {
     const response = await fetch(url, {
       method: "GET",
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     });

     if (!response.ok) {
       throw new Error("что то пошло не так");
     }

     const data = await response.json();
     dispatch({ type: 'SUCCESS', data });
   } catch (err) {
     dispatch({ type: 'ERROR' });
   }
 }, []);

 return { isSuccess: state.isSuccess, isError: state.isError, isLoading: state.isLoading, data: state.data, sendRequest };
}