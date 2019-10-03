import { Context } from "./context";

export class gameEngine{
    public readonly context : Context;

    constructor(private readonly canvas: HTMLCanvasElement){
        this.context = new Context(this.canvas);
    }
}