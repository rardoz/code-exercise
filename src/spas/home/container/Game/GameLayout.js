import React, { Component } from 'react';
import { GameBuilder } from './GameBuilder';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import ResetButton from '../../components/ResetButton/ResetButton';
import GameCanvas from './GameCanvas';
import GithubKitty from '../../components/GithubKitty/GithubKitty';
import { DRAW_RATE, RESIZE_RATE } from './constants';
import _ from 'lodash/function';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';
import score from '../../assets/score.mp3';
import miss from '../../assets/miss.mp3';
import win from '../../assets/win.mp3';
import StartButton from '../../components/StartButton/StartButton';
import ClicksBoard from '../../components/ClicksBoard/ClicksBoard';
import VictoryMessage from '../../components/VictoryMessage/VictoryMessage';
import style from './style';

class GameLayout extends Component {

  static getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static normalizeCoord (val, lowerBound, upperBound) {
    return Math.min(Math.max(val, lowerBound), upperBound);
  }

  constructor (props) {
    super(props);

    this.Game = new GameBuilder().build();
    this.audioScore = new Audio(score);
    this.audioMiss = new Audio(miss);
    this.audioWin = new Audio(win);

    this.state = {
      isComplete: true,
      drawInterval: null,
    };

    // INFO: external lib
    this.handleWindowResize = _.throttle(this.handleWindowResize, RESIZE_RATE);
    // this.handleWindowResize = _.debounce(this.handleWindowResize, RESIZE_RATE);
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize);
    this.initializeBoard(this.initialGameState, true);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowResize);
    clearInterval(this.drawInterval);
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.score >= this.Game.scoreWinning && !prevState.isComplete) {
      this.winnerCelebration(); // Hooray!
    }
  }

  get initialGameState () {
    return {
      clicks: 0,
      score: this.Game.scoreInitial,
      speed: this.Game.speedInitial,
      angle: GameLayout.getRandomIntInclusive(0, 360),
      victoryMessage: null,
    };
  };

  initializeBoard = (initialState = {}, hardReset = false) => {
    const {x, y, width, height} = this.canvas.getBoundingClientRect();

    const board = {
      boardLeft: x,
      boardTop: y,
      boardRight: width + x - this.Game.iconWidth,
      boardBottom: height + y - this.Game.iconHeight,
    };

    this.startGame({
      x: hardReset ? x + (width / 2) : GameLayout.normalizeCoord(this.state.x, board.boardLeft, board.boardRight),
      y: hardReset ? y + (height / 2) : GameLayout.normalizeCoord(this.state.y, board.boardTop, board.boardBottom),
      dx: 0,
      dy: 0,
      ...board,
      ...initialState
    });
  };

  startGame = (initialState = {}) => {
    this.setState(initialState, this.drawIcon);
  };

  drawIcon = () => {
    clearInterval(this.drawInterval);

    const _drawIcon = () => {
      let angle = this.state.angle;
      const x = this.state.x + this.state.dx;
      const y = this.state.y + this.state.dy;

      if (x < this.state.boardLeft || x > this.state.boardRight) {
        angle = 180 - angle;
      } else if (y < this.state.boardTop || y > this.state.boardBottom) {
        angle = 360 - angle;
      }
      this.setState(({speed, radians = angle * Math.PI / 180}) => {
        return {
          x, y, angle,
          dx: Math.cos(radians) * speed,
          dy: Math.sin(radians) * speed
        };
      });
    };

    this.drawInterval = setInterval(_drawIcon, DRAW_RATE);
  };

  winnerCelebration = () => {
    clearInterval(this.drawInterval);

    this.playWinSound();

    const accuracy = `${(this.Game.scoreWinning / this.state.clicks * 100).toFixed(2)}%`;
    this.setState({
      isComplete: true,
      victoryMessage: (
        <VictoryMessage message='Congratulations' accuracy={accuracy} />
      )
    });
  };

  ////////////////////////
  // Sound Handlers
  ////////////////////////
  playMissSound = () => {
    this.audioMiss.currentTime = 0;
    this.audioMiss.play();
  };

  playScoreSound = () => {
    this.audioScore.currentTime = 0;
    this.audioScore.play();
  };

  playWinSound = () => {
    this.audioWin.currentTime = 0;
    this.audioWin.play();
  };

  ////////////////////////
  // Event Handlers
  ////////////////////////
  handleReset = () => {
    this.initializeBoard({isComplete: true, ...this.initialGameState}, true);
  };

  handleStart = () => {
    this.initializeBoard({isComplete: false, ...this.initialGameState}, true);
  };

  handleCanvasClick = (e) => {
    if (this.state.isComplete) return;

    if (this.canvas === e.target) this.playMissSound();
    else this.playScoreSound();

    this.setState(({clicks}) => {
      return {
        clicks: clicks + 1
      };
    });
  };

  handleIncrementScore = () => {
    // e.stopPropagation(); // prevent default `miss` sound from playing

    this.setState(({speed, score}) => {
      return {
        speed: speed + this.Game.speedIncrement,
        score: score + this.Game.scoreIncrement,
      };
    });
  };

  handleWindowResize = () => {
    this.initializeBoard();
  };

  ////////////////////////
  // Render
  ////////////////////////
  render () {
    return (
      <Main style={style.Main}>

        <ScoreBoard style={style.ScoreBoard}
                    score={this.state.score}
                    clicks={this.state.clicks}
                    total={this.Game.scoreWinning} />

        <ClicksBoard style={style.ClicksBoard}
                     clicks={this.state.clicks} />

        <ResetButton style={style.ResetButton}
                     handleReset={this.handleReset} />

        <StartButton style={style.StartButton}
                     hidden={!this.state.isComplete}
                     victoryMessage={this.state.victoryMessage}
                     handleStart={this.handleStart} />

        <GameCanvas style={style.GameCanvas}
                    canvasRef={(el) => this.canvas = el}
                    w={this.Game.boardWidth}
                    h={this.Game.boardHeight}
                    handleCanvasClick={this.handleCanvasClick}>


          <GithubKitty style={style.GithubKitty}
                       hidden={this.state.isComplete}
                       w={this.Game.iconWidth}
                       h={this.Game.iconHeight}
                       x={this.state.x}
                       y={this.state.y}
                       s={this.state.speed}
                       handleIncrementScore={this.handleIncrementScore} />
        </GameCanvas>

        <Footer style={style.Footer} />

      </Main>
    );
  }
}

export default GameLayout;