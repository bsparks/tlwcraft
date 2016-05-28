import {Phaser} from 'phaser';
import Battlefield from 'game/map/battlefield';
import Xam from 'game/units/xam';

export default class LoadState extends Phaser.State {
    preload() {
        //this.game.add.text(this.game.world.bounds.centerX, this.game.world.bounds.centerY, 'playing...', { fill: '#fff' });
    }

    create() {
        this.map = new Battlefield(this.game, 'map1');

        let xam = new Xam(this.game, 100,100);
        this.game.world.add(xam);
    }
}