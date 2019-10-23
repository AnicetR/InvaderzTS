import { Context } from "../context";
import { gameObjectInterface } from "./gameObjectTypes";

export interface RenderLayerInterface{
    name: string;
    gameObjects: Array<gameObjectInterface>;

    addObject(gameObject: gameObjectInterface) : string
    removeObject(uuid: string) : void
    draw(context: Context) : void
    update(delta: number) : void
}