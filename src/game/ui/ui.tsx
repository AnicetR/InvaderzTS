import * as React from 'react';

import './ui.scss';
import { DebugContainer } from './components/debug/debugContainer';
import { TitleScreen } from './views/titleScreen';
import { GameOverScreen } from './views/gameOverScreen';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { GamePlayScreen } from './views/gameplayScreen';
import { LocationListener } from './components/locationListener';

function UI() {
  return (
    <div className="UI">
      <Router>
        <LocationListener>
          <Switch>
            <Route path="/play">
              <GamePlayScreen/>
            </Route>
            <Route path="/gameOver">
              <GameOverScreen/>
            </Route>
            <Route path="/">
              <TitleScreen/>
            </Route>
          </Switch>
        </LocationListener>
      </Router>

      <DebugContainer/>
    </div>
  );
}

export default UI;