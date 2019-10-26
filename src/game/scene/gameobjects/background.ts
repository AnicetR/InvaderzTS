import { RenderLayer } from "../../../engine/renderer/renderLayer";
import { gameEngine } from "../../../engine/gameEngine";
import { pattern } from "./background/pattern";
import { nebula } from "./background/nebula";


export class background{

    constructor(private readonly backgroundLayer: RenderLayer, private readonly gameEngineInstance: gameEngine){
        this.createBackgroundPattern();
        setInterval(this.spawnNebula.bind(this), 2500);
    }

    private createBackgroundPattern(){
        new pattern().registerToLayer(this.backgroundLayer);
    }

    private spawnNebula(){
        const baseX : number = Math.round(Math.random() * this.gameEngineInstance.context.boundaries.maxX);
        const velocity : number = Math.max(Math.random() * 0.2, 0.1);
        let nebulaObject : nebula = new nebula(baseX, velocity);
        nebulaObject.registerToLayer(this.backgroundLayer);
    }
}