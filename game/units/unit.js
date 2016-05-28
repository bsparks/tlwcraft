import {Phaser} from 'phaser';

export default class Unit extends Phaser.Sprite {
    constructor(game, x = 0, y = 0, key) {
        super(game, x, y, key);

        game.physics.arcade.enable(this);

        this.anchor.setTo(0.5);

        this.body.collideWorldBounds=true;
        this.body.immovable = false;

        // stats
        this.maxHealth = 10;
        this.health = 10;
        this.flying = false;
        this.invulnerable = false;

        this.moveSpeed = 50;

        this.events.onKilled.add(this.onDeath, this);

        this.animations.add('move_n', [0, 1], 10, true);
        this.animations.add('move_ne', [2, 3], 10, true);
        this.animations.add('move_e', [4, 5], 10, true);
        this.animations.add('move_se', [6, 7], 10, true);
        this.animations.add('move_s', [8, 9], 10, true);
        this.animations.add('move_sw', [10, 11], 10, true);
        this.animations.add('move_w', [12, 13], 10, true);
        this.animations.add('move_nw', [14, 15], 10, true);
    }

    update() {
        this.followPath();
        
        let v = this.body.velocity;
        if (v.x === 0 && v.y === 0) {
            this.animations.stop();
            return;
        }

        let anim = 'move_n';

        if (v.x > -0.25 && v.x < 0.25 && v.y < 0) {
            anim = 'move_n';
        }
        if (v.x > -0.25 && v.x < 0.25 && v.y > 0) {
            anim = 'move_s';
        }
        if (v.x > 0 && v.y > -0.25 && v.y < 0.25) {
            anim = 'move_e';
        }
        if (v.x < 0 && v.y > -0.25 && v.y < 0.25) {
            anim = 'move_w';
        }
        if (v.x > 0 && v.y < 0) {
            anim = 'move_ne';
        }
        if (v.x > 0 && v.y > 0) {
            anim = 'move_se';
        }
        if (v.x < 0 && v.y > 0) {
            anim = 'move_sw';
        }
        if (v.x < 0 && v.y < 0) {
            anim = 'move_nw';
        }

        this.animations.play(anim);
    }
    
    moveToPath(path) {
        this.currentPath = path;
        this.currentPathIndex = 0;
    }
    
    stop() {
        this.body.acceleration.set(0);
        this.body.velocity.set(0);
    }
    
    followPath() {
        if (!this.currentPath) {
            return;
        }
        
        if (this.currentPathIndex >= this.currentPath.length) {
            this.stop();
            return;
        }
        
        let {x, y} = this.currentPath[this.currentPathIndex];
        
        this.game.physics.arcade.moveToXY(this, x, y, this.moveSpeed);
        
        let distance = this.game.math.distance(this.x, this.y, x, y);
        //console.debug('node: ', this.currentPathIndex, distance);
        if (distance < 0.5) {
            this.currentPathIndex++;
        }
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
