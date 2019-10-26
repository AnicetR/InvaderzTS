import { gameEngine } from "../engine/gameEngine";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import UI from './ui/ui';
import { devScene } from "./scene/devScene";

export class spaceinvaderz{
    private readonly gameEngine: gameEngine;

    constructor(private readonly canvas: HTMLCanvasElement){
        this.gameEngine = gameEngine.getInstance(canvas);
        
        new devScene(this.gameEngine);

        const uiContainer: HTMLElement = document.getElementById('ui');

        ReactDOM.render(
          <UI></UI>,
           uiContainer
        );
        
        uiContainer.style.height = ""+this.canvas.height+"px";
        uiContainer.style.width = ""+this.canvas.width+"px";
        uiContainer.style.position = "absolute";
    }
}






