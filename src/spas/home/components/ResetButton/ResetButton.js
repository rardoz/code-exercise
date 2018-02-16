import React from 'react';

const ResetButton = ({hidden, onClick, grid}) => {

  if (hidden) return null;

  return (
    <div style={grid}>
      <button onClick={onClick}>Reset</button>
    </div>
  );

};

export default ResetButton;
