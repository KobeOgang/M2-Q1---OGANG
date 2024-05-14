export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.score = data.score;
    }

    create() {
        const background = this.add.image(0, 0, 'background2').setOrigin(0);
        background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        //Text
        this.add.text(this.cameras.main.centerX, 200, 'Game Over', {
            fontSize: '64px',
            fill: '#f22734',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        //Score
        this.add.text(this.cameras.main.centerX, 300, `Apples Collected: ${this.score}`, {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        //Retry
        var retryButton = this.add.text(this.cameras.main.centerX, 400, 'Retry', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#2ecc71',
            padding: { x: 20, y: 10 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();

        retryButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Main Menu
        var mainMenuButton = this.add.text(this.cameras.main.centerX, 500, 'Main Menu', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#3498db',
            padding: { x: 20, y: 10 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();

        mainMenuButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
    }
}