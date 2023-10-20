
import { ScoreBoard } from '../components/ScoreBoard.js';

export class Game extends Phaser.Scene {

    constructor() {
        super({key: 'game'});
    }

    init() {
        this.ScoreBoard = new ScoreBoard(this);
    }

    preload() {
        this.load.image('background', './images/background.png');
        this.load.image('gameover', './images/gameover.png');
        this.load.image('platform', './images/platform.png');
        this.load.image('ball', './images/ball.png');
    }


    create() {
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(410, 250, 'background');
        this.gameOverImage = this.add.image(400, 90, 'gameover');
        this.gameOverImage.visible = false;

        this.ScoreBoard.create();

        this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
        this.platform.body.allowGravity = false;
        this.platform.setCollideWorldBounds(true);

        this.ball = this.physics.add.image(400, 30, 'ball');
        this.ball.setCollideWorldBounds(true);

        let velocity = 100 * Phaser.Math.Between(1.3, 2);
        if (Phaser.Math.Between(0, 10) > 5) {
            velocity = 0-velocity;
        }
        this.ball.setVelocity(velocity, 10);

        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);
        this.ball.setBounce(1);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    platformImpact(ball, platform) {
        this.ScoreBoard.incrementScore(1);
        // console.log("Score: " + this.score);
        
        let relativeImpact = ball.x - platform.x;
        if (relativeImpact < 0.1 && relativeImpact > -0.1 ) {
            ball.setVelocityX(Phaser.Math.Between(-10, 10));
        }
        else {
            ball.setVelocityX(10 * relativeImpact);
        }
        
    }

    update() {

        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);
        }
        else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(500);
        }
        else {
            this.platform.setVelocityX(0);
        }

        if (this.ball.y > 500) {
            console.log('game over');

            this.gameOverImage.visible = true;
            this.scene.pause();
        }

    }
}