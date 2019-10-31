import * as React from 'react';
import './ui.scss';
import { DebugContainer } from './components/debug/debugContainer';
import { LifeBar } from './components/gameplay/lives/lifeBar';

import { Container, Row, Col } from 'react-grid-system';
import { Score } from './components/gameplay/score';

function UI() {
  return (
    <div className="UI">
      <Container>
        <Row justify="between" align="center">
          <Col sm={5}>
            <LifeBar />
          </Col>
          <Col sm={3}>
            <Score />
          </Col>
        </Row>
      </Container>
      <DebugContainer/>
    </div>
  );
}

export default UI;