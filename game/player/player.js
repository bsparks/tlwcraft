import {Phaser} from 'phaser';

export default class Player {
    constructor(state, race = 'human', startingResources, startingUnits) {
        this.state = state;

        this.race = race;

        this.units = new Phaser.Group(state.game);

        this.setResources(startingResources);
        this.setUnits(startingUnits);
    }

    setResources({gold = 100, food = 5, wood = 100} = {}) {
        // used to set starting resources
        this.gold = gold;
        this.food = food;
        this.wood = wood;
    }

    setUnits(units) {
        // unit factory
    }

    update() {

    }
}