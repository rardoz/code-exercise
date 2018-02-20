import React from 'react';

const VictoryMessage = ({message, accuracy}) => {
  return (
    <div>
      <p>{message}</p>
      <p><small>Accuracy: <b>{accuracy}</b></small></p>
    </div>
  );
};

export default VictoryMessage;
