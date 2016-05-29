import Peasant from 'game/units/peasant';
import Tree from 'game/units/tree';

export default function createUnit(game, unitType, {x = 0, y = 0} = {}) {
    if (unitType === 'peasant') {
        return new Peasant(game, x, y);
    }
    
    if (unitType === 'tree') {
        return new Tree(game, x, y);
    }
}