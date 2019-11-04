import { sceneInterface } from "./types/scenesTypes";
import { collisionManager } from "./collisions/collisionManager";

export class sceneManager {
    scenesCollection: Map<string, sceneInterface> = new Map();
    _currentScene: sceneInterface;

    constructor(){}

    changeScene(sceneName: string){
        if(this._currentScene){
            this._currentScene.unload();
            collisionManager.instance.removeAllCollisions();
        }
        this._currentScene = this.scenesCollection.get(sceneName);
        this._currentScene.load();
    }
}

