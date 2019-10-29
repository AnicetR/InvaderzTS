import { keyDownStore } from "./stores/inputs/keysDownStore";

/**
 * Inputs Manages keyboard inputs.
 */
export class Inputs {

    /**
     * Current keys down
     */
    public readonly keysDown: any; 

    /**
     * defines document based callbacks
     */
    constructor(){
        this.keysDown = keyDownStore.instance;

        document.onkeydown = (event) => {
            this.keysDown.addKey(event.keyCode);
        }

        document.onkeyup = (event) => {
            this.keysDown.removeKey(event.keyCode);
        }
    }

    /**
     * Check if a specific key is down or not
     * @param keyCode 
     */
    isKeyDown(keyCode: number) : boolean 
    {
        return this.keysDown.state.includes(keyCode);
    }

}