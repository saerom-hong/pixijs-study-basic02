import { Container, Texture } from "pixi.js";
import { Particle } from './particle'
import { Text } from "./text";

interface MousePosition {
  x: number;
  y: number;
  radius: number;
}

interface Position {
  x: number;
  y: number;
}

export class Visual {
  text: Text;
  particles: Particle[];
  container: Container;
  mouse: MousePosition;
  pos: Position[];
  item: undefined;
  isMouseMoving: boolean;

  constructor() {
    this.text = new Text();

    this.particles = [];

    this.pos = [];

    this.item = undefined;

    this.container = new Container();

    this.mouse = {
      x: 0,
      y: 0,
      radius: 70,
    }
    this.isMouseMoving = false;

    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  show(stage: Container, texture: Texture) {
    if(this.container) {
      stage.removeChild(this.container);
    }

    this.pos = this.text.setText('Hi', 2 ,1500, 1500);

    this.container = new Container();
    stage.addChild(this.container);

    this.particles = [];
    for (let i = 0; i < this.pos.length; i++) {
      const item = new Particle(this.pos[i], texture);
      this.container.addChild(item.sprite);
      this.particles.push(item);
    }
  }

  animate(){
    if (!this.isMouseMoving) return;

    for(let i = 0; i <this.particles.length; i++) {
      const item = this.particles[i];
      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      if(dist < minDist) {
        const angle = Math.atan2(dy,dx);
        const tx = item.x + Math.cos(angle) * minDist;
        const ty = item.y + Math.sign(angle) * minDist;
        const ax = tx - this.mouse.x;
        const ay = ty - this.mouse.y;
        item.vx -= ax;
        item.vy -= ay;
      }

      item.draw();

      this.isMouseMoving = false;
    }
  }

  onMove(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.isMouseMoving = true;
  }
}