
import { gameObject } from "../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../engine/baseObjects/sprite";
import { position } from "../../../engine/types/gameObjectTypes";

import * as playerShipNormal from "../../assets/sprites/ships/playership/player.png";
import * as playerShipRight from "../../assets/sprites/ships/playership/playerRight.png";
import * as playerShipLeft from "../../assets/sprites/ships/playership/playerLeft.png";

import { Inputs } from "../../../engine/inputs";
import { gameEngine } from "../../../engine/gameEngine";
import { rectCollisionBox } from "../../../engine/collisions/rectCollisionBox";
import { PlayerLives } from "../../stores/playerLives";
import { laser, laserDirection } from "./projectiles/laser";
import { Rate } from "../../../engine/utils/rate";
import { Score } from "../../stores/score";

export class playerShip extends gameObject{
    spriteCollection: Array<Sprite>;

    position: position = {
        x: gameEngine.getInstance().context.boundaries.maxX / 2,
        y: gameEngine.getInstance().context.boundaries.maxY - 200
    }

    boundaries: any = {
        x : {
            min: 0,
            max: gameEngine.getInstance().context.boundaries.maxX - 150
        },
        y : {
            min: 0,
            max: gameEngine.getInstance().context.boundaries.maxY + 70
        }
    }

    collisionBox: rectCollisionBox = new rectCollisionBox(
        100,
        100,
        'playerShip',
        ['ennemy', 'ennemyLaser'],
        this.onCollide
    );

    private velocity: number = 0.25;

    private inputs: Inputs;
    
    private controls: any = {
        left: 37,
        right: 39,
        down: 40,
        up: 38,
        leftShift: 16,
        space: 32
    }

    private fireRate: Rate = new Rate(250);

    _scoreOverTime: Rate = new Rate(200);
    _scoreToAdd: number = 1;


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

        if(this.inputs.isKeyDown(this.controls.space)){
            
            this.fireRate.do(() => {
                                        const laserP = new laser(this.position, 1, laserDirection.top);
                                        laserP.registerToLayer(this.renderLayer);
                                    }
                );
        }

        if(!this.inputs.isKeyDown(this.controls.left) && !this.inputs.isKeyDown(this.controls.right)){
            if(this.sprite !== this.spriteCollection[0]){
                this.sprite = this.spriteCollection[0];
            }
        }
        if(this.sprite.loaded){
            this.sprite.position = this.collisionBox.position = {
                y: this.position.y,
                x: this.position.x - (this.sprite.image.width/2)
            };
        }

        this._scoreOverTime.do(() => Score.instance.addPoints(this._scoreToAdd));
    }

    onCollide(){
        PlayerLives.instance.subLife(1);
    }
}