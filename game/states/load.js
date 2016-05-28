import {Phaser} from 'phaser';

export default class LoadState extends Phaser.State {
    preload() {
        this.game.add.text(this.game.world.bounds.centerX, this.game.world.bounds.centerY, 'loading...', {fill: '#fff'});

        this.game.load.tilemap('map1', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('summer_tiles', 'assets/summer_tiles.png');

        this.game.load.spritesheet('xam', 'assets/xam.png', 32, 32);
    }

    create() {
        this.game.state.start('play');
    }
}