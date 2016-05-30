import Unit from 'game/units/unit';

export default class MobileUnit extends Unit {
    constructor(game, x = 0, y = 0, spriteKey, selectronKey) {
        super(game, x, y, spriteKey, selectronKey);

        this.moveSpeed = 50;

        // clockwise directions
        //let dirs = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];

        let dirs = ['s', 'w', 'e', 'n', 'sw', 'se', 'nw', 'ne'];
        this.anims = {
            idle: [],
            walk: []
        };
        dirs.forEach((dir, i) => {
            this.anims.idle[i] = this.sprite.animations.add(`idle_${dir}`, [i + (i * 31), i + 1 + (i * 31)], 2, true);
            this.anims.walk[i] = this.sprite.animations.add(`walk_${dir}`, [i + 2 + (i * 31), i + 10 + (i * 31)], 5, true);
        });
        //console.debug('anims: ', this.anims);
        this.anims.idle[0].play();
    }

    update() {
        this.followPath();

        Phaser.Point.interpolate(this.forward, this.body.velocity, this.moveSpeed, this.forward);
        this.forward.normalize();

        let fAngle = this.position.angle(this.position.clone().add(this.forward.x, this.forward.y), false);
        let anim = this.getSpriteDirection(fAngle);
        //console.debug('foo', {fAngle, anim});
        if (this.body.velocity.isZero()) {
            if (!this.anims.idle[anim].isPlaying) {
                this.anims.idle[anim].play();
            }
        } else {
            if (!this.anims.walk[anim].isPlaying) {
                this.anims.walk[anim].play();
            }
        }
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
}