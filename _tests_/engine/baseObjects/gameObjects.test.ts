import { gameObject } from "../../../src/engine/baseObjects/gameObject";
import { Sprite } from "../../../src/engine/baseObjects/sprite";
import { RenderLayer } from "../../../src/engine/renderer/renderLayer";

const gameObjectInstance = new gameObject();
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

test('gameObject.position', () => {
    expect(gameObjectInstance.position).toStrictEqual({x: 0, y: 0});
})

test('gameObject.update', () => {
    gameObjectInstance.position.y = 50;
    gameObjectInstance.position.x = 50;
    waitForSpriteToLoad()
        .then((gameObjectFullyLoaded) => {
            //@ts-ignore
            gameObjectFullyLoaded.update();
            expect(gameObjectInstance.position).toBe(gameObjectInstance.sprite.position);
        })
})

test('gameObject.draw', () => {
    const context: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d');
    
    waitForSpriteToLoad()
        .then((gameObjectFullyLoaded) => {
            //@ts-ignore
            const calls  = context.get().__getDrawCalls();
            //@ts-ignore
            gameObjectFullyLoaded.draw(context);
            expect(context).toMatchSnapshot();
        })
})


test('gameObject.registerLayer', () => {
    const layer: RenderLayer = new RenderLayer('testRenderLayer');
    gameObjectInstance.registerToLayer(layer);

    let uuid: string;
    for(const [GOuuid, gameObject] of layer.gameObjectsCollection){
        if(GOuuid == gameObjectInstance.uuid){
            uuid = gameObject.uuid;
        }
    }

    expect(uuid).not.toBeUndefined;
})


