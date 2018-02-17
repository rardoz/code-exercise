import React from 'react';
import withHidden from '../withHidden/withHidden';

const StartButton = ({style, victoryMessage, handleStart}) => {

  return (
    <div style={style}>
      {victoryMessage}
      <p>Click <b>start</b> to play</p>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default withHidden(StartButton);
