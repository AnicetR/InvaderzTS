
import { gameObject } from "../../../../engine/baseObjects/gameObject";
import { Sprite } from "../../../../engine/baseObjects/sprite";
import { position } from "../../../../engine/types/gameObjectTypes";
import * as backgroundImagePath from "../../../assets/sprites/background/starBackground.png";
import { Context } from "../../../../engine/context";

export class pattern extends gameObject{
    uuid: string;
    
    sprite: Sprite;
    pattern: CanvasPattern;

    offset: position = {
        x: 0,
        y: 0
    }

    private velocity: number = 0.05;

    constructor(){
        super();
        this.sprite = new Sprite(backgroundImagePath); 
    }

    update(delta: number): void {
        let speed: number = this.velocity * delta;
        this.offset.y += speed;
        if(this.offset.y >= this.sprite.image.height){
            this.offset.y = 0;
        }
    }

    draw(context: Context): void {
        

        if(this.sprite.loaded && typeof this.pattern == typeof undefined){
            this.pattern = context.get().createPattern(this.sprite.image, 'repeat');
        }
        if(typeof this.pattern != typeof undefined){
            context.get().fillStyle = this.pattern;
            context.get().translate(this.offset.x, this.offset.y);
            context.get().fillRect(this.offset.x*-1, this.offset.y*-1, context.boundaries.maxY*2, context.boundaries.maxX)
        }
    }
}