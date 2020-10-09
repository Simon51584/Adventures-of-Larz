class GameManager {
    constructor(scene, mapData)  {
        this.scene = scene;
        this.mapData = mapData;

        this.spawners = {};
        this.chests = {};

        this.playerLocations = [];
        this.chestLocations = {};
        this.mopnsterLocations = {};
    }

    setup() {
        this.parseMapData();
        this.setupEventListener();
        this.setupSpawners();
        this.spawnPlayer();
    }

    parseMapData() {
        console.log(this.mapData)
        this.mapData.forEach((layer) => {
            if (layer.name === "player_locations") {
                layer.objects.forEach((obj) => {
                    if (this.chestLocations[obj.properties.spawner]) {
                        this.chestLocations[obj.properties.spawener].push([obj.x, obj.y]);
                    } else {
                        this.chestLocations[obj.properties.spawner] = [(obj.x, obj.y)]
                    }
                });
            } else if (layer.name === "chest_locations") {
                
            } else if (layer.name === "monster_locations") {
                
            }
        })
    }

    setupEventListener() {

    }

    setupSpawners() {

    }

    spawnPlayer() {

    }

}