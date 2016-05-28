import {Phaser} from 'phaser';

export default class Tree extends Phaser.Sprite {
    constructor(game, x = 0, y = 0) {
        super(game, x, y, 'tree');
    }
}