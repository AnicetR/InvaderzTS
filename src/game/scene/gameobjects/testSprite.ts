
import { gameObject } from "../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../engine/baseObjects/sprite";
import { position } from "../../../engine/types/gameObjectTypes";
import * as testImagePath from "../../assets/test.jpg";
import { keyDownStore } from "../../../engine/stores/inputs/keysDownStore";
import { Inputs } from "../../../engine/inputs";

export class testSprite extends gameObject{
    sprite: Sprite;

    position: position = {
        x: 0,
        y: 0
    }

    private velocity: number = 0.5;

    private inputs: Inputs;
    
    private controls: any = {
        left: 37,
        right: 39,
        leftShift: 16
    }

    constructor(){
        super();
        this.sprite = new Sprite(testImagePath);
        this.inputs = new Inputs();
    }


    private moveRight(speed: number){
        this.position.x += speed;
    }

    private moveLeft(speed: number){
        this.position.x -= speed;
    }

    update(delta: number): void {
        let speed: number = this.velocity * delta;

        if(this.inputs.isKeyDown(this.controls.leftShift)){
            speed = speed * 2;
        }
        if(this.inputs.isKeyDown(this.controls.left)){
            this.moveLeft(speed);
        }
        if(this.inputs.isKeyDown(this.controls.right)){
            this.moveRight(speed);
        }
        
        if(this.sprite.loaded){
            this.sprite.position = this.position;
        }
    }
}