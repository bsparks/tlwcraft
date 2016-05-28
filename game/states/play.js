import {Phaser} from 'phaser';
import Battlefield from 'game/map/battlefield';
import Xam from 'game/units/xam';

export default class LoadState extends Phaser.State {
    init() {
        this.game.input.mouse.capture = true;
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    }

    preload() {
        //this.game.add.text(this.game.world.bounds.centerX, this.game.world.bounds.centerY, 'playing...', { fill: '#fff' });
    }

    create() {
        this.map = new Battlefield(this.game, 'map1');

        this.xam = new Xam(this.game, 100, 100);
        this.game.world.add(this.xam);
    }

    update() {
        if (game.input.mousePointer.isDown) {
            let {x, y} = this.game.input.activePointer;
            let target = this.map.getPathTarget(this.xam.x, this.xam.y, x, y);

            this.xam.moveToPath(target);
        }
    }
}