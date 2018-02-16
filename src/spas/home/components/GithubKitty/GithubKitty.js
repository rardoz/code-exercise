import React from 'react';
import Icon from '../../github.svg';
import withHidden from '../withHidden/withHidden';

const defaultIconStyles = {
  animation: 'spin infinite 20s linear',
  display: 'block',
  position: 'absolute',
  cursor: 'pointer',
};

const GithubKitty = ({x, y, w, h, s, hidden, onClick}) => {

  const style = {
    width: w,
    height: h,
    ...defaultIconStyles
  };

  return (
    <div style={{...style, left: x, top: y}}>
      <Icon width={w} height={h} onClick={onClick} />
    </div>
  );

};

export default withHidden(GithubKitty);
