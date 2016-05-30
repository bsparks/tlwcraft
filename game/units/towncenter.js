import Unit from 'game/units/unit';

export default class TownCenter extends Unit {
    constructor(game, x, y) {
        super(game, x, y, 'town_center', 'selection_128');

        this.body.immovable = true;
        this.body.moves = false;

        this.displayName = 'Town Center';
    }

    update() {
        super.update();

        this.sprite.tint = 0xffffff;

        // TODO: move this to the player build mode, this sprite shouldn't care
        this.game.physics.arcade.overlap(this, this.game.state.states.play.map.units, function(self, other) {
            if (self === other) {
                return;
            }
            self.sprite.tint = 0xff0000;
        });
    }
}