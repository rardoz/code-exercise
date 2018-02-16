import React from 'react';
import Icon from '../../github.svg';
import withHidden from '../withHidden/withHidden';

const GithubKitty = ({x, y, w, h, s, style, onClick}) => {

  const _style = {
    ...style,
    animation: `animate-spin infinite 20s linear, animate-color infinite ${3 / s}s linear`,
    width: w,
    height: h,
    left: x,
    top: y
  };

  return (
    <Icon style={_style} width={w} height={h} onClick={onClick} />
  );

};

export default withHidden(GithubKitty);
