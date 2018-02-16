class Game {
  // Board
  static DEFAULT_BOARD_WIDTH = '100%';
  static DEFAULT_BOARD_HEIGHT = '100%';
  // Icon
  static DEFAULT_ICON_WIDTH = 50;
  static DEFAULT_ICON_HEIGHT = 50;
  // Score
  static DEFAULT_SCORE_INITIAL = 0;
  static DEFAULT_SCORE_INCREMENT = 1;
  static DEFAULT_SCORE_WINNING = 1;
  // Speed
  static DEFAULT_SPEED_INITIAL = 1;
  static DEFAULT_SPEED_INCREMENT = 0.75;

  constructor (build) {
    this.boardWidth = build.boardWidth || Game.DEFAULT_BOARD_WIDTH;
    this.boardHeight = build.boardHeight || Game.DEFAULT_BOARD_HEIGHT;
    this.iconWidth = build.iconWidth || Game.DEFAULT_ICON_WIDTH;
    this.iconHeight = build.iconHeight || Game.DEFAULT_ICON_HEIGHT;
    this.scoreInitial = build.scoreInitial || Game.DEFAULT_SCORE_INITIAL;
    this.scoreIncrement = build.scoreIncrement || Game.DEFAULT_SCORE_INCREMENT;
    this.scoreWinning = build.scoreWinning | Game.DEFAULT_SCORE_WINNING;
    this.speedInitial = build.speedInitial || Game.DEFAULT_SPEED_INITIAL;
    this.speedIncrement = build.speedIncrement || Game.DEFAULT_SPEED_INCREMENT;
  }
}

export class GameBuilder {

  withBoard (width, height) {
    this.boardWidth = width;
    this.boardHeight = height;
    return this;
  }

  withIcon (width, height) {
    this.iconWidth = width;
    this.iconHeight = height;
    return this;
  }

  withScore (initial, increment, winning) {
    this.scoreInitial = initial;
    this.scoreIncrement = increment;
    this.scoreWinning = winning;
    return this;
  }

  withSpeed (initial, increment) {
    this.speedInitial = initial;
    this.speedIncrement = increment;
    return this;
  }

  build () {
    return new Game(this);
  }
}