
import { gameObject } from "../../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../../engine/baseObjects/sprite";
import { position } from "../../../../engine/types/gameObjectTypes";

import * as nebulaImage from "../../../assets/sprites/background/nebula.png";

export class nebula extends gameObject{
    spriteCollection: Array<Sprite>;

    private velocity: number = 0.1;

    position: position = {
        x: 0,
        y: -100
    }
   
    constructor(baseX: number, velocity: number){
        super();
        this.sprite = new Sprite(nebulaImage);
        this.velocity = velocity;
        this.position.x = baseX;
    }

    update(delta: number): void {
        let speed: number = this.velocity * delta;
        this.position.y += speed;

        this.sprite.position = this.position;
    }
}