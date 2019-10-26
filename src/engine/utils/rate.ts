
export class Rate{
    private lastExec: number;

    constructor(private readonly eachMs: number){
    }

    do(callback: CallableFunction){
        let currentTime = performance.now();
        if(typeof this.lastExec !== typeof undefined || (this.lastExec + this.eachMs) >= currentTime){
            callback();
            this.lastExec = currentTime;
        }
    }
}