
import { gameObject } from "../../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../../engine/baseObjects/sprite";
import { position } from "../../../../engine/types/gameObjectTypes";

import * as laserRed01Sprite from "../../../assets/sprites/lasers/laserRed01.png";
import * as laserRed02Sprite from "../../../assets/sprites/lasers/laserRed02.png";
import * as laserRed03Sprite from "../../../assets/sprites/lasers/laserRed03.png";
import * as laserRed04Sprite from "../../../assets/sprites/lasers/laserRed04.png";
import * as laserRed05Sprite from "../../../assets/sprites/lasers/laserRed05.png";

import { rectCollisionBox } from "../../../../engine/collisions/rectCollisionBox";
import { Rate } from "../../../../engine/utils/rate";

export enum laserDirection{
    top,
    bottom,
    left,
    right
}

export class ennemyLaser extends gameObject{

    collisionBox: rectCollisionBox = new rectCollisionBox(
        50,
        10,
        'ennemyLaser',
        ['playerShip'],
        this.onCollide.bind(this)
    );

    currentIteration: number = 0;

    isExploding: boolean = false;
    _animationRate: Rate = new Rate(50);
    _animationIteration: number = 0;


    constructor(position: position, readonly velocity: number){
        super();
        this.position = Object.assign({}, position);

        this.spriteCollection = [
            new Sprite(laserRed01Sprite),
            new Sprite(laserRed02Sprite),
            new Sprite(laserRed03Sprite),
            new Sprite(laserRed04Sprite),
            new Sprite(laserRed05Sprite)
        ]

        this.sprite = this.spriteCollection[0];
    }

    private move(delta: number){
        this.position.y += delta * this.velocity;
    }

    update(delta: number): void { 
        if(this.isExploding){
            this._animationRate.do((() => {
                if(this._animationIteration < 4){
                    this.sprite = this.spriteCollection[1+this._animationIteration];
                }else{
                    this.destroy();
                }
                this._animationIteration++;
            }).bind(this))
        }else{
             this.move(delta);
        }

        if(this.sprite.loaded){
            this.sprite.position = this.collisionBox.position = {
                y: this.position.y,
                x: this.position.x - (this.sprite.image.width/2)
            };
        }

        this.currentIteration++;
    }

    onCollide(){
        this.isExploding = true;
        this.collisionBox.destroy();
    }

    destroy(){
        this.renderLayer.removeObject(this);
    }
}