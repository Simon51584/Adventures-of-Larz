// const { Phaser } = require("./phaser");

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {
                y: 0,
            }
        }
    }
}

let game = new Phaser.Game(config);

function preload() { 
    this.load.image("button1", "assets/images/ui/blue_button01.png" )
    // this method only loads a single image to the Game 
    // this.load.image("items", "assets/images/items.png")
    this.load.spritesheet("items", "assets/images/items.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("characters", "assets/images/characters.png", { frameWidth: 32, frameHeight: 32 })

}

function create () {
    //image method okay if not using the animation on the image
    let button = this.add.image(100, 100, "button1")
    button.setOrigin(0.5,0.5)

    //sprite method, use if you intend to animate within your game being created in phaser
    this.add.sprite(300,100, "button1")
    // button.setOrigin(0, 0)

    this.add.image(300,300, "items", 0)

    this.physics.add.image(500, 100, "button1")

    this.player = this.physics.add.image(32, 32, "characters", 5)
    this.player.setScale(2)

    this.cursors = this.input.keyboard.createCursorKeys()
    //This will allow Phaser to detect keyboard inputs
}

function update () {
    this.player.setVelocity(0)
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160)
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160)
    }
    
    if (this.cursors.up.isDown) {
    this.player.setVelocityY(-160)
    
    } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(160)

    }

}