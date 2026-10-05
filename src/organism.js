import { DNA } from './dna.js';

export class Organism {
    constructor(x, y, parentDNA = null, phylogeny = null) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.dna = new DNA(parentDNA);
        if (phylogeny) {
            phylogeny.testSpeciation(this.dna);
            phylogeny.register(this.dna.speciesId, this.dna);
        }
        this.energy = 90;
        this.alive = true;
        this.tail = [];
        this.niche = this.dna.diet > 0.65 ? 'carnivore' : (this.dna.diet < 0.35 ? 'herbivore' : 'scavenger');
    }

    update(env, creatures) {
        const seasonBurn = env.season === 'Kış' ? 1.35 : 1.0;
        this.energy -= (0.045 + (this.dna.speed * 0.032) + (this.dna.size * 0.012)) * seasonBurn;
        if (this.energy <= 0) {
            this.alive = false;
            env.addCarrion(this.x, this.y);
            return;
        }

        let steerX = 0, steerY = 0, hasTarget = false;

        if (this.niche === 'herbivore') {
            let pred = null, minPred = this.dna.sight * 0.8;
            let flockX = 0, flockY = 0, flockCount = 0;

            for (let c of creatures) {
                if (!c.alive || c === this) continue;
                const d = Math.hypot(c.x - this.x, c.y - this.y);
                if (c.niche === 'carnivore' && d < minPred) { minPred = d; pred = c; }
                else if (c.niche === 'herbivore' && d < 35) {
                    flockX += c.vx; flockY += c.vy; flockCount++;
                }
            }

            if (pred) {
                steerX = (this.x - pred.x) / minPred;
                steerY = (this.y - pred.y) / minPred;
                hasTarget = true;
            } else {
                if (flockCount > 0) {
                    steerX += (flockX / flockCount) * 0.2;
                    steerY += (flockY / flockCount) * 0.2;
                }
                const food = env.findClosestFood(this.x, this.y, this.dna.sight);
                if (food) {
                    const d = Math.hypot(food.x - this.x, food.y - this.y);
                    steerX += (food.x - this.x) / d;
                    steerY += (food.y - this.y) / d;
                    hasTarget = true;
                    if (d < this.dna.size + food.r) {
                        this.energy = Math.min(210, this.energy + 36);
                        food.eaten = true;
                    }
                }
            }
        } else if (this.niche === 'carnivore') {
            let prey = null, minPrey = this.dna.sight;
            for (let c of creatures) {
                if (c.alive && c.niche === 'herbivore') {
                    const d = Math.hypot(c.x - this.x, c.y - this.y);
                    const camo = 1.0 - (Math.abs(c.dna.hue - 220) / 180) * 0.45;
                    const effectiveD = d / camo;
                    if (effectiveD < minPrey) { minPrey = effectiveD; prey = c; }
                }
            }
            if (prey) {
                steerX = (prey.x - this.x) / minPrey;
                steerY = (prey.y - this.y) / minPrey;
                hasTarget = true;
                if (Math.hypot(prey.x - this.x, prey.y - this.y) < this.dna.size + prey.dna.size) {
                    prey.alive = false;
                    this.energy = Math.min(250, this.energy + 80);
                }
            }
        } else {
            const carrion = env.findClosestCarrion(this.x, this.y, this.dna.sight * 1.1);
            if (carrion) {
                const d = Math.hypot(carrion.x - this.x, carrion.y - this.y);
                steerX = (carrion.x - this.x) / d; steerY = (carrion.y - this.y) / d;
                hasTarget = true;
                if (d < this.dna.size + carrion.r) {
                    this.energy = Math.min(190, this.energy + 32);
                    carrion.eaten = true;
                }
            }
        }

        if (hasTarget) { this.vx += steerX * 0.16; this.vy += steerY * 0.16; }
        else { this.vx += (Math.random() - 0.5) * 0.25; this.vy += (Math.random() - 0.5) * 0.25; }

        const spd = Math.hypot(this.vx, this.vy);
        if (spd > 0) {
            this.vx = (this.vx / spd) * this.dna.speed;
            this.vy = (this.vy / spd) * this.dna.speed;
        }
        this.x += this.vx; this.y += this.vy;
        env.clampToBounds(this);
    }
}
