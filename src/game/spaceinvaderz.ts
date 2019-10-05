import { gameEngine } from "../engine/gameEngine";
import { RenderLayer } from "../engine/renderer/renderLayer";
import { testSprite as testGameObject } from "./scene/gameobjects/testSprite";

export class spaceinvaderz{
    private readonly gameEngine: gameEngine;

    constructor(private readonly canvas: HTMLCanvasElement){
        this.gameEngine = new gameEngine(canvas);
        const testLayer = new RenderLayer('test');
        this.gameEngine.renderer.addLayer(testLayer);
        new testGameObject().registerToLayer(testLayer);
    }
}

