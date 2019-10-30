
import { position, gameObjectInterface } from "../types/gameObjectTypes";
import { Sprite } from "./sprite";
import { Context } from "../context";
import { RenderLayer } from "../renderer/renderLayer";
import { collisionManager } from "../collisions/collisionManager";
import { collisionBoxInterface } from "../types/collisionTypes";
import { rectCollisionBox } from "../collisions/rectCollisionBox";

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
    renderLayer: RenderLayer;
    
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
     * The sprite Collection of the object
     */
    spriteCollection: Array<Sprite>;

    /**
     * is the object registered in a layer ?
     */
    private registered: boolean = false;

    collisionBox: collisionBoxInterface;

    constructor(){
        if(this.collisionBox){
            collisionManager.instance.addCollision(this.collisionBox);
        }
    }

    /**
     * Callback called before draw method in the rendering process
     */
    update(delta: number): void {
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
        this.renderLayer = layer;
    }


}