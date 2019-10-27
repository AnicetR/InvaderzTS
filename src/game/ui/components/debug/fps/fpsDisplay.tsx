import React = require('react');
import './fpsDisplay.scss';

import { useStore } from 'effector-react'

import { FpsHistogramList } from '../../../../../engine/stores/debug/fpsHistoryStore';

export const FpsDisplay = () => {
    const fpsHistogramData = useStore(FpsHistogramList);
    const lastFps = fpsHistogramData[fpsHistogramData.length - 1].fps;

    return (
        <div className="fps-display">
            <span>
                {lastFps}
            </span>
        </div>
    )
}




    
