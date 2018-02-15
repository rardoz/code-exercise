import React from 'react';
import ReactDOM from 'react-dom';
import GithubKitty from './github.svg';
import GameCanvas from './components/GameCanvas/GameCanvas';
// import './styles.scss';
// import './home.font';
//
ReactDOM.render(<GameCanvas />, document.getElementById('react-spa'));

// const getPosition = (elapsedTime, h, k) => {
//   const a = (4 * k) / Math.pow(h * 2, 2);
//   return a * Math.pow((((elapsedTime + h) % (h * 2)) - h), 2);
// };
//
// // renders a Ball at a certain height
// const Ball = ({y}) => (
//   <div style={{
//     display: 'block',
//     position: 'absolute',
//     top: y
//   }}>
//     <GithubKitty width={50} height={50} />
//   </div>
// );
//
// // performs a Quadratic Ease in and Ease out repeatedly
// class QuadBounce extends React.Component {
//
//   constructor (props) {
//     super(props);
//     this.state = {
//       beginning: Date.now(),
//     };
//     this.updateValue = this.updateValue.bind(this);
//   }
//
//   componentWillMount () {
//     this.setState({interval: setInterval(this.updateValue, 20)});
//   }
//
//   componentWillUnmount () {
//     clearInterval(this.state.interval);
//   }
//
//   updateValue () {
//     const {
//       props: {
//         duration,
//         start,
//         end,
//       },
//       state: {
//         beginning,
//       },
//     } = this;
//
//     const time = Date.now() - beginning;
//     const value = start + getPosition(time, duration / 2, end - start);
//     this.setState({value});
//   };
//
//   render () {
//     const renderedChildren = this.props.children(this.state.value);
//     return renderedChildren && React.Children.only(renderedChildren);
//   }
// }
//
// ReactDOM.render(
//   <QuadBounce
//     duration={1150}
//     start={0}
//     end={160}
//   >
//     {value => <Ball y={value} />}
//   </QuadBounce>,
//   document.getElementById('react-spa')
// );
