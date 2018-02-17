import React from 'react';

const ClicksBoard = ({clicks, style}) => {
  return (
    <section style={style}>
      # Clicks: <b>{clicks}</b>
    </section>
  );
};

export default ClicksBoard;
