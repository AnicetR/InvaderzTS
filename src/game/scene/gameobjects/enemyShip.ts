
import { gameObject } from "../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../engine/baseObjects/sprite";
import { position } from "../../../engine/types/gameObjectTypes";

import * as ennemyShipSprite from "../../assets/sprites/ships/enemy1.png";
import * as ennemyShipSpriteDamage1 from "../../assets/sprites/ships/enemy1_damage_1.png";
import * as ennemyShipSpriteDamage2 from "../../assets/sprites/ships/enemy1_damage_2.png";

import { gameEngine } from "../../../engine/gameEngine";
import { rectCollisionBox } from "../../../engine/collisions/rectCollisionBox";
import { collisionManager } from "../../../engine/collisions/collisionManager";
import { Score } from "../../stores/score";
import { Rate } from "../../../engine/utils/rate";
import { laser, laserDirection } from "./projectiles/laser";
import { minify } from "html-minifier";
import { ennemyLaser } from "./projectiles/enemyLaser";

export class ennemyShip extends gameObject{

    position: position = {
        x: 0,
        y: 0
    }

    collisionBox: rectCollisionBox = new rectCollisionBox(
        40,
        40,
        'ennemy',
        ['playership', 'laser'],
        this.onCollide.bind(this)
    );

    movementAngle: number = 0;
    movementAngleMax: number = 360;
    movementRadius: number = 1.5;

    private fireRate: Rate = new Rate(1000);

    damage: number  = 0;

    constructor(position: position, readonly velocity: number){
        super();
        this.position = position;

        this.spriteCollection = [
            new Sprite(ennemyShipSprite),
            new Sprite(ennemyShipSpriteDamage1),
            new Sprite(ennemyShipSpriteDamage2)
        ]
        this.sprite = this.spriteCollection[this.damage];
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
        this.movement(this.velocity);

        this.fireRate.do(() => {
            if(Math.random() > 0.6){
                const laserP = new ennemyLaser({
                    x: this.position.x + (this.sprite.image.width / 2),
                    y: this.position.y + this.sprite.image.height
                 },
                  0.5);
                laserP.registerToLayer(this.renderLayer);
            }
        });

        if(this.sprite.loaded){
            this.sprite.position = this.collisionBox.position = this.position;
        }
    }

    onCollide(){
        this.damage++;
        if(this.damage >= 3){
            this.destroy();
        }
        this.sprite = this.spriteCollection[this.damage];
        //collisionManager.instance.removeCollision(this.collisionBox);
    }

    destroy(){
        Score.instance.addPoints(150);
        this.collisionBox.destroy();
        this.renderLayer.removeObject(this);
    }
}