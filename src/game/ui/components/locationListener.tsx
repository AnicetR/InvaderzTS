import { useLocation } from "react-router-dom";
import * as React from 'react';
import { sceneManager } from "../../../engine/sceneManager";
import { gameEngine } from "../../../engine/gameEngine";




export const LocationListener = (props: any) => {
    const sceneMgr: sceneManager = gameEngine.getInstance().sceneMgr;
    let location = useLocation();
    switch(location.pathname){
        case "/":
            sceneMgr.changeScene('test');
            break;
        case "/play":
            sceneMgr.changeScene('dev');
            break;
    }

    return (
        <>{props.children}</>
    )
}