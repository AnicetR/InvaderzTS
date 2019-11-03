import { RenderLayerInterface } from "./renderLayerInterface";
import { gameEngine } from "../gameEngine";

export interface sceneInterface{
    _gameEngine: gameEngine;
    _layersCollection: Map<string, RenderLayerInterface>;

    load(): void
    unload(): void
}