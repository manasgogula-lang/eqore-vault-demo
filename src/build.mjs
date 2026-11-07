// Builds eqore-vault.html (the page) and seed.json (rows for seeding the shared store).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const seedSrc = readFileSync(join(here, 'seed.js'), 'utf8');
const app = readFileSync(join(here, 'app.html'), 'utf8');
const page = app.replace('/*SEED_JS*/', () => seedSrc);
writeFileSync(join(here, '..', 'eqore-vault.html'), page);
// Standalone copy (full HTML skeleton) for GitHub Pages and local testing
const standalone = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>' + page + '</body></html>';
writeFileSync(join(here, 'test.html'), standalone);
mkdirSync(join(here, '..', 'docs'), { recursive: true });
writeFileSync(join(here, '..', 'docs', 'index.html'), standalone);
writeFileSync(join(here, '..', 'docs', '.nojekyll'), '');
const seed = new Function(seedSrc + '\nreturn buildSeed();')();
writeFileSync(join(here, 'seed.json'), JSON.stringify(seed));
console.log('projects', seed.projects.map((p) => p.id + ':' + JSON.stringify(p).length).join(' '));
