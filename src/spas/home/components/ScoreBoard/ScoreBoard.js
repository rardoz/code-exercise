import React from 'react';

const ScoreBoard = ({score}) => Array.from({length: score}, (_, i) => <span key={i} className="icon icon-beer" />);

export default ScoreBoard;