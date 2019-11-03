import { intervalInterface } from "../types/intervalTypes";

export class interval implements intervalInterface{
    _id: number;

    constructor(readonly each: number,
                readonly callback: CallableFunction){}

    start(){
        if(!this._id){
            this._id = setInterval(
                this.callback,
                this.each
            );
        }else{
            throw new Error('Timeout already running');
        }
    }

    stop(){
        if(this._id){
            clearTimeout(this._id)
            this._id = null;
        }
    }
}