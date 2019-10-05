
import { gameObject } from "../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../engine/baseObjects/sprite";
import { position } from "../../../engine/types/gameObjectTypes";
import * as testImagePath from "../../assets/test.jpg";

export class testSprite extends gameObject{
    sprite: Sprite;

    position: position = {
        x: 0,
        y: 0
    }

    constructor(){
        super();
        this.sprite = new Sprite(testImagePath);
    }

    update(): void {
        this.position.x += 0.3;
        if(this.sprite.loaded){
            this.sprite.position = this.position;
        }
    }
}