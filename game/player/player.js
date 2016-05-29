import {Phaser} from 'phaser';
import createUnit from 'game/units/unitFactory';

export default class Player {
    constructor(state, faction = 'humans', startingResources) {
        this.state = state;

        this.faction = faction;

        this.units = new Phaser.Group(state.game);

        this.selectedUnits = [];

        this.setResources(startingResources);

        this.state.map.onUnitAdd.add(function(unit, map) {
            if (unit.faction === this.faction) {
                this.addUnit(unit);
            }
        }, this);
    }

    setResources({gold = 100, food = 5, wood = 100} = {}) {
        // used to set starting resources
        this.gold = gold;
        this.food = food;
        this.wood = wood;
    }

    selectUnit(unit, replaceSelection) {
        if (replaceSelection) {
            this.selectedUnits.forEach(sUnit => {
                if (sUnit !== unit) {
                    sUnit.selected = false;
                }
            });
            this.selectedUnits = [];
        }

        unit.selected = true;
        this.selectedUnits.push(unit);
    }

    addUnit(unit) {
        this.units.add(unit);
    }

    update() {

    }
}