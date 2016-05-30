import {Phaser} from 'phaser';

import BootState from 'game/states/boot';
import LoadState from 'game/states/load';
import PlayState from 'game/states/play';

class JamGame extends Phaser.Game {
    constructor(el = 'content', {width = 800, height = 600} = {}) {
        super(width, height, Phaser.AUTO, el, null);

        this.state.add('boot', BootState);
        this.state.add('load', LoadState);
        this.state.add('play', PlayState);

        this.state.start('boot');
    }
}

var width = window.innerWidth * window.devicePixelRatio,
    height = window.innerHeight * window.devicePixelRatio;
if(height > 800) {
    var div = height / 800; //800 is target
    width = width / div;
    height = 800;
}

var game = window.game = new JamGame('content', {width, height});

export default game;