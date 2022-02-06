const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export default class Platform {
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
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}