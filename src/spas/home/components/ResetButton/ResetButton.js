import React from 'react';

const ResetButton = ({onClick, style}) => {
  return (
    <div style={style}>
      <button onClick={onClick}>Reset</button>
    </div>
  );
};

export default ResetButton;
