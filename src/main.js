import { Organism } from './organism.js';
import { Environment } from './environment.js';
import { PhylogenyTracker } from './phylogeny.js';

const canvas = document.getElementById('dish');
const ctx = canvas.getContext('2d');
const R = canvas.width / 2;
const env = new Environment(R, R, R);
const phylogeny = new PhylogenyTracker();
let creatures = [];

function init() {
    creatures = [];
    for (let i = 0; i < 28; i++) {
        creatures.push(new Organism(R + (Math.random() - 0.5) * R, R + (Math.random() - 0.5) * R, null, phylogeny));
    }
}
init();

function loop() {
    ctx.fillStyle = 'rgba(6, 7, 10, 0.35)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    env.update();
    for (let c of creatures) c.update(env, creatures);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
