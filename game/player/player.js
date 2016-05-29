import {Phaser} from 'phaser';
import createUnit from 'game/units/unitFactory';

export default class Player {
    constructor(state, race = 'human', startingResources, startingUnits) {
        this.state = state;

        this.race = race;

        this.units = new Phaser.Group(state.game);

        this.selectedUnits = [];

        this.setResources(startingResources);
        this.setUnits(startingUnits);
    }

    setResources({gold = 100, food = 5, wood = 100} = {}) {
        // used to set starting resources
        this.gold = gold;
        this.food = food;
        this.wood = wood;
    }

    setUnits(units = []) {
        // unit factory
        units.forEach(unit => {
            let {x, y} = unit;
            let u = createUnit(this.state.game, unit.type, { x, y });
            // adjust for Tiled objects (bottom left)
            u.y -= u.height;

            // TODO: use properties from map?

            this.addUnit(u);
        });
    }

    addUnit(unit) {
        let game = this.state.game;

        unit.events.onInputDown.add(function(u, pointer) {
            console.debug('click dude: ', pointer);
            // only respond to left mouse
            if (!pointer.leftButton.isDown) {
                return;
            }

            if (!game.input.keyboard.isDown(Phaser.KeyCode.SHIFT)) {
                this.selectedUnits.forEach(sUnit => {
                    if (sUnit !== unit) {
                        sUnit.selected = false;
                    }
                });
                this.selectedUnits = [];
            }

            unit.selected = true;
            this.selectedUnits.push(unit);
        }, this);

        this.units.add(unit);
    }

    update() {

    }
}