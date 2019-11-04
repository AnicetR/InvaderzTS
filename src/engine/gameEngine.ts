import { Context } from "./context";
import { Renderer } from "./renderer/renderer";
import { Inputs } from "./inputs";
import { gameLoop } from "./gameLoop";
import { sceneManager } from "./sceneManager";

/**
 * gameEngine manager
 */
export class gameEngine{
    public readonly context : Context;
    public readonly renderer : Renderer;
    public readonly inputs : Inputs;
    public readonly gameLoop : gameLoop;
    public readonly sceneMgr : sceneManager;

    private static _instance: gameEngine;

    /**
     * Construct and launch the gameEngine
     * @param canvas 
     */
    constructor(private readonly canvas: HTMLCanvasElement){
        this.context = new Context(this.canvas);
        
        this.inputs = new Inputs();
        this.renderer = new Renderer(this.context);
        this.gameLoop = new gameLoop(this.renderer);
        this.sceneMgr = new sceneManager();

        this.gameLoop.start();
    }

    static getInstance(canvas?: HTMLCanvasElement): gameEngine {
        if(typeof canvas === typeof undefined
            && typeof gameEngine._instance === typeof undefined){
                throw new Error('if gameEngine has not been initialized, you must specify the canvas argument');
            }
        if(typeof gameEngine._instance === typeof undefined){
            return gameEngine._instance = new gameEngine(canvas);
        }          
        return gameEngine._instance;
    }
}