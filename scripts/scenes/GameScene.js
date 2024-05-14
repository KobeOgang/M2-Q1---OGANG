export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('ground', '../assets/images/platform.png');
        this.load.image('sky', '../assets/images/background.jpg');
        this.load.image('apple', '../assets/images/apple.png');
        this.load.image('spike', '../assets/images/spike.png');
        this.load.spritesheet('dude',
            '../assets/images/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.score = 0;
        this.maxApples = 3;
        this.colors = ['0xff0000', '0xffa500', '0xffff00', '0x00ff00', '0x0000ff', '0x4b0082', '0xee82ee'];
        this.colorIndex = 0;
        this.applesCollected = 0;
        this.applesTilSizeIncrease = 5;

        // Background
        var sky = this.add.image(0, 0, 'sky');
        sky.setOrigin(0, 0);
        sky.setScale(this.sys.game.config.width / sky.width, this.sys.game.config.height / sky.height);

        // Platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(200, 850, 'ground');
        platforms.create(590, 850, 'ground');
        platforms.create(980, 850, 'ground');
        platforms.create(1370, 850, 'ground');
        platforms.create(1760, 850, 'ground');

        platforms.create(500, 720, 'ground');
        platforms.create(1000, 600, 'ground');
        platforms.create(60, 400, 'ground');
        platforms.create(1900, 300, 'ground');
        platforms.create(860, 200, 'ground');

        platforms.create(1400, 500, 'ground').setScale(.5).refreshBody();
        platforms.create(1600, 400, 'ground').setScale(.5).refreshBody();
        platforms.create(560, 470, 'ground').setScale(.5).refreshBody();
        platforms.create(500, 270, 'ground').setScale(.3).refreshBody();

        // Player
        this.player = this.physics.add.sprite(100, 700, 'dude');
        this.player.setBounce(0.15);
        this.player.setCollideWorldBounds(true);

        // Animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, platforms);

        // Apples
        this.apples = this.physics.add.group({
            key: 'apple',
            repeat: this.maxApples - 1,
            setXY: { x: 50, y: 40, stepX: Phaser.Math.Between(400, 700) }
        });

        this.apples.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
        });

        this.physics.add.collider(this.apples, platforms);

        // Spikes
        this.spikes = this.physics.add.staticGroup();
        this.spikes.create(200, 800, 'spike');
        this.spikes.create(800, 800, 'spike');
        this.spikes.create(1100, 800, 'spike');
        this.spikes.create(1600, 800, 'spike');
        this.spikes.create(600, 670, 'spike');
        this.spikes.create(1000, 550, 'spike');
        this.spikes.create(970, 550, 'spike');
        this.spikes.create(940, 550, 'spike');
        this.spikes.create(540, 435, 'spike');

        // Text
        this.textScore = this.add.text(1500, 16, 'Apples Collected: 0', { fontSize: '32px', fill: '#fff',
            fontFamily: 'Arial, sans-serif', fontWeight: 'bold'});

        this.gameOverText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Game Over', { fontSize: '64px', fill: '#f22734',
            fontFamily: 'Arial, sans-serif', fontWeight: 'bold'});
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setVisible(false);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // this.player.setTint(parseInt(this.colors[this.colorIndex], 16));
    }

    update() {
        // Movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-500);
        }

        // Size increase
        if (this.applesCollected >= this.applesTilSizeIncrease) {
            this.increasePlayerSize();
            this.applesCollected = 0;
        }

        // Events
        this.physics.add.overlap(this.player, this.apples, this.collectApple, null, this);
        this.physics.add.overlap(this.player, this.spikes, this.gameOver, null, this);
    }

    collectApple(player, apple) {
        this.score++;
        this.textScore.setText('Apples Collected: ' + this.score);
        apple.disableBody(true, true);
        var x = Phaser.Math.Between(40, 1780);
        var y = Phaser.Math.Between(40, 50);
        var newApple = this.apples.create(x, y, 'apple');
        newApple.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
        this.applesCollected++;
        this.changePlayerColor();
    }

    gameOver() {
        this.scene.start('GameOverScene', { score: this.score });
    }

    increasePlayerSize() {
        this.player.setScale(this.player.scaleX * 1.1, this.player.scaleY * 1.1);
    }

    changePlayerColor() {
        this.player.setTint(parseInt(this.colors[this.colorIndex], 16));
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    }
}