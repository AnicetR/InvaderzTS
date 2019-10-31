import React = require("react");

import { useStore } from "effector-react";
import { Score as ScoreState } from "../../../stores/score";

import './score.scss';



export const Score = () => {
    const score = useStore(ScoreState.store);
    const digitCount = 10;
    const scoreToShow = score.toString().split('').map((digit: string) => parseInt(digit));
    while(scoreToShow.length < digitCount){
        scoreToShow.unshift(0);
    }
    scoreToShow.join('');

    
    return (
        <div className="score">{scoreToShow}</div>
    );
}
