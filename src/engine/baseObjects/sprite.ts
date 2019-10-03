export class Sprite extends Image {
    
    private xPosition: number = 0;
    private yPosition: number = 0;

    constructor(private readonly imagePath: string){
        super();
        this.src = this.imagePath;
    }

    get x() : number{
        return this.xPosition;
    }

    set x(newValue : number){
        this.xPosition = newValue;
    }

    get y() : number{
        return this.xPosition;
    }

    set y(newValue : number){
        this.xPosition = newValue;
    }

}