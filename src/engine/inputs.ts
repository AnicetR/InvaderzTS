/**
 * Inputs Manages keyboard inputs.
 */
export class Inputs {

    /**
     * Current keys down
     */
    public readonly keyCodesDown: Array<number> = [];

    /**
     * defines document based callbacks
     */
    constructor(){
        document.onkeydown = (event) => {
            const keyCode: number = event.keyCode;
            const keyCodeIndex: number = this.keyCodesDown.indexOf(keyCode);
            if(keyCodeIndex == -1){
                this.keyCodesDown.push(keyCode)
            }
        }

        document.onkeyup = (event) => {
            const keyCode: number = event.keyCode;
            const keyCodeIndex: number = this.keyCodesDown.indexOf(keyCode);
            if(keyCodeIndex >= -1){
                this.keyCodesDown.splice(keyCodeIndex, 1);
            }
        }
    }

    /**
     * Check if a specific key is down or not
     * @param keyCode 
     */
    isKeyDown(keyCode: number) : boolean {
        return this.keyCodesDown.includes(keyCode);
    }

}