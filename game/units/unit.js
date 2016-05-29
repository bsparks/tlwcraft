import {Phaser} from 'phaser';

export default class Unit extends Phaser.Sprite {
    constructor(game, x = 0, y = 0, spriteKey = 'peasant', selectronKey = 'selection') {
        super(game, x, y); // no key? or need a empty image...

        game.physics.arcade.enable(this);

        this.anchor.setTo(0.5);

        this.body.collideWorldBounds = true;
        this.body.immovable = false;

        this.forward = new Phaser.Point();

        // selectron first, needs to be underneath the sprite
        this.selectron = this.addChild(game.add.image(0, 0, selectronKey));
        this.selectron.anchor.setTo(0.5);

        // the actual animations are on top of the selectron
        this.sprite = this.addChild(game.add.sprite(0, 0, spriteKey));
        this.sprite.anchor.setTo(0.5);

        // stats
        this.maxHealth = 10;
        this.health = 10;
        this.flying = false;
        this.invulnerable = false;

        this.moveSpeed = 50;

        this.events.onKilled.add(this.onDeath, this);

        this.selected = false;

        this.inputEnabled = true;
    }

    get selected() {
        return this.selectron.visible;
    }

    set selected(value) {
        this.selectron.visible = value;
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
