import React from 'react';

const ClicksBoard = ({clicks, style}) => {
  return (
    <section style={style}>
      <nobr># Clicks: <b>{clicks}</b></nobr>
    </section>
  );
};

export default ClicksBoard;
