import React from 'react';

const GameCanvas = ({w, h, canvasRef, style, children}) => {
  return (
    <section ref={canvasRef} style={{width: w, height: h, ...style}}>
      {children}
    </section>
  );

};

export default GameCanvas;
