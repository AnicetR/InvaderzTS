import { position } from "../types/gameObjectTypes";

/**
 * Sprite object
 */

export class Sprite{
    
    /**
     * Sprite position on the canvas
     */
    public position: position = {
        x: 0,
        y: 0
    };

    /**
     * Is the sprite image loaded in browser ?
     */
    public loaded: boolean = false;

    public image: HTMLImageElement;

    /**
     * 
     * @param imagePath local path of the image to show
     */
    constructor(private readonly imagePath: string){
        this.image = new Image;
        this.image.src = imagePath;
        this.image.onload = () => {
            this.loaded = true;
        }
    }

}