import React = require('react');
import './debugContainer.scss';
import { FpsDisplay } from './fps/fpsDisplay';
import { FpsHistogram } from './fps/fpsHistogram';
import { useState } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-grid-system';

export const DebugContainer = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const contentClasses = classNames(
        'content',
        {'show' : isOpen}
    )

    return (
        <div className="debug-container">
            <div className={contentClasses}>
                <Row align="center">
                    <Col sm={2}>
                        <FpsDisplay/>
                    </Col>
                    <Col sm={3}>
                        <FpsHistogram/>
                    </Col>
                </Row>
            </div>
            <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Close debug tools" : "Open debug tools"}</button>
        </div>
    )
}