import {Phaser} from 'phaser';
import Unit from 'game/units/unit';

export default class Xam extends Unit {
    constructor(game, x = 0, y = 0) {
        super(game, x, y, 'xam');
    }
}