import * as React from 'react';
import './ui.scss';
import { DebugContainer } from './components/debug/debugContainer';
import { LifeBar } from './components/gameplay/lives/lifeBar';

import { Container, Row, Col } from 'react-grid-system';

function UI() {
  return (
    <div className="UI">
      <Container>
        <Row>
          <Col sm={5}>
            <LifeBar />
          </Col>
        </Row>
      </Container>
      <DebugContainer/>
    </div>
  );
}

export default UI;