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
    gameObjects: Array<gameObjectInterface> = [];
    

    constructor(name: string){
        this.name = name;
    }

    /**
     * Adds an object to the layer
     * @param gameObject gameObject to add to the layer
     */
    addObject(gameObject: gameObjectInterface): string {
        const GOuuid = uuid();
        this.gameObjects.push(gameObject);
        return GOuuid;
    }

    /**
     * Removes an object to the layer
     * @param gameObject gameObject to remove from the layer
     */
    removeObject(GOuuid: string): void {
        this.gameObjects.forEach(
            (gameObject : gameObjectInterface, index: number) => {
                if(gameObject.uuid == GOuuid){
                    this.gameObjects.splice(index, 1)
                }
            }
        )
    }

    /**
     * draw loop of the layer
     * @param context Context to draw in
     */
    draw(context: Context): void {
        this.gameObjects.forEach(
            (gameObject: gameObjectInterface) => {
                context.save();
                gameObject.draw(context);
                context.restore();
                if(    gameObject.position.x > context.boundaries.maxX + 500
                    || gameObject.position.y > context.boundaries.maxY + 500
                    || gameObject.position.x < -500
                    || gameObject.position.y < -500){
                        this.removeObject(gameObject.uuid)
                    }
            }
        )
    }

    /**
     * Updates the gameObjects
     */
    update(delta: number): void{
        this.gameObjects.forEach(
            (gameObject: gameObjectInterface) => {
                gameObject.update(delta);
            }
        )
    }

}