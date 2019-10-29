import { Context } from "../context";
import { gameObjectInterface } from "./gameObjectTypes";

export interface RenderLayerInterface{
    name: string;
    gameObjectsCollection: Map<string, gameObjectInterface>;

    addObject(gameObject: gameObjectInterface) : string
    removeObject(gameObject: gameObjectInterface) : void
    draw(context: Context) : void
    update(delta: number) : void
}