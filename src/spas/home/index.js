import React from 'react';
import { render } from 'react-dom';
import './styles.scss';
import './home.font';
import GameLayout from './container/Game/GameLayout';

render(
  <GameLayout />,
  document.getElementById('react-spa')
);
