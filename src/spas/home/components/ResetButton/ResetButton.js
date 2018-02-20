import React from 'react';

const ResetButton = ({style, handleReset}) => {
  return (
    <div style={style}>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ResetButton;
