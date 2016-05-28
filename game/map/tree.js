import Resource from 'game/map/resource';

export default class Tree extends Resource {
    constructor(game, x = 0, y = 0, fromTiled = true) {
        super(game, x, y, 'tree', fromTiled);
    }
}