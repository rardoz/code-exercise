import React, { Component } from 'react';

// Higher-Order Component (HOC)
const Hidden = (WrappedComponent) => {
  return class extends Component {
    render () {
      return this.props.hidden ? <WrappedComponent {...this.props} /> : null;
    }
  };
};

export default Hidden;