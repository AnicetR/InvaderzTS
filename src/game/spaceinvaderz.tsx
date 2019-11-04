import { gameEngine } from "../engine/gameEngine";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import UI from './ui/ui';
import { devScene } from "./scene/devScene";
import { testScene } from "./scene/testScene";
export class spaceinvaderz{

    constructor(private readonly canvas: HTMLCanvasElement){
        this.loadGame(this.canvas).then(() => this.loadUi());
    }

    

    loadGame(canvas: HTMLCanvasElement) : Promise<gameEngine>{
        return new Promise((resolve: PromiseResolve<gameEngine>, reject: PromiseReject): void => { 
            const engine : gameEngine = gameEngine.getInstance(canvas);
            engine.sceneMgr.scenesCollection.set('dev', new devScene(engine));
            engine.sceneMgr.scenesCollection.set('test', new testScene(engine));
            resolve(engine);
        }); 
    }

    loadUi(){
            const uiContainer: HTMLElement = document.getElementById('ui');

            ReactDOM.render(
            <UI></UI>
            , uiContainer
        );
                        
        uiContainer.style.height = ""+this.canvas.height+"px";
        uiContainer.style.width = ""+this.canvas.width+"px";
        uiContainer.style.position = "absolute";
    }
}

type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void; 
type PromiseReject = (error?: any) => void;






