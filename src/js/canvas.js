import utils from './utils';
import platformImg from '../img/platform.png';
import bgImg from '../img/background.png';
import hillsImg from '../img/hills.png';
import spriteTilesImg from '../img/spritesheet_tiles.png';
import bg_tiles_set1 from '../img/backgrounds/set1_tiles.png';
import hills_set1 from '../img/backgrounds/set1_hills.png';
import bg_set1 from '../img/backgrounds/set1_background.png';
import Player from './Player';
import Platform from './Platform';
import GenericObject from './GenericObject';
import Tile from './Tile';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 700;

let scrollOffset = 0;
let onGround = true;
let lastKey = '';
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let player = new Player();
let platformImage = utils.createImage(platformImg);
let tilesImg = utils.createImage(spriteTilesImg);

// Objects
let platforms = [];
let genericObjects = [];

// Event Listeners
addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (onGround) {
                onGround = false;
                player.velocity.y -= 30;
            }
            break;
        case 'ArrowDown':
            break;
        case 'ArrowLeft':
            keys.left.pressed = true;
            lastKey = 'left';
            break;
        case 'ArrowRight':
            keys.right.pressed = true;
            lastKey = 'right';
            break;
    }
});
addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            break;
        case 'ArrowDown':
            break;
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;
        case 'ArrowRight':
            keys.right.pressed = false;
            break;
    }
});

// Implementation
// let objects;
function init() {
    scrollOffset = 0;
    player = new Player();
    platformImage = utils.createImage(platformImg);
    // Objects
    platforms = [
        new Platform(0, 600, platformImage),
        new Platform(platformImage.width, 600, platformImage),
        new Platform(platformImage.width * 2 + 100, 600, platformImage),
        new Platform(platformImage.width * 3 + 300, 600, platformImage),
        new Tile(600, 554, tilesImg)
    ];
    genericObjects = [
        // new GenericObject(0, 0, utils.createImage(bgImg)),
        new GenericObject(0, 0, utils.createImage(bg_tiles_set1)),
        // new GenericObject(0, 100, utils.createImage(hillsImg)),
        new GenericObject(0, 150, utils.createImage(hills_set1)),
        new GenericObject(1000, 200, utils.createImage(hills_set1)),
    ];
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach(object => {
        object.draw();
    });
    platforms.forEach(platform => {
        platform.draw();
    });
    player.update();

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if (keys.left.pressed && player.position.x > 100 ||
        keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += player.speed;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            });
            genericObjects.forEach(obj => {
                obj.position.x -= player.speed * .66;
            });
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed;
            platforms.forEach(platform => {
                platform.position.x += player.speed;
            });
            genericObjects.forEach(obj => {
                obj.position.x += player.speed * .66;
            });
        }
    }

    // Platform collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
            onGround = true;
        }
    });

    // Sprite switching
    if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
        player.frames = 1;
        player.currentSprite = player.sprites.run.right;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left) {
        player.frames = 1;
        player.currentSprite = player.sprites.run.left;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    } else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
        player.frames = 1;
        player.currentSprite = player.sprites.stand.left;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    } else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right) {
        player.frames = 1;
        player.currentSprite = player.sprites.stand.right;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    }

    // Win condition
    if (scrollOffset > 2000) {
        console.log('Win');
    }

    // Lose condition
    if (player.position.y > canvas.height) {
        console.log('Lose');
        init();
    }

    // objects.forEach(object => {
    //  object.update()
    // })
}

init();
animate();
