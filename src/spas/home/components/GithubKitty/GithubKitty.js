import React from 'react';
import Icon from '../../github.svg';
// import Hidden from '../Hidden/Hidden';

const GithubKitty = ({x, y, w, h, hidden, ...props}) => {

  if (hidden) return null;

  const style = {
    display: 'block',
    position: 'absolute',
    cursor: 'pointer',
    width: w,
    height: h,
  };

  return (
    <div style={{...style, left: x, top: y}} {...props}>
      <Icon width={w} height={h} />
    </div>
  );

};

// export default Hidden(GithubKitty);
export default GithubKitty;
