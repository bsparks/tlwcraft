import {Phaser} from 'phaser';
import Battlefield from 'game/map/battlefield';
import Peasant from 'game/units/peasant';

import HumanPlayer from 'game/player/human';
import CpuPlayer from 'game/player/cpu';

export default class PlayState extends Phaser.State {
    init() {
        this.game.input.mouse.capture = true;
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        this.game.debugMode = true;
    }

    preload() {
        //this.game.add.text(this.game.world.bounds.centerX, this.game.world.bounds.centerY, 'playing...', { fill: '#fff' });
    }

    create() {
        this.map = new Battlefield(this.game, 'map1');

        this.player = new HumanPlayer(this, 'human', {}, this.map.humanUnits);

        this.opponent = new CpuPlayer(this, 'orc', {}, this.map.orcUnits);

        this.hud = this.game.add.group();
        let font = {
            font: '12px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        };
        this.hud.addChild(this.game.add.text(0, 0, 'Gold: ' + this.player.gold, font));
        this.hud.addChild(this.game.add.text(120, 0, 'Wood: ' + this.player.wood, font));
        this.hud.addChild(this.game.add.text(240, 0, 'Food: ' + this.player.food, font));

        this.hud.y = 8;
        this.hud.x = 300;
    }

    update() {
        this.player.update();
        this.opponent.update();
    }

    render() {
        // TODO: move to debug units
        /*
        let fwd = this.peasant.forward.clone(),
            x1 = this.peasant.x,
            y1 = this.peasant.y;

        fwd.setMagnitude(30);

        let x2 = x1 + fwd.x,
            y2 = y1 + fwd.y;

        let line = new Phaser.Line(x1, y1, x2, y2);
        this.game.debug.geom(line, 'magenta');
        this.game.debug.lineInfo(line, 32, 48);
        */
    }
}