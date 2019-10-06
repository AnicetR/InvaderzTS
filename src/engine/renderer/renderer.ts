import { RenderLayerInterface } from "../types/renderLayerInterface";
import { Context } from "../context";

/**
 * Manage rendering of layers in context
 */
export class Renderer{

    /**
     * requestAnimationFrame window callback with polyfill
     */
    private readonly _requestAnimationFrame: CallableFunction = 
        (window.requestAnimationFrame        ||
        window.webkitRequestAnimationFrame  ||
        function(callback: CallableFunction){
            window.setTimeout( callback, 1000/60 );
        }).bind(window);
    
    /**
     * Last render tick
     */    
    private _tick : number;

    /**
     * Rendering layers
     */
    private _layers: Array<RenderLayerInterface> = [];

    constructor(private readonly context: Context){
        this.updateTick();
        this.render();
    }

    /**
     * Rendering loop
     */
    private render(): void {
        this.context.clear();
        this._layers.forEach(layers => {
            layers.draw(this.context);
        })
        this.updateTick();
        this._requestAnimationFrame(this.render.bind(this));
    }

    /**
     * get last rendering tick
     */
    get lastTick(){
        return this._tick;
    }

    private updateTick(){
        this._tick = Date.now();
    }

    /**
     * Adds a layer to the rendering loop
     * Each layer has to be loaded in order
     * @param layer The RenderLayer to add in loop
     */
    addLayer(layer: RenderLayerInterface){
        this._layers.push(layer);
    }

    /**
     * get Layers of the rendering loop
     */
    get layers(): Array<RenderLayerInterface> {
        return this._layers;
    }
    
}