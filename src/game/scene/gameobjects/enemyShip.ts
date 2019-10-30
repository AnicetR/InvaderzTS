
import { gameObject } from "../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../engine/baseObjects/sprite";
import { position } from "../../../engine/types/gameObjectTypes";

import * as ennemyShipSprite from "../../assets/sprites/ships/enemy1.png";

import { gameEngine } from "../../../engine/gameEngine";
import { rectCollisionBox } from "../../../engine/collisions/rectCollisionBox";
import { collisionManager } from "../../../engine/collisions/collisionManager";

export class ennemyShip extends gameObject{

    position: position = {
        x: gameEngine.getInstance().context.boundaries.maxX / 2,
        y: 10
    }

    collisionBox: rectCollisionBox = new rectCollisionBox(
        40,
        60,
        'ennemy',
        ['playership', 'laser'],
        this.onCollide.bind(this)
    );

    movementAngle: number = 0;
    movementAngleMax: number = 360;
    movementRadius: number = 1.5;

    constructor(){
        super();

        this.sprite = new Sprite(ennemyShipSprite);
    }

    private movement(velocity: number){
        this.movementAngle += velocity;
        if(this.movementAngle > this.movementAngleMax){
            this.movementAngle = 0;
        }
        this.position.x = this.position.x + Math.cos(this.movementAngle)*this.movementRadius;
        this.position.y = this.position.y + Math.sin(this.movementAngle)*this.movementRadius + 0.5;
    }

    update(delta: number): void {
        // this.movement(0.02);
        if(this.sprite.loaded){
            this.sprite.position = this.collisionBox.position = this.position;
        }
    }

    onCollide(){
        console.log('BANG')
        //collisionManager.instance.removeCollision(this.collisionBox);
    }
}