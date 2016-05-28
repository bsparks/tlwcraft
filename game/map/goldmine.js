import {Phaser} from 'phaser';

export default class GoldMine extends Phaser.Sprite {
    constructor(game, x = 0, y = 0) {
        super(game, x, y, 'goldmine');
    }
}