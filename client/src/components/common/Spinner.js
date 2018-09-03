import React from 'react';
import spinner from '../../assets/spinner.svg';

const Spinner = () => {
  return (
    <div
      style={{ position: 'fixed', left: '40%', top: '30%'}}
    >
      <img 
        src={spinner} 
        alt="Loading..." 
      />
    </div>
  );
};

export default Spinner;