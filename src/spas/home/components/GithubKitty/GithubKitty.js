import React from 'react';
import Icon from '../../github.svg';
import withHidden from '../withHidden/withHidden';

const GithubKitty = ({x, y, w, h, s, style, handleIncrementScore}) => {

  const _style = {
    ...style,
    animation: `animate-spin infinite 20s linear, animate-color infinite ${10 / s}s linear`,
    width: w,
    height: h,
    left: x,
    top: y
  };

  return (
    <Icon style={_style} width={w} height={h} onClick={handleIncrementScore} />
  );

};

export default withHidden(GithubKitty);
