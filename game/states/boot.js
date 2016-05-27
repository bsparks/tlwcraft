import {Phaser} from 'phaser';

export default class BootState extends Phaser.State {
    create() {
        this.game.stage.disableVisibilityChange = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.input.gamepad.start();

        this.game.state.start('load');
    }
}
