import React from 'react';

const ScoreBoard = ({score, total, grid}) => {

  const isActive = (i) => i < score ? 'active' : '';

  return (
    <section style={grid}>
      {Array.from({length: total}, (_, i) => <span key={i} className={`score icon icon-beer ${isActive(i)}`} />)}
    </section>
  );
};

export default ScoreBoard;
