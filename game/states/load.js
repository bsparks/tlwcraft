import {Phaser} from 'phaser';

export default class LoadState extends Phaser.State {
    preload() {
        this.game.add.text(this.game.world.bounds.centerX, this.game.world.bounds.centerY, 'loading...', {fill: '#fff'});
    }

    create() {
        this.game.state.start('play');
    }
}