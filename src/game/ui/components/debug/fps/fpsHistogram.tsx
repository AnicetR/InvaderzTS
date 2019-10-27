import React = require('react');
import './fpsDisplay.scss';

import { useStore } from 'effector-react'

import { CartesianGrid, YAxis, Legend, AreaChart, Area, Tooltip } from 'recharts';
import { FpsHistogramList } from '../../../../../engine/stores/debug/fpsHistoryStore';

export const FpsHistogram = () => {
    const fpsHistogramData = useStore(FpsHistogramList);
    return (
        <div className="fps-histogram">
            <AreaChart height={50} data={fpsHistogramData}>
            <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Tooltip />
                <Area dataKey="fps" fill="red" isAnimationActive={false} />
            </AreaChart>
        </div>
        
    )
}




    
