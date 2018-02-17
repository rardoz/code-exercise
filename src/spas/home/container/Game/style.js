import canvasBackground from '../../assets/canvas75.png';
import mainBackground from '../../assets/background.png';

const style = {
  Main: {
    Container: {
      background: `url(${mainBackground}) repeat`,
      height: '100%',
    },
    Grid: {
      display: 'grid',
      padding: '0 2rem',
      gridTemplateAreas: '"score clicks reset" "canvas canvas canvas" "footer footer footer"',
      gridTemplateRows: '1fr 8fr 1fr',
      gridTemplateColumns: '1fr 1fr 2fr',
      gridRowGap: '1rem',
      alignItems: 'end',
      pointerEvents: 'none',
      userSelect: 'none',
      margin: '0 auto',
      maxWidth: '112.0rem',
      height: '100%',
    }
  },
  ScoreBoard: {
    gridArea: 'score',
  },
  ClicksBoard: {
    gridArea: 'clicks',
  },
  StartButton: {
    gridArea: 'canvas',
    textAlign: 'center',
    alignSelf: 'center',
    zIndex: 1,
    pointerEvents: 'auto',
  },
  ResetButton: {
    gridArea: 'reset',
    textAlign: 'right',
    pointerEvents: 'auto',
  },
  GameCanvas: {
    gridArea: 'canvas',
    border: '1px solid rgb(0, 0, 255)',
    pointerEvents: 'auto',
    background: `url(${canvasBackground}) no-repeat center center fixed`,
    backgroundSize: 'cover'
  },
  GithubKitty: {
    display: 'block',
    position: 'absolute',
    cursor: 'pointer',
  },
  Footer: {
    gridArea: 'footer',
    alignSelf: 'center',
  },
};

export default style;