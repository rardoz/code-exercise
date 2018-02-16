import React, { Component } from 'react';
import { GameBuilder } from './GameBuilder';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import ResetButton from '../../components/ResetButton/ResetButton';
import GameCanvas from './GameCanvas';
import GithubKitty from '../../components/GithubKitty/GithubKitty';
import { RESIZE_RATE } from './constants';
import _ from 'lodash/function';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

class GameLayout extends Component {

  static getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor (props) {
    super(props);

    this.Game = new GameBuilder().build();
    console.debug('Game settings:', this.Game);

    this.state = {
      isWinner: false,
      score: this.Game.scoreInitial,
      speed: this.Game.speedInitial,
      drawInterval: null
    };

    this.handleWindowResize = _.debounce(this.handleWindowResize, RESIZE_RATE);
  }

  componentDidMount () {
    window.addEventListener('resize', this.Game.handleWindowResize);
    this.updateBoundingCoords(this.initializeGame);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowResize);
    this.clearInterval();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.score >= this.Game.scoreWinning && !prevState.isWinner) {
      this.setState({isWinner: true}, clearInterval(this.drawInterval));
    }
  }

  initializeGame = () => {
    console.debug('init', this.state, this.Game);
    this.updateSpeed(GameLayout.getRandomIntInclusive(0, 360));
    this.clearInterval();
    this.drawInterval = setInterval(this.drawIcon, 33);
  };

  clearInterval = () => {
    clearInterval(this.drawInterval);
  };

  updateBoundingCoords = (cb) => {
    const {x, y, width, height} = this.canvas.getBoundingClientRect();
    this.setState({
      x: x + (width / 2),
      y: y + (height / 2),
      boardX1: x,
      boardY1: y,
      boardX2: width + x,
      boardY2: height + y,
    }, cb);
  };

  updateSpeed = (angle = this.state.angle) => {
    const radians = angle * Math.PI / 180;
    this.setState({
      angle,
      dx: Math.cos(radians) * this.state.speed,
      dy: Math.sin(radians) * this.state.speed
    });
  };

  drawIcon = () => {
    this.setState({
      x: this.state.x + this.state.dx,
      y: this.state.y + this.state.dy
    }, this.updateAngle);
  };

  updateAngle = () => {
    if (this.state.x < this.state.boardX1 || (this.state.x + this.Game.iconWidth) > this.state.boardX2) {
      let angle = 180 - this.state.angle;
      this.updateSpeed(angle);
    } else if (this.state.y < this.state.boardY1 || (this.state.y + this.Game.iconHeight) > this.state.boardY2) {
      let angle = 360 - this.state.angle;
      this.updateSpeed(angle);
    }
  };

  handleReset = () => {
    this.setState({
      speed: this.Game.speedInitial,
      score: this.Game.scoreInitial,
      isWinner: false,
    }, this.initializeGame);
  };

  handleIncrementScore = () => {
    this.setState({
      speed: this.state.speed + this.Game.speedIncrement,
      score: this.state.score + this.Game.scoreIncrement,
    }, this.updateSpeed);
  };

  handleWindowResize = () => {
    this.updateBoundingCoords();
  };

  render () {
    return (
      <Main style={style.Main}>

        <ScoreBoard style={style.ScoreBoard} score={this.state.score} total={this.Game.scoreWinning} />

        <ResetButton style={style.ResetButton} onClick={this.handleReset} />

        <GameCanvas style={style.GameCanvas}
                    canvasRef={(el) => this.canvas = el}
                    w={this.Game.boardWidth}
                    h={this.Game.boardHeight}>

          <GithubKitty style={style.GithubKitty}
                       hidden={this.state.isWinner}
                       w={this.Game.iconWidth}
                       h={this.Game.iconHeight}
                       x={this.state.x}
                       y={this.state.y}
                       s={this.state.speed}
                       onClick={this.handleIncrementScore} />
        </GameCanvas>

        <Footer style={style.Footer} />

      </Main>
    );
  }
}

// Style
const style = {
  Main: {
    display: 'grid',
    padding: '0 2rem',
    gridTemplateAreas: '"score reset" "canvas canvas" "footer footer"',
    gridTemplateRows: '1fr 8fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridRowGap: '1rem',
    margin: '0 auto',
    maxWidth: '112.0rem',
    width: '100%',
    alignItems: 'end'
  },
  ScoreBoard: {
    gridArea: 'score',
  },
  ResetButton: {
    gridArea: 'reset',
    textAlign: 'right',
  },
  GameCanvas: {
    gridArea: 'canvas',
    border: '1px solid rgb(0, 0, 255)',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
  },
  GithubKitty: {
    display: 'block',
    position: 'absolute',
    cursor: 'pointer',
  },
  Footer: {
    gridArea: 'footer'
  },
};

export default GameLayout;