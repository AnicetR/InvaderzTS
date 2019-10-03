import { gameEngine } from "../engine/gameEngine";
import { Sprite } from "../engine/baseObjects/sprite";

import * as testImage from './assets/test.jpg';

export class spaceinvaderz{
    private readonly gameEngine: gameEngine;

    constructor(private readonly canvas: HTMLCanvasElement){
        this.gameEngine = new gameEngine(canvas);

        const testSprite : Sprite = new Sprite(testImage);
        testSprite.onload = () => this.gameEngine.context.drawSprite(testSprite);
    }
}