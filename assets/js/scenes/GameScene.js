class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");

    }

    init() {
        this.scene.launch("Ui")
    }

    create() {
        let goldPickupAudio = this.sound.add("goldSound", { loop: false, volume: 0.2 })
    

        //image method okay if not using the animation on the image
    
        
    
        this.chest = new Chest(this, 300,300, "items", 0)
        
    
        this.physics.add.image(500, 100, "button1")
        this.wall = this.physics.add.image(500, 100, "button1")
        this.wall.setImmovable()
    
        this.player = new Player(this, 32, 32, "characters", 0)
    
        this.physics.add.collider(this.player, this.wall)
        this.physics.add.overlap(this.player, this.chest, function(player, chest) { goldPickupAudio.play(); chest.destroy()})
        // all options on how to solve weird chest noise bug
        // audio option only plays once
        // player overlaps
        // check if the audio is playing
        // destroy the game object**implemented**
    
        this.cursors = this.input.keyboard.createCursorKeys()
        //This will allow Phaser to detect keyboard inputs

    }

    update() {
        //important to call update method
        this.player.update(this.cursors);
    }
}