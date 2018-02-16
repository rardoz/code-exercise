import React from 'react';
// import Hidden from '../Hidden/Hidden';

const ResetButton = ({hidden, onClick, grid}) => {

  if (hidden) return null;

  return (
    <div style={grid}>
      <button onClick={onClick}>Reset</button>
    </div>
  );

};

// export default Hidden(ResetButton);
export default ResetButton;
