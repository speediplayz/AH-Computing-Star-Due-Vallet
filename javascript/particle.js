class Particle{

    // speed -> vector -> x: min, y: max
    constructor(pos, size, speed, drag, radius, color, duration){
        this.pos = pos.clone();
        this.size = size;
        this.speed = speed;
        this.drag = drag;
        this.radius = radius;
        this.color = color;
        this.duration = duration;
        
        this.particles = new Array(size);

        // initialize particles
        for(let i = 0; i < this.particles.length; i++){
            let p = pos.clone();
            let v = Vector2.random(Math.random() * (speed.y-speed.x) + speed.x);
            this.particles[i] = {pos:p, vel:v, rad:radius, col:color, drag:drag, init:new Date().getTime()};
        }
    }

    update(){
        // loop over all particles
        for(let i = 0; i < this.particles.length; i++){
            let p = this.particles[i];
            // delete if the currentl particle has expired
            if(new Date().getTime() > p.init + this.duration){
                this.particles.splice(i, 1);
                i--;
            }
            // update position and velocity
            p.pos.add(p.vel)
            p.vel.multiply(p.drag);
        }
    }

    draw(c){
        // loop over all particles
        for(let i = 0; i < this.particles.length; i++){
            let p = this.particles[i];
            // draw current particle to screen
            c.fillStyle = p.col;
            c.beginPath();
            c.arc(p.pos.x, p.pos.y, p.rad, 0, 2 * Math.PI);
            c.fill();
        }
    }
}