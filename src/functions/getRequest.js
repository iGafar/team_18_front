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




// import React, { useState, useCallback } from 'react';

// export default function useGetRequest () {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState({});


//   const sendRequest = useCallback(async (url) => {
//     setIsLoading(true);
//     setIsSuccess(false);
//     setIsError(false);

//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//       });

//       if (!response.ok) {
//         throw new Error("что то пошло не так");
//       }

//       setIsSuccess(true);
//       setData(await response.json());
//     } catch (err) {
//       setIsError(true);
//     } finally {
//       setIsLoading(false)
//     }
//   }, []);

//   return { isSuccess, isError, isLoading, data, sendRequest };
// }
  
  
  
//   async function sendRequest(url) {
//     setIsLoading(true);
//     setIsSuccess(false);
//     setIsError(false);

//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//       });

//       if (!response.ok) {
//         throw new Error("что то пошло не так");
//       }

//       setIsSuccess(true);
//       setData(await response.json());
//     } catch (err) {
//       setIsError(true);
//     } finally {
//       setIsLoading(false)
//     }
// }
