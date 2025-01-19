import { Sprite, Texture } from "pixi.js";

const FRICTION = 0.86;
const MOVE_SPPED = 0.1;

export class Particle {
  sprite: Sprite;
  savedX: number;
  savedY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;

  // TODO: come back to pos, texture type
  constructor(pos: any, texture: Texture) {
    this.sprite = new Sprite(texture);
    this.sprite.scale.set(0.2);
    this.sprite.tint = 0x000000;

    this.savedX = pos.x;
    this.savedY = pos.y;
    this.x = pos.x;
    this.y = pos.y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 10;
  }

  draw() {
    this.vx += (this.savedX - this.x) * MOVE_SPPED;
    this.vy += (this.savedY - this.y) * MOVE_SPPED;

    this.vx *= FRICTION;
    this.vy *= FRICTION;

    this.x += this.vx;
    this.y =+ this.vy;

    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}