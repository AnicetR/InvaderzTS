
import { position, gameObjectInterface } from "../types/gameObjectTypes";
import { Sprite } from "./sprite";
import { Context } from "../context";
import { RenderLayer } from "../renderer/renderLayer";

/**
 * gameObject base class
 */
export class gameObject implements gameObjectInterface{

    /**
     * uuid of the object
     */
    uuid: string;   
    
    /**
     * RenderLayer in wich the gameObject is rendered
     */
    renderLayerName: string;
    
    /**
     * x-y position of the object
     */
    position: position = {
        x: 0,
        y: 0
    };

    /**
     * The sprite of the object
     */
    sprite: Sprite;

    /**
     * is the object registered in a layer ?
     */
    private registered: boolean = false;

    constructor(){
    }

    /**
     * Callback called before draw method in the rendering process
     */
    update(): void {
        if(this.sprite.loaded == true){
           this.sprite.position = this.position;
        }
    }

    /**
     * Callback called to render the object by the renderer
     */
    draw(context: Context): void {
        if(this.sprite.loaded == true){
            context.drawSprite(this.sprite)
        }
    }

    /**
     * Register gameobject in the renderingLayer
     * @param layer
     */
    registerToLayer(layer: RenderLayer): void {
        this.uuid = layer.addObject(this);
    }


}