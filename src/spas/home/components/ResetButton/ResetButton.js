import React from 'react';

const ResetButton = ({onClick, grid}) => {

  return (
    <div style={grid}>
      <button onClick={onClick}>Reset</button>
    </div>
  );

};

export default ResetButton;
