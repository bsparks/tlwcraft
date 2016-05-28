import {Phaser} from 'phaser';
import Xam from 'game/units/xam';

export default class LoadState extends Phaser.State {
    preload() {
        //this.game.add.text(this.game.world.bounds.centerX, this.game.world.bounds.centerY, 'playing...', { fill: '#fff' });
    }

    create() {
        this.map = this.game.add.tilemap('map1');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('summer_tiles', 'summer_tiles');

        // dunno why tilemap doesn't track actual TileLayer objects?
        this.map.tileLayers = {};

        this.map.tileLayers.ground = this.groundlayer = this.map.createLayer('ground');

        let xam = new Xam(this.game, 100,100);
        this.game.world.add(xam);
    }
}