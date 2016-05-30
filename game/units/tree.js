import Unit from 'game/units/unit';

export default class Tree extends Unit {
    constructor(game, x, y) {
        super(game, x, y, 'tree');

        this.body.moves = false;

        this.displayName = 'Tree';
    }
}