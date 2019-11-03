import { sceneInterface} from "../types/scenesTypes";
import { RenderLayerInterface } from "../types/renderLayerInterface";
import { gameEngine } from "../gameEngine";
import { intervalInterface } from "../types/intervalTypes";


export class scene implements sceneInterface{
    _layersCollection: Map<string, RenderLayerInterface> = new Map();
    _timeoutsCollection: Map<string, intervalInterface> = new Map();

    constructor(readonly _gameEngine: gameEngine){}

    load(): void {
        for(const [layerName, layer] of this._layersCollection){
            this._gameEngine.renderer.addLayer(layer)
        }
    }

    unload(): void {
        for(const [layerName, layer] of this._layersCollection){
            console.log(layer.name)
            this._gameEngine.renderer.removeLayer(layer)
        }
        for(const [timeoutName, timeout] of this._timeoutsCollection){
            timeout.stop();
        }
    }
}