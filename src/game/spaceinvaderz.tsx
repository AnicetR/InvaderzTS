import { gameEngine } from "../engine/gameEngine";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import UI from './ui/ui';
import { devScene } from "./scene/devScene";
import { sceneManager } from "../engine/sceneManager";
import { testScene } from "./scene/testScene";

export class spaceinvaderz{
    private readonly gameEngine: gameEngine;

    constructor(private readonly canvas: HTMLCanvasElement){
        this.gameEngine = gameEngine.getInstance(canvas);
        const sceneMgr = new sceneManager();
        sceneMgr.scenesCollection.set('dev', new devScene(this.gameEngine));
        sceneMgr.scenesCollection.set('test', new testScene(this.gameEngine));
        
        sceneMgr.changeScene('dev');
        
        setTimeout(() => sceneMgr.changeScene('test'), 5000);

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






