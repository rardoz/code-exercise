import React from 'react';
import { render } from 'react-dom';
import GameCanvas from './container/GameCanvas/GameCanvas';
import './styles.scss';
import './home.font';
import { GameBuilder } from './container/GameCanvas/GameBuilder';

// DEBUG: Game (w/ default options)
const game = new GameBuilder().build();

render(
  <GameCanvas {...game} />,
  document.getElementById('react-spa')
);
