import { Context } from "./context";
import { Renderer } from "./renderer/renderer";

/**
 * gameEngine manager
 */
export class gameEngine{
    public readonly context : Context;
    public readonly renderer : Renderer;

    /**
     * Construct and launch the gameEngine
     * @param canvas 
     */
    constructor(private readonly canvas: HTMLCanvasElement){
        this.context = new Context(this.canvas);
        this.renderer = new Renderer(this.context);
    }
}