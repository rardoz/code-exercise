import React from 'react';
import withHidden from '../withHidden/withHidden';

const StartButton = ({style, level, victoryMessage, handleStart}) => {
  const buttonText = level <= 1 ? 'Start' : `Level ${level}`;
  return (
    <div style={style}>
      {victoryMessage}
      <p>Click <b>{buttonText}</b> to play</p>
      <button onClick={handleStart}>{buttonText}</button>
    </div>
  );
};

export default withHidden(StartButton);
