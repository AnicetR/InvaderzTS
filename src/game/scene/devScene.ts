import { gameEngine } from "../../engine/gameEngine";
import { RenderLayer } from "../../engine/renderer/renderLayer";

import { background } from "./gameobjects/background";
import { playerShip } from "./gameobjects/playerShip";
import { ennemyShip } from "./gameobjects/enemyShip";
import { position } from "../../engine/types/gameObjectTypes";
import { scene } from "../../engine/baseObjects/scene";
import { interval } from "../../engine/baseObjects/interval";

export class devScene extends scene{
    constructor(private readonly gameEngineInstance: gameEngine){
        super(gameEngineInstance);

        this._layersCollection.set('background', new RenderLayer('background'));
        this._layersCollection.set('gameplay', new RenderLayer('gameplay'));   

        new background(this._layersCollection.get('background'), this.gameEngineInstance);

        new playerShip().registerToLayer(this._layersCollection.get('gameplay'));

        this._timeoutsCollection.set('ennemySpawn', 
            new interval(4000,
                () => {
                    let lastPosition: position = {x: 0, y: 0};
                    const setPosition = (): position => ({
                        x: Math.random() * this.gameEngineInstance.context.boundaries.maxX,
                        y: -100
                    })
    
                    for(let i = 0; i < (Math.random()*3); i++){
                        let position : position = setPosition(); 
                        let velocity : number = Math.min(0.015, Math.random() * 0.05);
                        if(Math.random() > 0.5){
                            velocity = velocity * -1;
                        }
                        while(
                            (position.x < lastPosition.x - 100) 
                            && (position.x > lastPosition.x + 100)
                            ) {
                                position = setPosition();
                            }
                        new ennemyShip(position, velocity).registerToLayer(this._layersCollection.get('gameplay'));
                        lastPosition = position;
                    }
                }
            )
        );

        this._timeoutsCollection.get('ennemySpawn').start();
    }
}