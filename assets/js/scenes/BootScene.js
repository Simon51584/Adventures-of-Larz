class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");

    }

    preload() {
        this.load.image("button1", "assets/images/ui/blue_button01.png" )
        this.load.image("button2", "assets/images/ui/blue_button02.png" )
        // this method only loads a single image to the Game 
        // this.load.image("items", "assets/images/items.png")
        this.load.spritesheet("items", "assets/images/items.png", { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet("characters", "assets/images/characters.png", { frameWidth: 32, frameHeight: 32 })
        // on audio load second argument needs to be an array to select appropriate sound file for the browser
        this.load.audio("goldSound", ["assets/audio/Pickup.wav"])
    }

    create() {
        this.scene.start("Title")
    }
    
}