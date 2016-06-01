import {Phaser} from 'phaser';

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

        this.graphics = this.state.game.add.graphics();
        this.graphics.fixedToCamera = true;
        this.selectionRect = new Phaser.Rectangle();

        // purpose of this is for hitTest not sure actually what for
        this._tempPoint = new Phaser.Point();

        this.state.game.input.onDown.add(function(pointer) {
            let queueModifier = game.input.keyboard.isDown(Phaser.KeyCode.SHIFT);
            //console.debug('click', pointer);

            let player = this,
                map = player.state.map;

            if (player.buildUnit) {
                if (pointer.leftButton.isDown) {
                    // place the building
                    map.units.push(player.buildUnit);
                    player.addUnit(player.buildUnit);
                    player.buildUnit.alpha = 1;
                    player.buildUnit = null;
                }

                if (pointer.rightButton.isDown) {
                    // cancel building
                    player.buildUnit.destroy();
                    player.buildUnit = null;
                }

                return;
            }

            if (pointer.rightButton.isDown) {
                let {worldX: x, worldY: y} = pointer;

                this.selectedUnits.forEach(unit => {
                    // can only issue move orders to mobile units of same faction
                    if (unit.faction === player.faction && unit.moveToPath) {
                        let target = player.state.map.getPathTarget(unit.x, unit.y, x, y);
                        unit.moveToPath(target);
                    }
                });
            }
        }, this);

        // selection hotkeys
        let selection1 = this.state.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        selection1.onDown.add(key => {
            if (key.ctrlKey) {
                this.saveSelection(1);
            } else {
                this.restoreSelection(1);
            }
        });

        let buildMenu = this.state.game.input.keyboard.addKey(Phaser.Keyboard.B);
        buildMenu.onDown.add(key => {
            // open build menu, for now build TC
            this.enterBuildMode();
        });
    }

    update() {
        let game = this.state.game,
            map = this.state.map,
            pointer = game.input.activePointer,
            queueModifier = game.input.keyboard.isDown(Phaser.KeyCode.SHIFT);

        this.graphics.clear();

        if (pointer.rightButton.isDown && (pointer.rightButton.duration > 0 && pointer.rightButton.duration < 100)) {
            this.graphics.lineStyle(1, 0xffffff);
            this.graphics.drawCircle(pointer.x, pointer.y, 32);
        }

        if (pointer.leftButton.isDown) {
            let start = pointer.positionDown.clone(),
                size = {
                    x: pointer.x - start.x,
                    y: pointer.y - start.y
                };

            // if you select "backwards" the rect bounds doesn't work
            if (size.y < 0) {
                start.y -= Math.abs(size.y);
            }
            if (size.x < 0) {
                start.x -= Math.abs(size.x);
            }

            this.selectionRect.setTo(start.x, start.y, Math.abs(size.x), Math.abs(size.y));

            this.graphics.lineStyle(1, 0x00ff00);
            this.graphics.drawShape(this.selectionRect);

            // TODO: quadtree?
            if (!queueModifier) {
                //console.debug('clear');
                this.clearSelection();
            }
            for(let unit of map.units) {
                if (this.selectionRect.intersects(unit.getBounds())) {
                    this.selectUnit(unit, false);
                }
            }
        }

        if (pointer.middleButton.isDown) {
            this.drag_camera(pointer);
            this.update_camera();
        }

        if (this.buildUnit) {
            this.buildUnit.position.copyFrom(game.input.activePointer);
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