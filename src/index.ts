import { spaceinvaderz } from "./game/spaceinvaderz";

//createContextCanvas
const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.height = 800;
canvas.width = 750;
canvas.style.border = "1px solid red";

document.body.append(canvas);


document.onloadend = () => {
  new spaceinvaderz(canvas);
}