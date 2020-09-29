class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");

    }

    init() {
        this.scene.launch("Ui")
    }

    create() {
        this.createAudio();
        this.createChests();
        this.createWalls();
        this.createPlayer();
        this.addCollisions();
        this.createInput();

    }

    update() {
        //important to call update method
        this.player.update(this.cursors);
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add("goldSound", { loop: false, volume: 0.2 });
    }

    createPlayer() {
        this.player = new Player(this, 32, 32, "characters", 0);
    }

    createChests() {
        // create a chest group
        this.chest = new Chest(this, 300,300, "items", 0);
    }
    
    createWalls() {
        this.wall = this.physics.add.image(500, 100, "button1");
        this.wall.setImmovable();         
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    addCollisions() {
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chest, this.collectChest, null, this);
    }

    collectChest(player, chest){
        // play gold pickup sound
        this.goldPickupAudio.play();
        // update score in the ui 
        this.events.emit("updateScore", chest.coins);
        // destroy the chest game object
        chest.destroy()
    }
}