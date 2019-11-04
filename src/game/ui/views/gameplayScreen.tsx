import React = require('react');

import { LifeBar } from '../components/gameplay/lives/lifeBar';
import { Container, Row, Col } from 'react-grid-system';
import { Score } from '../components/gameplay/score';


export const GamePlayScreen = () => (
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
);