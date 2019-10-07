import * as React from 'react';
import './ui.css';

import * as testImage from '../assets/test.jpg';

function UI() {
  return (
    <div className="UI">
      <img src={testImage} className="test-image" alt=""/>
    </div>
  );
}

export default UI;