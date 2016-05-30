import {Phaser} from 'phaser';

export default class Unit extends Phaser.Sprite {
    constructor(game, x = 0, y = 0, spriteKey = 'peasant', selectronKey = 'selection_32') {
        super(game, x, y); // no key? or need a empty image...

        game.physics.arcade.enable(this);

        this.anchor.setTo(0.5);

        this.body.collideWorldBounds = true;
        this.body.immovable = false;
        this.body.moves = true;

        this.forward = new Phaser.Point();

        // selectron first, needs to be underneath the sprite
        this.selectron = this.addChild(game.add.image(0, 0, selectronKey));
        this.selectron.anchor.setTo(0.5);

        // the actual animations are on top of the selectron
        this.sprite = this.addChild(game.add.sprite(0, 0, spriteKey));
        this.sprite.anchor.setTo(0.5);

        // stats
        this.displayName = 'Unit';
        this.faction = 'human';
        this.maxHealth = 10;
        this.health = 10;
        this.flying = false;
        this.invulnerable = false;

        this.target = null;

        this.events.onKilled.add(this.onDeath, this);

        this.selected = false;

        this.inputEnabled = false;
    }

    get selected() {
        return this.selectron.visible;
    }

    set selected(value) {
        this.selectron.visible = value;
    }

    setTarget(target) {
        this.target = target;
    }

    clearTarget() {
        this.target = null;
    }

    getSpriteDirection(angle) {
        let direction = 0;

        angle += angle < -Math.PI ? Math.PI * 2 : 0;
        angle -= angle > Math.PI ? Math.PI * 2 : 0;

        if (angle >= Math.PI * 3 / 8 && angle <= Math.PI * 5 / 8) {
            direction = 0
        } else {
            if (angle <= -Math.PI * 3 / 8 && angle >= -Math.PI * 5 / 8) {
                direction = 3
            } else {
                if (angle >= Math.PI * 7 / 8 || angle <= -Math.PI * 7 / 8) {
                    direction = 1
                } else {
                    if ((angle <= Math.PI * 1 / 8 && angle >= 0) || (angle >= -Math.PI * 1 / 8 && angle <= 0)) {
                        direction = 2
                    } else {
                        if (angle <= Math.PI * 7 / 8 && angle >= Math.PI * 5 / 8) {
                            direction = 4
                        } else {
                            if (angle <= Math.PI * 3 / 8 && angle >= Math.PI * 1 / 8) {
                                direction = 5
                            } else {
                                if (angle >= -Math.PI * 7 / 8 && angle <= -Math.PI * 5 / 8) {
                                    direction = 6
                                } else {
                                    direction = 7
                                }
                            }
                        }
                    }
                }
            }
        }

        return direction;
    }

    damage(amount) {
        if (this.invulnerable) {
            return;
        }

        super.damage(amount);

        if (this.dmgSound) {
            this.dmgSound.play();
        }

        return this;
    }

    onDeath() {
        if (this.deathSound) {
            this.deathSound.play();
        }
        // TODO: add to corpse group (pool?)
        //this.game.world.add(new Corpse(this.game, this.x, this.y, this.key));
    }
}
