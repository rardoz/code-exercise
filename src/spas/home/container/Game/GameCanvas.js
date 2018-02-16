import React from 'react';

const defaultCanvasStyles = {
  border: '1px solid rgb(0, 0, 255)',
  backgroundColor: 'rgba(0, 0, 255, 0.2)'
};

const GameCanvas = ({w, h, canvasRef, grid, children}) => {

  const style = {
    width: w,
    height: h,
    ...grid,
    ...defaultCanvasStyles,
  };

  return (
    <section ref={canvasRef} style={style}>
      {children}
    </section>
  );

};

export default GameCanvas;
