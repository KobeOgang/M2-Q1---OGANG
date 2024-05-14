import {MainMenuScene} from './scenes/MainMenuScene.js';
import {CreditsScene} from './scenes/CreditsScene.js';
import {GameScene} from './scenes/GameScene.js';
import {GameOverScene} from './scenes/GameOverScene.js';

var config = {
    type: Phaser.AUTO,
    width: 1820,
    height: 870,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        }
    },
    scene: [MainMenuScene, CreditsScene, GameScene, GameOverScene]
};

var game = new Phaser.Game(config);

game.scene.start('MainMenuScene');