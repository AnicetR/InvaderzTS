import { gameObject } from "../../../src/engine/baseObjects/gameObject";
import { Sprite } from "../../../src/engine/baseObjects/sprite";
import { RenderLayer } from "../../../src/engine/renderer/renderLayer";
import { Renderer } from "../../../src/engine/renderer/renderer";
import { Context } from "../../../src/engine/context";


const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.height = 300;
canvas.width = 150;
const context: Context = new Context(canvas);

const renderer: Renderer = new Renderer(context)

const gameObjectInstance: gameObject = new gameObject();
const imageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA3ADcAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wgARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAX8f/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9oADAMBAAIAAwAAABAf/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPxB//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPxB//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxB//9k=";

//Only wait to wait for image to load in sprite. Not ideal, but no idea right now
function waitForSpriteToLoad(){
    return new Promise((resolve, reject) => {
        gameObjectInstance.sprite = new Sprite(imageBase64);
        gameObjectInstance.sprite.image.onload = () => {
            resolve(gameObjectInstance)
        }        
    })
}

test('renderer.addLayer', () => {
    const layer: RenderLayer = new RenderLayer('testLayer');
    renderer.addLayer(layer);
    expect(renderer.layers).toContain(layer);
})

test('renderer.tickUpdate', () => {
    const savedTick: number = renderer.lastTick;
    setTimeout(() => {
        expect(renderer.lastTick).not.toBe(savedTick);
    }, 30)
})

test('renderer.render', () => {
    const layer: RenderLayer = new RenderLayer('testLayer');
    renderer.addLayer(layer);
    setTimeout(() => {
        expect(layer.draw).toBeCalled()
    }, 30)
})
