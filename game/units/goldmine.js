import Unit from 'game/units/unit';

export default class Goldmine extends Unit {
    constructor(game, x, y) {
        super(game, x, y, 'goldmine', 'selection_96');

        this.body.immovable = true;
        this.body.moves = false;

        this.displayName = 'Gold Mine';
    }
}