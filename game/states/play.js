import {Phaser} from 'phaser';

export default class LoadState extends Phaser.State {
    preload() {
        this.game.add.text(this.game.world.bounds.centerX, this.game.world.bounds.centerY, 'playing...', {fill: '#fff'});
    }

    create() {

    }
}