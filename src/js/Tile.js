const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export default class Tile {
    constructor(x, y, image) {
        this.position = {
            x,
            y
        }

        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }

    draw() {
        ctx.drawImage(this.image, 0, 249, 65, 65, this.position.x, this.position.y, 65, 65);
    }
}