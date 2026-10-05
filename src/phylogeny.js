export class PhylogenyTracker {
    constructor() {
        this.species = new Map();
        this.nextId = 2;
    }
    register(id, dna) {
        if (!this.species.has(id)) {
            this.species.set(id, { id, founder: dna, count: 1, hue: dna.hue, gen: dna.generation });
        }
    }
    testSpeciation(dna) {
        const cur = this.species.get(dna.speciesId);
        if (cur && dna.distanceTo(cur.founder) > 0.40) {
            const prefix = dna.diet > 0.65 ? 'Carnis' : (dna.diet < 0.35 ? 'Phyto' : 'Scav');
            const newId = prefix + '-' + (this.nextId++);
            dna.speciesId = newId;
            dna.founder = dna;
            this.species.set(newId, { id: newId, founder: dna, count: 1, hue: dna.hue, gen: dna.generation });
        }
    }
    update(creatures) {
        for (let s of this.species.values()) s.count = 0;
        for (let c of creatures) {
            if (c.alive) {
                const s = this.species.get(c.dna.speciesId);
                if (s) s.count++;
            }
        }
    }
    getActive() {
        return Array.from(this.species.values()).filter(s => s.count > 0).sort((a,b) => b.count - a.count);
    }
}
