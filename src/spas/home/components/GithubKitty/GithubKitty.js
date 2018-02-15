import React, { Component } from 'react';

class GithubKitty extends Component {

  render () {
    // return (
    {/*<Icon width={this.props.width} height={this.props.height} />*/}
    // );
    // {/*<image ref={this.props.svgRef}>*/}
    // </image>
    return (
      <img ref={this.props.svgRef}
           src="http://localhost:5000/github.svg"
           style={{display: 'none', width: this.props.width, height: this.props.height}}
           onClick={() => window.alert('hi')}
      />
    );
  }
}

export default GithubKitty;

// createScoreBoard () {
//   const beers = [];
//   for (let i = 0; i < this.state.count; i++) {
//     beers.push(
//       <span className="icon icon-beer" />
//     );
//   }
//   return beers;
// };
//
// incrementScore () {
//   if (this.state.count >= 10) {
//     this.setState({isWinner: true});
//   } else {
//     this.setState({count: this.state.count + 1});
//   }
// };