import Peasant from 'game/units/peasant';

export default function createUnit(game, unitType, {x = 0, y = 0} = {}) {
    if (unitType === 'peasant') {
        return new Peasant(game, x, y);
    }
}