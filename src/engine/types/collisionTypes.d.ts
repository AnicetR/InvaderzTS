import { position } from "./gameObjectTypes"

export interface collisionBoxInterface {
    uuid: string,
    position: position,
    height: number,
    width: number,
    //radius?: number,
    //shape: collisionBoxShape,
    type: string,
    collideWith: Array<string>|string,
    onCollide: CallableFunction;
}

export enum collisionBoxShape {
    Rect,
    Circle
}