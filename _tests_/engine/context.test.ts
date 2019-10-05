import { Context } from "../../src/engine/context";
import { Sprite } from "../../src/engine/baseObjects/sprite";

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.height = 300;
canvas.width = 150;
const context = new Context(canvas);

test('context.construct', () => {
    expect(context).toBeInstanceOf(Context)
})


test('context.boundaries', () => {
    expect(context.boundaries)
    .toStrictEqual(
        {"maxX": 300, "maxY": 150}
    )
})

test('context.getCtx', () => {
    expect(context.get()).toBe(canvas.getContext("2d"))
})

test('context.managerFunction(.save, .restore, .clear)', () => {
    //@ts-ignore
    const events = context.get().__getEvents();
    context.save();
    context.clear();
    context.restore();
    expect(context.get()).toMatchSnapshot();
}) 

test('context.drawSprite', () => {
    //@ts-ignore
    const calls  = context.get().__getDrawCalls();
    const imageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA3ADcAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wgARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAX8f/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9oADAMBAAIAAwAAABAf/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPxB//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPxB//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxB//9k=";
    const sprite = new Sprite(imageBase64);
    context.drawSprite(sprite);
    expect(context.get()).toMatchSnapshot();
})



