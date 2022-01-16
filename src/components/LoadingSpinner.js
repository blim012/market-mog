import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";

const LoadingSpinner = (props) => {
  const { promiseInProgress } = usePromiseTracker({ area: props.area });
 
  return (
    <div className="loading-spinner">
    {
      (promiseInProgress === true) ?
        <h3>Loading in Progress...</h3>
      :
        null
    }
    </div>
  )
};

export default LoadingSpinner;
