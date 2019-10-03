import { gameEngine } from "../engine/gameEngine";

export class spaceinvaderz{
    private readonly gameEngine: gameEngine;

    constructor(private readonly canvas: HTMLCanvasElement){
        this.gameEngine = new gameEngine(canvas);    
    }
}