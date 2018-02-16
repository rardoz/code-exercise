import React from 'react';

const GameCanvas = ({w, h, canvasRef, style, children, handleCanvasClick}) => {
  return (
    <section ref={canvasRef} style={{width: w, height: h, ...style}} onClick={handleCanvasClick}>
      {children}
    </section>
  );

};

export default GameCanvas;
