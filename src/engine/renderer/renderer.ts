import { RenderLayerInterface } from "../types/renderLayerInterface";
import { Context } from "../context";

/**
 * Manage rendering of layers in context
 */
export class Renderer{

    
    
    /**
     * Animtion Frame ID, in case we have to stop rendering
     */
    private _requestAnimationFrameID: number;

    /**
     * Last render tick
     */    
    private _tick : number = 0;

    /**
     * Rendering layers
     */
    private _layersCollection: Map<string, RenderLayerInterface> = new Map();

    constructor(private readonly context: Context){}

    /**
     * Rendering loop
     */
    render(currentTick: number): void {
        this.context.clear();
        for(const [layerName, layer] of this._layersCollection){
            layer.draw(this.context);
        }
        this.updateTick(currentTick);
    }

    /**
     * get last rendering tick
     */
    get lastTick(): number{
        return this._tick;
    }

    /**
     * Pretty straight forward, isn't it ?
     * @param currentTick 
     */
    private updateTick(currentTick: number): void{
        this._tick = currentTick;
    }

    /**
     * Adds a layer to the rendering loop
     * Each layer has to be loaded in order
     * @param layer The RenderLayer to add in loop
     */
    addLayer(layer: RenderLayerInterface): void{
        this._layersCollection.set(layer.name, layer);
    }

    /**
     * get Layers of the rendering loop
     */
    get layers(): Map<string, RenderLayerInterface> {
        return this._layersCollection;
    }
    
}