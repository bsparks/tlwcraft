import Unit from 'game/units/unit';

export default class TownCenter extends Unit {
    constructor(game, x, y) {
        super(game, x, y, 'town_center', 'selection_128');

        this.body.immovable = true;
        this.body.moves = false;

        this.displayName = 'Town Center';
    }
}