export class DNA {
    constructor(parent = null) {
        if (parent) {
            const mut = (rate) => (Math.random() - 0.5) * rate;
            this.speed = Math.max(0.6, Math.min(4.8, parent.speed + mut(0.35)));
            this.sight = Math.max(30, Math.min(220, parent.sight + mut(14)));
            this.size  = Math.max(3.8, Math.min(13.0, parent.size + mut(0.6)));
            this.hue   = (parent.hue + mut(20) + 360) % 360;
            this.diet  = Math.max(0, Math.min(1, parent.diet + mut(0.06)));
            this.generation = parent.generation + 1;
            this.speciesId = parent.speciesId;
            this.founder = parent.founder;
        } else {
            this.speed = 1.1 + Math.random() * 1.4;
            this.sight = 45 + Math.random() * 60;
            this.size  = 5.0 + Math.random() * 2.5;
            this.diet  = Math.random() < 0.25 ? 0.85 : (Math.random() < 0.35 ? 0.5 : 0.15);
            this.hue   = this.diet > 0.65 ? 10 : (this.diet < 0.35 ? 150 : 42);
            this.generation = 1;
            const tag = this.diet > 0.65 ? 'Carnis' : (this.diet < 0.35 ? 'Phyto' : 'Scav');
            this.speciesId = tag + '-1';
            this.founder = this;
        }
    }
    distanceTo(other) {
        const dSpd = Math.pow((this.speed - other.speed) / 4.0, 2);
        const dSight = Math.pow((this.sight - other.sight) / 180.0, 2);
        const dDiet = Math.pow(this.diet - other.diet, 2) * 2.5;
        return Math.sqrt(dSpd + dSight + dDiet);
    }
}
