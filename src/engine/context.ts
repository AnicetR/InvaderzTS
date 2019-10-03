import {boundaries} from './types/contextTypes';
import { Sprite } from './baseObjects/sprite';

/**
 * engine/context.ts
 * Manages the context
 */
export class Context {
    
    public boundaries: boundaries;
    private readonly context: CanvasRenderingContext2D;

    /**
     * constructor
     * @param canvas The canvas element to render to
     */
    constructor(private readonly canvas: HTMLCanvasElement){
        this.context = this.canvas.getContext('2d');

        this.boundaries = {
            maxX : this.canvas.height,
            maxY : this.canvas.width
        };
    }

    /**
     * returns the current canvas context
     */
    public get() : CanvasRenderingContext2D {
        return this.context;
    }

    /**
     * save the state of the canvas context in a stack
     */
    public save() : void {
        this.context.save();
    }

    /**
     * Clears the canvas content
     */
    public clear() : void{
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    /**
     * Draw a sprite into context
     * @param sprite Sprite to draw
     */
    public drawSprite(sprite: Sprite) : void {
        this.context.drawImage(sprite, sprite.x, sprite.y, sprite.width, sprite.height);
    }
}

