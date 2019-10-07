import { gameEngine } from "../engine/gameEngine";
import { RenderLayer } from "../engine/renderer/renderLayer";
import { testSprite as testGameObject } from "./scene/gameobjects/testSprite";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import UI from './ui/ui';

export class spaceinvaderz{
    private readonly gameEngine: gameEngine;

    constructor(private readonly canvas: HTMLCanvasElement){
        this.gameEngine = new gameEngine(canvas);
        const testLayer = new RenderLayer('test');
        this.gameEngine.renderer.addLayer(testLayer);
        new testGameObject().registerToLayer(testLayer);

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






