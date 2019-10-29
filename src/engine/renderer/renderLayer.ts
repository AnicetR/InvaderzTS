import { RenderLayerInterface } from "../types/renderLayerInterface";
import { uuid } from "../utils/uuid";
import { Context } from "../context";
import { gameObjectInterface } from "../types/gameObjectTypes";

/**
 * RenderLayer object : Manage objects in layer
 */
export class RenderLayer implements RenderLayerInterface{
    /**
     * Name of the renderLayer
     */
    name: string;

    /**
     * contains all gameObjectInterface to be rendered in the current layer
     */
    gameObjectsCollection:  Map<string, gameObjectInterface> =  new Map();
    

    constructor(name: string){
        this.name = name;
    }

    /**
     * Adds an object to the layer
     * @param gameObject gameObject to add to the layer
     */
    addObject(gameObject: gameObjectInterface): string {
        const GOuuid = uuid();
        this.gameObjectsCollection.set(GOuuid, gameObject);
        return GOuuid;
    }

    /**
     * Removes an object to the layer
     * @param gameObject gameObject to remove from the layer
     */
    removeObject(gameObject: gameObjectInterface): void {
        if(this.gameObjectsCollection.has(gameObject.uuid)){
            this.gameObjectsCollection.delete(gameObject.uuid)
        }
    }

    /**
     * draw loop of the layer
     * @param context Context to draw in
     */
    draw(context: Context): void {
        this.gameObjectsCollection.forEach(
            (gameObject: gameObjectInterface) => {
                context.save();
                gameObject.draw(context);
                context.restore();
                if(    gameObject.position.x > context.boundaries.maxX + 500
                    || gameObject.position.y > context.boundaries.maxY + 500
                    || gameObject.position.x < -500
                    || gameObject.position.y < -500){
                        this.removeObject(gameObject)
                    }
            }
        )
    }

    /**
     * Updates the gameObjects
     */
    update(delta: number): void{
        this.gameObjectsCollection.forEach(
            (gameObject: gameObjectInterface) => {
                gameObject.update(delta);
            }
        )
    }

}