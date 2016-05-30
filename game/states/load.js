import {Phaser} from 'phaser';

export default class LoadState extends Phaser.State {
    preload() {
        this.game.add.text(this.game.world.bounds.centerX, this.game.world.bounds.centerY, 'loading...', {fill: '#fff'});

        this.game.load.tilemap('map1', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('summer_tiles', 'assets/summer_tiles.png');
        this.game.load.image('ground_tiles', 'assets/ground_tiles.png');
        this.game.load.image('collision', 'assets/collision.png');

        this.game.load.spritesheet('xam', 'assets/xam.png', 32, 32);

        this.game.load.spritesheet('peasant', 'assets/peasant.png', 32, 32);
        this.game.load.spritesheet('worker', 'assets/worker.png', 32, 32);

        this.game.load.image('town_center', 'assets/town_center.png');

        this.game.load.spritesheet('goldmine', 'assets/goldmine.png', 96, 96);
        this.game.load.image('glyph', 'assets/glyph.png');
        this.game.load.image('tree', 'assets/tree.png');
        this.game.load.image('selection_32', 'assets/selection_32.png');
        this.game.load.image('selection_96', 'assets/selection_96.png');
        this.game.load.image('selection_128', 'assets/selection_128.png');
    }

    create() {
        this.game.state.start('play');
    }
}