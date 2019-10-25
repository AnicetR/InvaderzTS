import { Renderer } from "./renderer/renderer";
import { fpsHistoryStore } from "./stores/debug/fpsHistoryStore";

export class gameLoop{

    

    //The game loop will be iterated 30 times per second
    private _loopIterationsPerSecond: number = 30;
    private _timeStep: number = 1000/this._loopIterationsPerSecond;
    
    private _isPaused: boolean = false;
    private _delta: number = 0;

    //debug store and stuff
    private _frameStore: fpsHistoryStore;


    /**
     * requestAnimationFrame window callback with polyfill
     */
    private readonly _requestAnimationFrame: CallableFunction = 
        (window.requestAnimationFrame        ||
        window.webkitRequestAnimationFrame  ||
        function(callback: CallableFunction){
            window.setTimeout( callback(Date.now()), 1000/this._loopIterationsPerSecond );
        }).bind(window);
    

    constructor(private readonly _renderer: Renderer){
        this._frameStore = fpsHistoryStore.getInstance();
    }

    start() : void{
        this.loop(performance.now());
    }

    private loop(currentTick: number) : void
    {   
        //Don't do anything if the render is ahead of his time
        if(currentTick < (this._renderer.lastTick + this._timeStep)){
            this._requestAnimationFrame(this.loop.bind(this));
            return;
        }

        //Delta definition in case the tick is in advance on frames rendering
        this._delta = currentTick - this._renderer.lastTick;

        //Let's update with the delta, to catch up on render time
        while(this._delta >= this._timeStep){
            this.updateLayers();
            this._delta -= this._timeStep;

            //This is like a realy simple not realy right method to do some interpolation
            //So the gameObject Properties are updated a last time with the left delta as factor
            if(this._delta < this._timeStep){
                this.updateLayers();
            }
        }
        
        //Render
        this.launchRender(currentTick);
    }

    private launchRender(currentTick: number): void
    {
        this._frameStore.fpsLog(currentTick, this._renderer.lastTick);
        this._renderer.render(currentTick);
        this._requestAnimationFrame(this.loop.bind(this));
    }

    private updateLayers(): void
    {
        this._renderer.layers.forEach((layer) => layer.update(this._delta));
    }

}