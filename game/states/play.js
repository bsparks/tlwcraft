import {Phaser} from 'phaser';
import Battlefield from 'game/map/battlefield';
import Peasant from 'game/units/peasant';

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

        this.peasant = new Peasant(this.game, 100, 100);
        this.game.world.add(this.peasant);

        window.peasant = this.peasant;
    }

    update() {
        if (game.input.mousePointer.isDown) {
            let {x, y} = this.game.input.activePointer;
            let target = this.map.getPathTarget(this.peasant.x, this.peasant.y, x, y);

            this.peasant.moveToPath(target);
        }
    }

    render() {
        let fwd = this.peasant.forward.clone(),
            x1 = this.peasant.x,
            y1 = this.peasant.y;

        fwd.setMagnitude(30);

        let x2 = x1 + fwd.x,
            y2 = y1 + fwd.y;

        let line = new Phaser.Line(x1, y1, x2, y2);
        this.game.debug.geom(line, 'magenta');
        this.game.debug.lineInfo(line, 32, 32);
    }
}