import { gameEngine } from "../../src/engine/gameEngine";
import { Context } from "../../src/engine/context";
import { Renderer } from "../../src/engine/renderer/renderer";

const canvas: HTMLCanvasElement = document.createElement('canvas');
const engine = new gameEngine(canvas);

test('engine.construct', () => {
    expect(engine).toBeInstanceOf(gameEngine)
})

test('engine.context', () => {
    expect(engine.context).toBeInstanceOf(Context)
})

test('engine.renderer', () => {
    expect(engine.renderer).toBeInstanceOf(Renderer)
})


