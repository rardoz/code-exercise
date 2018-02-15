import React from 'react';
// import Hidden from '../Hidden/Hidden';

const ResetButton = ({hidden, ...props}) => {

  if (hidden) return null;

  return (
    <button {...props}>Reset</button>
  );

};

// export default Hidden(ResetButton);
export default ResetButton;
