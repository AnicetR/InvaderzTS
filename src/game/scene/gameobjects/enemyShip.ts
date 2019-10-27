
import { gameObject } from "../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../engine/baseObjects/sprite";
import { position } from "../../../engine/types/gameObjectTypes";

import * as playerShipNormal from "../../assets/sprites/playership/player.png";
import * as playerShipRight from "../../assets/sprites/playership/playerRight.png";
import * as playerShipLeft from "../../assets/sprites/playership/playerLeft.png";

import { gameEngine } from "../../../engine/gameEngine";
import { rectCollisionBox } from "../../../engine/collisions/rectCollisionBox";
import { collisionManager } from "../../../engine/collisions/collisionManager";

export class ennemyShip extends gameObject{
    spriteCollection: Array<Sprite>;

    position: position = {
        x: gameEngine.getInstance().context.boundaries.maxX / 2,
        y: gameEngine.getInstance().context.boundaries.maxY / 2
    }


    collisionBox: rectCollisionBox = new rectCollisionBox(
        100,
        100,
        'ennemy',
        ['playership'],
        (() => {this.onCollide()}).bind(this)
    );

    constructor(){
        super();
        this.spriteCollection = [
            new Sprite(playerShipNormal),
            new Sprite(playerShipLeft),
            new Sprite(playerShipRight),
        ];

        this.sprite = this.spriteCollection[0];
    }

    update(delta: number): void {
        if(this.sprite.loaded){
            this.sprite.position = this.collisionBox.position = this.position;
        }
    }

    onCollide(){
        collisionManager.instance.removeCollision(this.collisionBox);
    }
}