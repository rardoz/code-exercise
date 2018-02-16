import React from 'react';

// Higher-Order Component (HOC)
const withHidden = (WrappedComponent, a) => {
  return class extends React.Component {
    render () {
      return this.props.hidden ? null : <WrappedComponent {...this.props} />;
    }
  };
};

export default withHidden;