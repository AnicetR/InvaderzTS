
import { gameObject } from "../../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../../engine/baseObjects/sprite";
import { position } from "../../../../engine/types/gameObjectTypes";

import * as laserBlue01Sprite from "../../../assets/sprites/lasers/laserBlue01.png";
import * as laserBlue02Sprite from "../../../assets/sprites/lasers/laserBlue02.png";
import * as laserBlue03Sprite from "../../../assets/sprites/lasers/laserBlue03.png";
import * as laserBlue04Sprite from "../../../assets/sprites/lasers/laserBlue04.png";
import * as laserBlue05Sprite from "../../../assets/sprites/lasers/laserBlue05.png";
import * as laserBlue06Sprite from "../../../assets/sprites/lasers/laserBlue06.png";
import * as laserBlue07Sprite from "../../../assets/sprites/lasers/laserBlue07.png";
import * as laserBlue08Sprite from "../../../assets/sprites/lasers/laserBlue08.png";
import * as laserBlue09Sprite from "../../../assets/sprites/lasers/laserBlue09.png";

import { rectCollisionBox } from "../../../../engine/collisions/rectCollisionBox";
import { Rate } from "../../../../engine/utils/rate";

export enum laserDirection{
    top,
    bottom,
    left,
    right
}

export class laser extends gameObject{

    collisionBox: rectCollisionBox = new rectCollisionBox(
        50,
        10,
        'laser',
        ['ennemy'],
        this.onCollide.bind(this)
    );

    currentIteration: number = 0;

    isExploding: boolean = false;
    _animationRate: Rate = new Rate(50);
    _animationIteration: number = 0;


    constructor(position: position, readonly velocity: number, readonly direction: laserDirection){
        super();
        this.position = Object.assign({}, position);

        this.spriteCollection = [
            new Sprite(laserBlue01Sprite),
            new Sprite(laserBlue02Sprite),
            new Sprite(laserBlue03Sprite),
            new Sprite(laserBlue04Sprite),
            new Sprite(laserBlue05Sprite),
            new Sprite(laserBlue06Sprite),
            new Sprite(laserBlue07Sprite),
            new Sprite(laserBlue08Sprite),
            new Sprite(laserBlue09Sprite)
        ]

        this.sprite = this.spriteCollection[0];
    }

    private move(delta: number){
        if(this.direction == laserDirection.top){
            this.position.y -= delta * this.velocity;
        }
        if(this.direction == laserDirection.bottom){
            this.position.y += delta * this.velocity;
        }
        if(this.direction == laserDirection.left){
            this.position.x -= delta * this.velocity;
        }
        if(this.direction == laserDirection.right){
            this.position.x += delta * this.velocity;
        }
        
    }

    update(delta: number): void { 
        if(this.currentIteration < 5){
         this.sprite = this.spriteCollection[this.currentIteration];
        }
        if(this.isExploding){
            this._animationRate.do((() => {
                if(this._animationIteration < 4){
                    this.sprite = this.spriteCollection[5+this._animationIteration];
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
    }

    destroy(){
        this.collisionBox.destroy();
        this.renderLayer.removeObject(this);
    }
}