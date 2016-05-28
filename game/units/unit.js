import {Phaser} from 'phaser';

export default class Unit extends Phaser.Sprite {
    constructor(game, x = 0, y = 0, key) {
        super(game, x, y, key);

        game.physics.arcade.enable(this);

        this.anchor.setTo(0.5);

        this.body.collideWorldBounds = true;
        this.body.immovable = false;

        this.forward = new Phaser.Point();

        // stats
        this.maxHealth = 10;
        this.health = 10;
        this.flying = false;
        this.invulnerable = false;

        this.moveSpeed = 50;

        this.events.onKilled.add(this.onDeath, this);

        // clockwise directions
        let dirs = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];

        // at the moment my sheet only has 1 frame for each...

        dirs.forEach((dir, i) => {
            this.animations.add(`move_${dir}`, [i], 10, true);
        });
    }

    update() {
        this.followPath();

        if (this.body.velocity.isZero()) {
            this.animations.stop();
            return;
        }

        Phaser.Point.interpolate(this.forward, this.body.velocity, this.moveSpeed, this.forward);
        this.forward.normalize();

        //let facingAngle = this.position.angle(this.position.clone().add(this.forward.x, this.forward.y), true);
        //facingAngle = Math.ceil(facingAngle);

        let fwd = this.forward.clone();
        fwd.setMagnitude(10);
        let facingAngle = Math.atan2(fwd.y - this.y, fwd.x - this.x);
        facingAngle = Math.ceil(facingAngle * (180 / Math.PI));
        if (facingAngle < 0) {
            facingAngle += 360;
        }

        let v = this.body.velocity;
        let anim = 'move_n';

        if (facingAngle === 0 || (facingAngle < 45 && facingAngle > 0)) {
            anim = 'move_e';
        }

        if (facingAngle < 0 && facingAngle >= -85) {
            anim = 'move_ne';
        }

        if (facingAngle < -85 && facingAngle > -105) {
            anim = 'move_n';
        }

        if (facingAngle === 180) {
            anim = 'move_w';
        }

        if (facingAngle === 90) {
            anim = 'move_s'
        }

        console.debug(facingAngle, anim);

        /*
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
        */
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
        if (distance < 0.9) {
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
