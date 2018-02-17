import React from 'react';

const LevelIndicator = ({level, style}) => {
  return (
    <section style={style}>
      <nobr>Level: <b>{level}</b></nobr>
    </section>
  );
};

export default LevelIndicator;
