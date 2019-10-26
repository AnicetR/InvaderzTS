import { gameEngine } from "../../engine/gameEngine";
import { RenderLayer } from "../../engine/renderer/renderLayer";

import { background } from "./gameobjects/background";
import { playerShip } from "./gameobjects/playerShip";

export class devScene{
    constructor(private readonly gameEngineInstance: gameEngine){
        const backgroundLayer = new RenderLayer('background');
        const playerLayer = new RenderLayer('player');

        this.gameEngineInstance.renderer.addLayer(backgroundLayer);   
        this.gameEngineInstance.renderer.addLayer(playerLayer);        

        new background(backgroundLayer, this.gameEngineInstance);

        new playerShip().registerToLayer(playerLayer);
    }
}