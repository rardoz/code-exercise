import React, { Component } from 'react';
import { GameBuilder } from './GameBuilder';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import ResetButton from '../../components/ResetButton/ResetButton';
import GameCanvas from './GameCanvas';
import GithubKitty from '../../components/GithubKitty/GithubKitty';
import { DRAW_RATE, RESIZE_RATE, VICTORY_MESSAGE, } from './constants';
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
import LevelIndicator from '../../components/LevelIndicator/LevelIndicator';

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

    this.audioScore = new Audio(score);
    this.audioMiss = new Audio(miss);
    this.audioWin = new Audio(win);

    this.state = {
      Game: new GameBuilder().build(),
      isComplete: true,
      level: 1,
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
    if (this.state.score === this.state.Game.scoreWinning && prevState.score === (this.state.Game.scoreWinning - 1)) {
      this.winnerCelebration(); // Hooray!
    }
  }

  get initialGameState () {
    return {
      clicks: 0,
      score: this.state.Game.scoreInitial,
      speed: this.state.Game.speedInitial,
      angle: GameLayout.getRandomIntInclusive(0, 360),
      victoryMessage: null,
    };
  };

  initializeBoard = (initialState = {}, hardReset = false) => {
    const {x, y, width, height} = this.canvas.getBoundingClientRect();

    const board = {
      boardLeft: x,
      boardTop: y,
      boardRight: width + x - this.state.Game.iconWidth,
      boardBottom: height + y - this.state.Game.iconHeight,
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
      this.setState(({speed, radians = angle * Math.PI / 180}) => ({
          x, y, angle,
          dx: Math.cos(radians) * speed,
          dy: Math.sin(radians) * speed
        })
      );
    };

    this.drawInterval = setInterval(_drawIcon, DRAW_RATE);
  };

  incrementScore = () => {
    this.playScoreSound();

    this.setState(({speed, score}) => ({
      speed: speed + this.state.Game.speedIncrement,
      score: score + this.state.Game.scoreIncrement
    }));
  };

  winnerCelebration = () => {
    clearInterval(this.drawInterval);

    this.playWinSound();

    const accuracy = `${(this.state.Game.scoreWinning / this.state.clicks * 100).toFixed(2)}%`;
    const speed = this.state.level / 10 + 0.1;
    const level = this.state.level + 1;

    this.setState({
      Game: new GameBuilder()
        .withSpeed({initial: speed})
        .build(),
      isComplete: true,
      level,
      victoryMessage: (
        <VictoryMessage message={VICTORY_MESSAGE} accuracy={accuracy} />
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
    this.initializeBoard({isComplete: true, level: 1, ...this.initialGameState}, true);
  };

  handleStart = () => {
    this.initializeBoard({isComplete: false, ...this.initialGameState}, true);
  };

  handleCanvasClick = (e) => {
    if (this.state.isComplete) return;

    if (this.canvas === e.target) this.playMissSound();
    else this.incrementScore();

    this.setState(({clicks}) => ({clicks: clicks + 1}));
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

        <LevelIndicator style={style.LevelIndicator}
                        level={this.state.level} />

        <ClicksBoard style={style.ClicksBoard}
                     clicks={this.state.clicks} />

        <ScoreBoard style={style.ScoreBoard}
                    score={this.state.score}
                    clicks={this.state.clicks}
                    total={this.state.Game.scoreWinning} />


        <ResetButton style={style.ResetButton}
                     handleReset={this.handleReset} />

        <StartButton style={style.StartButton}
                     hidden={!this.state.isComplete}
                     level={this.state.level}
                     victoryMessage={this.state.victoryMessage}
                     handleStart={this.handleStart} />

        <GameCanvas style={style.GameCanvas}
                    canvasRef={(el) => this.canvas = el}
                    w={this.state.Game.boardWidth}
                    h={this.state.Game.boardHeight}
                    handleCanvasClick={this.handleCanvasClick}>


          <GithubKitty style={style.GithubKitty}
                       hidden={this.state.isComplete}
                       w={this.state.Game.iconWidth}
                       h={this.state.Game.iconHeight}
                       x={this.state.x}
                       y={this.state.y}
                       s={this.state.speed} />
        </GameCanvas>

        <Footer style={style.Footer} />

      </Main>
    );
  }
}

export default GameLayout;