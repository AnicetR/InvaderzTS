import {boundaries} from './types/contextTypes';

export class Context {
    private readonly context: CanvasRenderingContext2D;
    private readonly boundaries: boundaries;

    constructor(private readonly canvas: HTMLCanvasElement){

        this.context = this.canvas.getContext('2d');
        this.boundaries.maxX = this.context.canvas.height;
        this.boundaries.maxY = this.context.canvas.width;

    }
}

