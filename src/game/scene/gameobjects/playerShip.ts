
import { gameObject } from "../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../engine/baseObjects/sprite";
import { position } from "../../../engine/types/gameObjectTypes";

import * as playerShipNormal from "../../assets/sprites/playership/player.png";
import * as playerShipRight from "../../assets/sprites/playership/playerRight.png";
import * as playerShipLeft from "../../assets/sprites/playership/playerLeft.png";

import { Inputs } from "../../../engine/inputs";
import { boundaries } from "../../../engine/types/contextTypes";
import { gameEngine } from "../../../engine/gameEngine";

export class playerShip extends gameObject{
    spriteCollection: Array<Sprite>;

    position: position = {
        x: gameEngine.getInstance().context.boundaries.maxX / 2,
        y: gameEngine.getInstance().context.boundaries.maxY / 2
    }

    boundaries: any = {
        x : {
            min: 0,
            max: gameEngine.getInstance().context.boundaries.maxX - 145
        },
        y : {
            min: 0,
            max: gameEngine.getInstance().context.boundaries.maxY - 40
        }
    }

    private velocity: number = 0.25;

    private inputs: Inputs;
    
    private controls: any = {
        left: 37,
        right: 39,
        down: 40,
        up: 38,
        leftShift: 16
    }

    constructor(){
        super();
        this.spriteCollection = [
            new Sprite(playerShipNormal),
            new Sprite(playerShipLeft),
            new Sprite(playerShipRight),
        ];

        this.sprite = this.spriteCollection[0];
        this.inputs = new Inputs();
    }


    private moveRight(speed: number){
        let nextPosition = this.position.x + speed
        if(nextPosition <= this.boundaries.x.max){
            this.position.x = nextPosition;
        }
        this.sprite = this.spriteCollection[2];
    }

    private moveLeft(speed: number){
        let nextPosition = this.position.x - speed;
        if(nextPosition >= this.boundaries.x.min){
            this.position.x = nextPosition;
        }
        this.sprite = this.spriteCollection[1];
    }

    private moveUp(speed: number){
        let nextPosition = this.position.y - speed;
        if(nextPosition >= this.boundaries.y.min){
            this.position.y = nextPosition;
        }
    }

    private moveDown(speed: number){
        let nextPosition = this.position.y + speed;
        if(nextPosition <= this.boundaries.y.max){
            this.position.y = nextPosition;
        }
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
        if(this.inputs.isKeyDown(this.controls.up)){
            this.moveUp(speed);
        }
        if(this.inputs.isKeyDown(this.controls.down)){
            this.moveDown(speed);
        }

        if(!this.inputs.isKeyDown(this.controls.left) && !this.inputs.isKeyDown(this.controls.right)){
            if(this.sprite !== this.spriteCollection[0]){
                this.sprite = this.spriteCollection[0];
            }
        }
        if(this.sprite.loaded){
            this.sprite.position = this.position;
        }
    }
}