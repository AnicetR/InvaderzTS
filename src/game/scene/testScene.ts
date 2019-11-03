import { gameEngine } from "../../engine/gameEngine";
import { RenderLayer } from "../../engine/renderer/renderLayer";

import { background } from "./gameobjects/background";
import { playerShip } from "./gameobjects/playerShip";
import { ennemyShip } from "./gameobjects/enemyShip";
import { position } from "../../engine/types/gameObjectTypes";
import { scene } from "../../engine/baseObjects/scene";
import { interval } from "../../engine/baseObjects/interval";

export class testScene extends scene{
    constructor(private readonly gameEngineInstance: gameEngine){
        super(gameEngineInstance);

        this._layersCollection.set('test', new RenderLayer('test'));   

        new playerShip().registerToLayer(this._layersCollection.get('test'));
    }
}