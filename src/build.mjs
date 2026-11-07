// Builds eqore-vault.html (the page) and seed.json (rows for seeding the shared store).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const seedSrc = readFileSync(join(here, 'seed.js'), 'utf8');
const app = readFileSync(join(here, 'app.html'), 'utf8');
const page = app.replace('/*SEED_JS*/', () => seedSrc);
writeFileSync(join(here, '..', 'eqore-vault.html'), page);
// Local test copy with the skeleton the publish step adds
writeFileSync(join(here, 'test.html'), '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + page + '</body></html>');
const seed = new Function(seedSrc + '\nreturn buildSeed();')();
writeFileSync(join(here, 'seed.json'), JSON.stringify(seed));
console.log('projects', seed.projects.map((p) => p.id + ':' + JSON.stringify(p).length).join(' '));
