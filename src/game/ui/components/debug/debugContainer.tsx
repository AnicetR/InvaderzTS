import React = require('react');
import './debugContainer.scss';
import { FpsDisplay } from './fps/fpsDisplay';
import { FpsHistogram } from './fps/fpsHistogram';
import { useState } from 'react';
import classNames from 'classnames';

export const DebugContainer = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const contentClasses = classNames(
        'content',
        {'show' : isOpen}
    )

    return (
        <div className="debug-container">
            <div className={contentClasses}>
                <table>
                    <tr>
                        <td>FPS</td>
                        <td><FpsDisplay/></td>
                        <td><FpsHistogram/></td>
                    </tr>
                </table>
            </div>
            <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Close debug tools" : "Open debug tools"}</button>
        </div>
    )
}