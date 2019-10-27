import { collisionBoxInterface, collisionBoxShape } from "../types/collisionTypes";
import { uuid } from "../utils/uuid";

/**
 * An extremely simple not optimized collision manager
 */
export class collisionManager{
    /**
     * CollisionBox store, every collisionbox on game is registered here
     */
    private store: Map<string, collisionBoxInterface> = new Map();
    /**
     * Collisionmanager instance
     */
    private static _instance: collisionManager;

    static get instance(): collisionManager{
        return !collisionManager._instance ? 
            collisionManager._instance = new collisionManager() 
            : collisionManager._instance;
    }

    /**
     * adds a collision to the store and returns a uuid
     * @param collisionBox 
     */
    addCollision(collisionBox: collisionBoxInterface) : string{
        const collisionBoxUuid = uuid();
        this.store.set(collisionBoxUuid, collisionBox);
        return collisionBoxUuid;
    }

    /**
     * removes a collision from the collection
     * @param collisionBox 
     */
    removeCollision(collisionBox: collisionBoxInterface){
        if( typeof collisionBox !== typeof undefined
            && this.store.has(collisionBox.uuid)){
            this.store.delete(collisionBox.uuid)
        }
    }

    /**
     * check if any collisionBox in the map is colliding with another, and call the "onCollide" callback if it's the case
     */
    checkForCollision(){
        for(const [collisionBoxUuid, collisionBox] of this.store){
            for(const [secondCollisionBoxUuid, secondCollisionBox] of this.store){   

                if(typeof secondCollisionBox !== typeof undefined 
                    && typeof collisionBox !== typeof undefined
                    && secondCollisionBox.uuid !== collisionBox.uuid
                    ){
                    if((typeof collisionBox.collideWith == typeof "" && collisionBox.collideWith == secondCollisionBox.type)
                        || !collisionBox.collideWith.includes(secondCollisionBox.type)
                    ){
                        break;
                    }
                    if(this.checkForCollisionRectWithRect(collisionBox, secondCollisionBox)){
                        collisionBox.onCollide();
                        secondCollisionBox.onCollide();
                    }
                }
            }
        }
    }

    private checkForCollisionRectWithRect(square: collisionBoxInterface, square2: collisionBoxInterface) : boolean{
        return (
            square.position.x < square2.position.x + square2.width
            && square.position.x + square.width > square2.position.x
            && square.position.y < square2.position.y + square2.height
            && square.position.y + square.height > square2.position.y
        )
    }



}