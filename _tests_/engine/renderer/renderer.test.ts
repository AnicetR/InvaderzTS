import { RenderLayer } from "../../../src/engine/renderer/renderLayer";
import { Renderer } from "../../../src/engine/renderer/renderer";
import { Context } from "../../../src/engine/context";


const canvas: HTMLCanvasElement = document.createElement('canvas');
const context: Context = new Context(canvas);

const renderer: Renderer = new Renderer(context);

test('renderer.addLayer', () => {
    const layer: RenderLayer = new RenderLayer('testLayer');
    renderer.addLayer(layer);
    expect(renderer.layers.has(layer.name)).toBe(true);
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
