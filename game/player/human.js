import Player from 'game/player/player';

export default class HumanPlayer extends Player {
    constructor(state, faction, startingResources) {
        super(state, faction, startingResources);

        this._cameraDragPos = null;
        this._cameraAccel = 1;
        this._cameraDrag = 3;
        this._cameraMaxSpeed = 10;
        this._cameraVelX = 0;
        this._cameraVelY = 0;

        this.state.map.onUnitAdd.add(function(unit, map) {
            let player = this;

            unit.events.onInputDown.add(function(u, pointer) {
                let queueModifier = game.input.keyboard.isDown(Phaser.KeyCode.SHIFT);
                // only respond to left mouse
                if (pointer.leftButton.isDown) {
                    player.selectUnit(u, !queueModifier);
                }
            });

        }, this);
    }

    update() {
        let game = this.state.game,
            map = this.state.map;

        if (game.input.activePointer.rightButton.isDown) {
            //console.debug('mouse', game.input.activePointer);
            let {x, y} = game.input.activePointer;

            this.selectedUnits.forEach(unit => {
                // can only issue move orders to mobile units of same faction
                if (unit.faction === this.faction && unit.moveToPath) {
                    let target = map.getPathTarget(unit.x, unit.y, x, y);
                    unit.moveToPath(target);
                }
            });
        }

        if (game.input.activePointer.leftButton.isDown) {
            this.drag_camera(game.input.activePointer);
            this.update_camera();
        }
    }

    drag_camera(pointer) {
        if (!pointer.timeDown) {
            return;
        }

        if (pointer.isDown && !pointer.targetObject) {
            if (this._cameraDragPos) {
                this._cameraVelX = (this._cameraDragPos.x - pointer.position.x) * this._cameraAccel;
                this._cameraVelY = (this._cameraDragPos.y - pointer.position.y) * this._cameraAccel;
            }
            this._cameraDragPos = pointer.position.clone();
        }

        if (pointer.isUp) {
            this._cameraDragPos = null;
        }
    }

    update_camera() {
        let game = this.state.game;

        this._cameraVelX = game.math.clamp(this._cameraVelX, -this._cameraMaxSpeed, this._cameraMaxSpeed);
        this._cameraVelY = game.math.clamp(this._cameraVelY, -this._cameraMaxSpeed, this._cameraMaxSpeed);

        game.camera.x += this._cameraVelX;
        game.camera.y += this._cameraVelY;

        //Set Camera Velocity X Drag
        if (this._cameraVelX > this._cameraDrag) {
            this._cameraVelX -= this._cameraDrag;
        } else if (this._cameraVelX < -this._cameraDrag) {
            this._cameraVelX += this._cameraDrag;
        } else {
            this._cameraVelX = 0;
        }

        //Set Camera Velocity Y Drag
        if (this._cameraVelY > this._cameraDrag) {
            this._cameraVelY -= this._cameraDrag;
        } else if (this._cameraVelY < -this._cameraDrag) {
            this._cameraVelY += this._cameraDrag;
        } else {
            this._cameraVelY = 0;
        }
    }
}