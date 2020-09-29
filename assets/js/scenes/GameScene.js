class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");

    }

    init() {
        this.scene.launch("Ui");
        this.score = 0;
    }

    create() {
        this.createMap();
        this.createAudio();
        this.createChests();
        // this.createWalls();
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
        this.player = new Player(this, 224, 224, "characters", 0);
    }

    createChests() {
        // create a chest group
        this.chests = this.physics.add.group();
        // create chest positions array
        this.chestPositions = [[100, 100], [200, 200], [300, 300], [400, 400], [500, 500]];
        // specify the max number of chests we can have
        this.maxNumberOfChests = 3;
        for (let i = 0; i < this.maxNumberOfChests; i += 1) {
            this.spawnChest();

        }
    }

    spawnChest() {
        const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)]
        
        let chest = this.chests.getFirstDead();
        console.log(chest);
        if (!chest) {
            const chest = new Chest(this, location[0], location[1], "items", 0);
            // add chest to chests group
            this.chests.add(chest);
        
        } else {
            chest.setPosition(location[0], location[1]);
            chest.makeActive();
        }
    }
    
    // createWalls() {
    //     this.wall = this.physics.add.image(500, 100, "button1");
    //     this.wall.setImmovable();         
    // }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    addCollisions() {
        // check for collisions betrween the player and the blocked layer
        this.physics.add.collider(this.player, this.blockedLayer);
        // check for overlapbs between player and chest ghame objects
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    }

    collectChest(player, chest){
        // play gold pickup sound
        this.goldPickupAudio.play();
        // update our score
        this.score += chest.coins;
        // update score in the ui 
        this.events.emit("updateScore", this.score);
        // make chest game objectinactive
        chest.makeInactive();
        // spawn a new chest
        this.time.delayedCall(1000, this.spawnChest(), [], this);
    }
    
    createMap() {
        // create the tilemap
        this.map = this.make.tilemap({ key: "map" });
        // add the tileset image to our map
        this.tiles = this.map.addTilesetImage("background", "background", 32, 32, 1, 2);
        // create our background layer
        this.backgroundLayer = this.map.createStaticLayer("background", this.tiles, 0, 0);
        this.backgroundLayer.setScale(2);
        // create blocked layer
        this.blockedLayer = this.map.createStaticLayer("blocked", this.tiles, 0 , 0);
        this.blockedLayer.setScale(2);
        this.blockedLayer.setCollisionByExclusion([-1]);

        // update the world bounds
        this.physics.world.bounds.width = this.map.widthInPixles * 2;
        this.physics.world.bounds.height = this.map.heightInPixles * 2;

        // limit the camera to the size of our map
        this.cameras.main.setBounds(0, 0, this.map.widthInPixles * 2, this.map.heightInPixles * 2);
    }
}