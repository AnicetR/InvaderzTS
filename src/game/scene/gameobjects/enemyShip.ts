
import { gameObject } from "../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../engine/baseObjects/sprite";
import { position } from "../../../engine/types/gameObjectTypes";

import * as ennemyShipSprite from "../../assets/sprites/ships/enemy1.png";
import * as ennemyShipSpriteDamage1 from "../../assets/sprites/ships/enemy1_damage_1.png";
import * as ennemyShipSpriteDamage2 from "../../assets/sprites/ships/enemy1_damage_2.png";
import * as ennemyShipSpriteDamage3 from "../../assets/sprites/ships/enemy1_damage_3.png";

import { gameEngine } from "../../../engine/gameEngine";
import { rectCollisionBox } from "../../../engine/collisions/rectCollisionBox";
import { collisionManager } from "../../../engine/collisions/collisionManager";
import { Score } from "../../stores/score";
import { Rate } from "../../../engine/utils/rate";
import { laser, laserDirection } from "./projectiles/laser";
import { minify } from "html-minifier";
import { ennemyLaser } from "./projectiles/enemyLaser";
import { starAnimation } from "./misc/starAnimation";

export class ennemyShip extends gameObject{

    position: position = {
        x: 0,
        y: 0
    }

    collisionBox: rectCollisionBox = new rectCollisionBox(
        40,
        72,
        'ennemy',
        ['playership', 'laser'],
        this.onCollide.bind(this)
    );

    movementType: number = 0;

    movementAngle: number = 0;
    movementAngleMax: number = 360;
    movementRadius: number = 1.5;

    private fireRate: Rate = new Rate(1000);

    damage: number  = 0;

    private isDestroyed: boolean = false;
    _animationRate: Rate = new Rate(10);
    _animationIteration: number = 0;

    constructor(position: position, readonly velocity: number){
        super();
        this.position = position;

        this.spriteCollection = [
            new Sprite(ennemyShipSprite),
            new Sprite(ennemyShipSpriteDamage1),
            new Sprite(ennemyShipSpriteDamage2),
            new Sprite(ennemyShipSpriteDamage3)
        ]
        this.sprite = this.spriteCollection[this.damage];

        this.movementType = parseInt((Math.random() * 2).toFixed(0));
    }

    private movement(velocity: number, delta: number){
        switch(this.movementType){
            case 0: 
                this._circleMovement(velocity);
            default:
                this._straightMovement(velocity, delta);
        }
    }

    private _circleMovement(velocity: number){
        this.movementAngle += velocity;
        if(this.movementAngle > this.movementAngleMax){
            this.movementAngle = 0;
        }
        this.position.x += Math.cos(this.movementAngle)*this.movementRadius;
        this.position.y += Math.sin(this.movementAngle)*this.movementRadius + 0.5;
    }

    private _straightMovement(velocity: number, delta: number){
        this.position.y += (velocity*10) * delta;
    }


    update(delta: number): void {
        
        if(!this.isDestroyed){
            this.movement(this.velocity, delta);

            this.fireRate.do(() => {
                if(Math.random() > 0.6){
                    const laserP = new ennemyLaser({
                        x: this.position.x + this.sprite.image.width / 2,
                        y: this.position.y + this.sprite.image.height / 2
                    },
                    0.5);
                    laserP.registerToLayer(this.renderLayer);
                }
            });
        }

        if(this.sprite.loaded){
            
            if(this.isDestroyed){
                this._animationRate.do((() => {
                    if(this._animationIteration < 40){
                        this.sprite.image.height = this.sprite.image.height * 0.95;
                        this.sprite.image.width = this.sprite.image.width * 0.95;
                        this.position.x = this.position.x + this.sprite.image.height * 0.05;
                        this.position.y = this.position.y + this.sprite.image.width * 0.05;
                    }else{
                        new starAnimation({
                            x: this.sprite.position.x - this.sprite.image.height / 2,
                            y: this.sprite.position.y - this.sprite.image.width / 2
                        }).registerToLayer(this.renderLayer);
                        this.destroy();
                    }
                    this._animationIteration++;
                }).bind(this))
            }
            this.sprite.position = this.collisionBox.position = this.position;
        }
    }

    onCollide(){
        this.damage++;
        if(this.damage >= 3){
            this.isDestroyed = true;
            Score.instance.addPoints(150);
            this.collisionBox.destroy();
            this.sprite = this.spriteCollection[3];
            return;
        }
        this.sprite = this.spriteCollection[this.damage];
        //collisionManager.instance.removeCollision(this.collisionBox);
    }

    destroy(){
        this.renderLayer.removeObject(this);
    }
}