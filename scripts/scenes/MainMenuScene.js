export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    preload() {
        this.load.image('ground', '../assets/images/platform.png');
        this.load.image('sky', '../assets/images/background.jpg');
        this.load.image('background', '../assets/images/background2.jpg');
        this.load.image('background2', '../assets/images/background3.jpg');
        this.load.image('apple', '../assets/images/apple.png');
        this.load.image('spike', '../assets/images/spike.png');
    }

    create() {
        //Background
        const sky = this.add.image(0, 0, 'sky').setOrigin(0);
        sky.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        //Center
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        //Play
        const playButton = this.add.text(centerX, centerY - 100, 'PLAY', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#2ecc71',
            padding: { x: 20, y: 10 },
            borderRadius: 5
        });
        playButton.setOrigin(0.5);
        playButton.setInteractive();
        playButton.on('pointerup', () => {
            this.scene.start('GameScene');
        });

        //Credits
        const creditsButton = this.add.text(centerX, centerY, 'CREDITS', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#3498db',
            padding: { x: 20, y: 10 },
            borderRadius: 5
        });
        creditsButton.setOrigin(0.5);
        creditsButton.setInteractive();
        creditsButton.on('pointerup', () => {
            this.scene.start('CreditsScene');
        });

        //Quit
        const quitButton = this.add.text(centerX, centerY + 100, 'QUIT', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#e74c3c',
            padding: { x: 20, y: 10 },
            borderRadius: 5
        });
        quitButton.setOrigin(0.5);
        quitButton.setInteractive();
        quitButton.on('pointerup', () => {
            this.quitGame();
        });
    }

    quitGame() {
        alert('You exited the game.');
    }
    
    update() {}
}
