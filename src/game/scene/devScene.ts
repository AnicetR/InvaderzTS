import { gameEngine } from "../../engine/gameEngine";
import { RenderLayer } from "../../engine/renderer/renderLayer";

import { background } from "./gameobjects/background";
import { playerShip } from "./gameobjects/playerShip";
import { ennemyShip } from "./gameobjects/enemyShip";
import { position } from "../../engine/types/gameObjectTypes";

export class devScene{
    constructor(private readonly gameEngineInstance: gameEngine){
        const backgroundLayer = new RenderLayer('background');
        const playerLayer = new RenderLayer('player');

        this.gameEngineInstance.renderer.addLayer(backgroundLayer);   
        this.gameEngineInstance.renderer.addLayer(playerLayer);        

        new background(backgroundLayer, this.gameEngineInstance);

        new playerShip().registerToLayer(playerLayer);

        setInterval(() => {
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
                new ennemyShip(position, velocity).registerToLayer(playerLayer);
                lastPosition = position;
            }
        }, 4000)
        
    }

    
}