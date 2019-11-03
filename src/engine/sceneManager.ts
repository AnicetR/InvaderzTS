import { sceneInterface } from "./types/scenesTypes";

export class sceneManager {
    scenesCollection: Map<string, sceneInterface> = new Map();
    _currentScene: sceneInterface;

    constructor(){}

    changeScene(sceneName: string){
        console.log(this._currentScene);
        if(this._currentScene){
            this._currentScene.unload();
        }
        this._currentScene = this.scenesCollection.get(sceneName);
        this._currentScene.load();
    }
}

