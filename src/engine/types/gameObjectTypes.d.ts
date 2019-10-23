import { Sprite } from '../baseObjects/sprite';
import { Context } from '../context';
import { RenderLayer } from '../renderer/renderLayer';

export type position = {
    x: number,
    y: number
}

export interface gameObjectInterface{
    uuid: string;
    position: position;
    sprite: Sprite;
    update(delta: number): void;
    draw(context: Context): void;
    registerToLayer(layer: RenderLayer): void;
}