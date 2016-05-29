import {Phaser} from 'phaser';
import MobileUnit from 'game/units/mobileUnit';

export default class Peasant extends MobileUnit {
    constructor(game, x = 0, y = 0) {
        super(game, x, y, 'peasant');
    }
}