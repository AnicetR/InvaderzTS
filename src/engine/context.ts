import {boundaries} from './types/contextTypes';

/**
 * engine/context.ts
 * Manages the context
 */
export class Context {
    private readonly context: CanvasRenderingContext2D;
    private readonly boundaries: boundaries;

    /**
     * constructor
     * @param canvas The canvas element to render to
     */
    constructor(private readonly canvas: HTMLCanvasElement){

        this.context = this.canvas.getContext('2d');
        this.boundaries.maxX = this.context.canvas.height;
        this.boundaries.maxY = this.context.canvas.width;
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
}

