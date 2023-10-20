import { Game } from './game.js';
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:400},
            debug: false
        }
    },
    scene: [Game]
};

var game = new Phaser.Game(config);
