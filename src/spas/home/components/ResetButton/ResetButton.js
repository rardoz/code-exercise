import React from 'react';

const ResetButton = ({hidden, ...props}) => {

  if (hidden) return null;

  return (
    <button {...props}>Reset</button>
  );

};

export default ResetButton;
