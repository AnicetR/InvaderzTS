
import { gameObject } from "../../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../../engine/baseObjects/sprite";
import { position } from "../../../../engine/types/gameObjectTypes";

import * as starAnimation1 from "../../../assets/sprites/starAnimation/starAnimation1.png";
import * as starAnimation2 from "../../../assets/sprites/starAnimation/starAnimation2.png";
import * as starAnimation3 from "../../../assets/sprites/starAnimation/starAnimation3.png";
import * as starAnimation4 from "../../../assets/sprites/starAnimation/starAnimation4.png";

import { Rate } from "../../../../engine/utils/rate";

export class starAnimation extends gameObject{

    position: position = {
        x: 0,
        y: 0
    }

    _animationRate: Rate = new Rate(40);
    _animationIteration: number = 0;

    constructor(position: position){
        super();
        this.position = position;

        this.spriteCollection = [
            new Sprite(starAnimation1),
            new Sprite(starAnimation2),
            new Sprite(starAnimation3),
            new Sprite(starAnimation4)
        ]
        this.sprite = this.spriteCollection[0];
    }


    update(delta: number): void {
        if(this.sprite.loaded){
            this.sprite.position = this.position;
            this._animationRate.do((() => {
                if(this._animationIteration < 4){
                    this.sprite = this.spriteCollection[this._animationIteration];
                }else{
                    this.destroy();
                }
                this._animationIteration++;
            }).bind(this))
        }
    }

    destroy(){
        this.renderLayer.removeObject(this);
    }
}