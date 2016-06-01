import {Phaser} from 'phaser';
import createUnit from 'game/units/unitFactory';

export default class Player {
    constructor(state, faction = 'humans', startingResources) {
        this.state = state;

        this.faction = faction;

        this.units = new Phaser.Group(state.game);

        this.selectedUnits = [];
        this.storedSelections = {};

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
            this.clearSelection();
        }

        // if (unit.alive) {}

        unit.selected = true;
        this.selectedUnits.push(unit);
    }

    hasSelection() {
        return this.selectedUnits.length > 0;
    }

    getSelection() {
        return this.selectedUnits;
    }

    clearSelection() {
        this.selectedUnits.forEach(sUnit => {
            sUnit.selected = false;
        });
        this.selectedUnits.length = 0;
    }

    applySelection(selection) {
        selection.forEach(unit => {
            this.selectUnit(unit);
        });
    }

    saveSelection(slot) {
        this.storedSelections[slot] = this.selectedUnits.slice(0);
    }

    restoreSelection(slot) {
        let stored = this.storedSelections[slot];
        if (Array.isArray(stored) && stored.length > 0) {
            stored = stored.slice(0);
            this.clearSelection();
            this.applySelection(stored);
        }
    }

    addUnit(unit) {
        this.units.add(unit);
    }

    enterBuildMode() {
        this.buildUnit = createUnit(this.state.game, 'towncenter');
        this.buildUnit.alpha = 0.5;
        this.state.game.world.add(this.buildUnit);
        console.debug('buildUnit: ', this.buildUnit);
    }

    update() {

    }
}