export class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    create() {
        //background
        const background = this.add.image(0, 0, 'background').setOrigin(0);
        background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        //Name
        this.add.text(centerX, centerY - 100, "Name: Kobe O'Neal G. Ogang", {
            fontSize: '52px',
            fill: '#000'
        }).setOrigin(0.5);

        //Section
        this.add.text(centerX, centerY, 'Section: A223', {
            fontSize: '52px',
            fill: '#000'
        }).setOrigin(0.5);

        //Program
        this.add.text(centerX, centerY + 100, 'Program: EMC', {
            fontSize: '52px',
            fill: '#000'
        }).setOrigin(0.5);

        //Back
        const backButton = this.add.text(centerX, centerY + 200, 'BACK', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#3498db',
            padding: { x: 20, y: 10 },
            borderRadius: 5
        });
        backButton.setOrigin(0.5);
        backButton.setInteractive();
        backButton.on('pointerup', () => {
            this.scene.start('MainMenuScene');
        });
    }

    update() {}
}
