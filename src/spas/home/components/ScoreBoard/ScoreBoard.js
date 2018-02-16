import React from 'react';

const ScoreBoard = ({score, total, style}) => {
  return (
    <section style={style}>
      {Array.from({length: total}, (_, i) => <span key={i} className={`score icon icon-beer ${i < score ? 'active' : ''}`} />)}
    </section>
  );
};

export default ScoreBoard;
