import { createImage } from "./utils";
import spriteStandRight from '../img/spriteStandRight.png';
import spriteStandLeft from '../img/spriteStandLeft.png';
import spriteRunRight from '../img/spriteRunRight.png';
import spriteRunLeft from '../img/spriteRunLeft.png';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const gravity = 1.5;

export default class Player {
    constructor() {
        this.speed = 7;
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 66;
        this.height = 150;
        this.image = createImage(spriteStandRight);
        this.frames = 0;
        this.sprites = {
            stand: {
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft),
                width: 66,
                cropWidth: 177
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                width: 127,
                cropWidth: 341
            }
        }
        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = 177;
    }

    draw() {
        ctx.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        this.frames++;

        if (this.frames > 59 &&
            (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
            this.frames = 0;
        } else if (this.frames > 29 &&
            (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
            this.frames = 0;
        }
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            // this.velocity.y = 0;
        }
    }
}