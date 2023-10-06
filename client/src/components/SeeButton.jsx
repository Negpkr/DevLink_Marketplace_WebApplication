import React from 'react';

const SeeButton = ({toggleShowAll , label}) => {
  return (
    <div className='toggle-button-container'>
      <button className='toggle-button' onClick={toggleShowAll}>
        {label}
      </button>
    </div>
  );
};

export default SeeButton;
