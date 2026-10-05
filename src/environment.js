export class Environment {
    constructor(R, CX, CY) {
        this.R = R; this.CX = CX; this.CY = CY;
        this.foods = []; this.carrion = [];
        this.seasonTick = 0;
        this.seasons = ['Bahar', 'Yaz', 'Güz', 'Kış'];
        this.seasonIdx = 0;
        this.season = 'Bahar';
        this.foodCap = 75;
    }
    update() {
        this.seasonTick++;
        if (this.seasonTick > 900) {
            this.seasonTick = 0;
            this.seasonIdx = (this.seasonIdx + 1) % this.seasons.length;
            this.season = this.seasons[this.seasonIdx];
            this.foodCap = this.season === 'Kış' ? 25 : (this.season === 'Bahar' ? 95 : 65);
        }
        const spawnRate = this.season === 'Kış' ? 0.05 : 0.22;
        if (this.foods.length < this.foodCap && Math.random() < spawnRate) {
            this.foods.push({
                x: this.CX + (Math.random() - 0.5) * (this.R * 1.6),
                y: this.CY + (Math.random() - 0.5) * (this.R * 1.6),
                r: 2.4, eaten: false
            });
        }
        this.foods = this.foods.filter(f => !f.eaten);
        this.carrion = this.carrion.filter(c => !c.eaten);
    }
    addCarrion(x, y) {
        if (this.carrion.length < 25) this.carrion.push({ x, y, r: 3.2, eaten: false });
    }
    findClosestFood(x, y, maxD) {
        let closest = null, minD = maxD;
        for (let f of this.foods) {
            const d = Math.hypot(f.x - x, f.y - y);
            if (d < minD) { minD = d; closest = f; }
        }
        return closest;
    }
    findClosestCarrion(x, y, maxD) {
        let closest = null, minD = maxD;
        for (let c of this.carrion) {
            const d = Math.hypot(c.x - x, c.y - y);
            if (d < minD) { minD = d; closest = c; }
        }
        return closest;
    }
    clampToBounds(org) {
        const d = Math.hypot(org.x - this.CX, org.y - this.CY);
        if (d > this.R - org.dna.size - 8) {
            const a = Math.atan2(org.y - this.CY, org.x - this.CX);
            org.vx -= Math.cos(a) * 0.45; org.vy -= Math.sin(a) * 0.45;
        }
    }
}
