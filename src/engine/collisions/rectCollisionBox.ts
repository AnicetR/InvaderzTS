import { collisionBoxInterface } from "../types/collisionTypes";
import { position } from "../types/gameObjectTypes";
import { collisionManager } from "./collisionManager";

export class rectCollisionBox implements collisionBoxInterface{
    uuid: string;
    position: position = {
        x: 0,
        y: 0
    }; 

    constructor(
        public height: number, 
        public width: number, 
        public type: string,
        public collideWith: string | string[], 
        public onCollide: CallableFunction
        ){
        this.uuid = collisionManager.instance.addCollision(this);
    }
}