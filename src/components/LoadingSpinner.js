import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";

const LoadingSpinner = (props) => {
  const { promiseInProgress } = usePromiseTracker({ area: props.area });
 
  return (
    <div className="loading-spinner">
    {
      (promiseInProgress === true) ?
        <div className="loader"></div>
      :
        null
    }
    </div>
  )
};

export default LoadingSpinner;
