import {Phaser} from 'phaser';

export default class Resource extends Phaser.Sprite {
    constructor(game, x = 0, y = 0, key, fromTiled = true) {
        super(game, x, y, key);

        if (fromTiled) {
            this.y -= this.height;
        }
    }
}