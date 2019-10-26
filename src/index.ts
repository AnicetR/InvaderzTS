import { spaceinvaderz } from "./game/spaceinvaderz";

//createContextCanvas
const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.height = 800;
canvas.width = 750;

document.body.append(canvas);

new spaceinvaderz(canvas);