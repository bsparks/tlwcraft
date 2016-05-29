import Player from 'game/player/player';

export default class HumanPlayer extends Player {
    update() {
        let game = this.state.game,
            map = this.state.map;

        if (game.input.activePointer.rightButton.isDown) {
            //console.debug('mouse', game.input.activePointer);
            let {x, y} = game.input.activePointer;

            this.selectedUnits.forEach(unit => {
                let target = map.getPathTarget(unit.x, unit.y, x, y);
                unit.moveToPath(target);
            });
        }
    }
}