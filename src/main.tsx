import React from 'react';
import ReactDOM from 'react-dom/client';
import WrappedApp from './App';
import './index.module.css';

import "./assets/fonts/PowerGroteskTrial/PowerGroteskTrial-Heavy.ttf"
import "./assets/fonts/PowerGroteskTrial/PowerGroteskTrial-Black.ttf"
import "./assets/fonts/PowerGroteskTrial/PowerGroteskTrial-UltraBold.ttf"
import "./assets/fonts/PowerGroteskTrial/PowerGroteskTrial-Bold.ttf"
import "./assets/fonts/PowerGroteskTrial/PowerGroteskTrial-Regular.ttf"
import "./assets/fonts/PowerGroteskTrial/PowerGroteskTrial-Light.ttf"

import "./assets/fonts/NeuePlak/NeuePlak-Bold.ttf"
import "./assets/fonts/NeuePlak/NeuePlak-Regular.ttf"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);
