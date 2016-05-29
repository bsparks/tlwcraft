import Peasant from 'game/units/peasant';
import Tree from 'game/units/tree';
import Goldmine from 'game/units/goldmine';

export default function createUnit(game, unitType, {x = 0, y = 0} = {}) {
    if (unitType === 'peasant') {
        return new Peasant(game, x, y);
    }

    if (unitType === 'tree' || unitType === 'wood') {
        return new Tree(game, x, y);
    }

    if (unitType === 'mine') {
        return new Goldmine(game, x, y);
    }

    throw new Error('Unknown Unit Type: ', unitType);
}