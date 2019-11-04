import React = require('react');

import { Container, Row, Col } from 'react-grid-system';
import { GameTitle } from '../components/gameTitle';
import { BigButton } from '../components/bigButton';
import { Link } from 'react-router-dom';


export const TitleScreen = () => (
  <Container style={{height: "100%"}}>
    <Row justify="between" align="center" style={{height: "50%"}}>
      <Col sm={12}>
        <GameTitle>Invaderz<span className="secondary">TS</span></GameTitle>
      </Col>
    </Row>
    <Row justify="center" align="center" style={{height: "50%"}}>
      <Col sm={8}>
        <BigButton>
          <Link to="/play">Play game</Link>
        </BigButton>
      </Col>
    </Row>
</Container>
);