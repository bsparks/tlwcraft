import {Phaser} from 'phaser';
import {Grid, AStarFinder} from 'pathfinding';
import createUnit from 'game/units/unitFactory';

function getWalkableData(layer) {
    let gridData = [];
    for (let y = 0; y < layer.height; y++) {
        gridData[y] = [];

        for (let x = 0; x < layer.width; x++) {
            let tile = layer.data[y][x];

            if (tile && tile.collides) {
                gridData[y][x] = 1;
            } else {
                gridData[y][x] = 0;
            }
        }
    }

    return gridData;
}

var finder = new AStarFinder();

export default class Battlefield {
    constructor(game, mapName) {
        this.mapName = mapName;
        this.game = game;

        this.units = [];

        this.onUnitAdd = new Phaser.Signal();
        this.onUnitRemove = new Phaser.Signal();

        this.onUnitAdd.add(function(unit, map) {
            //console.debug('map unit add: ', arguments);
            if (unit.faction === 'resources') {
                map.resources.add(unit);
            }
        });

        this.initMap();
        this.buildPathGrid();

        // add this here so it's on top of the tilemap
        this.resources = game.add.group();
    }

    initMap() {
        this.map = this.game.add.tilemap(this.mapName);

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('ground_tiles', 'ground_tiles');
        this.map.addTilesetImage('collision', 'collision');

        // dunno why tilemap doesn't track actual TileLayer objects?
        this.map.tileLayers = {};

        this.map.tileLayers.ground = this.map.createLayer('ground');
        this.map.tileLayers.collision = this.map.createLayer('collision');
        this.map.tileLayers.collision.renderable = false;

        //resizes the game world to match the layer dimensions
        this.map.tileLayers.ground.resizeWorld();
    }

    buildPathGrid() {
        let collisionLayer = this.map.tileLayers.collision.layer;
        let gridData = getWalkableData(collisionLayer);
        let grid = new Grid(collisionLayer.width, collisionLayer.height, gridData);

        this.pathGrid = grid;
    }

    spawnUnits() {
        let map = this,
            objLayers = this.map.objects,
            game = this.game,
            layers = ['resources', 'humans', 'orcs', 'neutral'];

        layers.forEach(function(layer) {
            if (objLayers[layer]) {
                objLayers[layer].forEach(function(obj) {
                    try {
                        let unit = createUnit(game, obj.type, obj);
                        unit.faction = layer;
                        // adjust for tiled
                        unit.y -= unit.height;

                        map.units.push(unit);
                        map.onUnitAdd.dispatch(unit, map);
                    } catch (e) {
                        console.warn('error in [layer] ' + layer + ' objs: ', e, obj);
                    }
                });
            }
        });
    }

    getPathTarget(fromX, fromY, toX, toY) {
        let x = 0, y = 0;

        let grid = this.pathGrid.clone();
        let startTile = { x: 0, y: 0 };
        let targetTile = { x: 0, y: 0 };

        let collisionLayer = this.map.tileLayers.collision;

        collisionLayer.getTileXY(fromX, fromY, startTile);
        collisionLayer.getTileXY(toX, toY, targetTile);

        let sX = startTile.x;
        let sY = startTile.y;
        let tX = targetTile.x;
        let tY = targetTile.y;

        let path = finder.findPath(sX, sY, tX, tY, grid);
        let coordPath = path.map(function(node) {
            let tile = collisionLayer.layer.data[node[1]][node[0]];
            let x = tile.worldX + 16; // TODO: base on tile size
            let y = tile.worldY + 16;

            return { x, y };
        });

        return coordPath;
    }
}