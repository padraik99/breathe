#!/usr/bin/env node
/*
 * Keeps README.md's pattern table honest.
 *
 * index.html is the single source of truth: this reads the PATTERNS array
 * straight out of the app and rewrites the table between the markers in
 * README.md. Anything hand-written outside those markers is left alone.
 *
 *   node tools/sync-readme.mjs          rewrite the table
 *   node tools/sync-readme.mjs --check  exit 1 if the table has drifted
 *
 * The table is the spec — rhythms, durations, categories — and it drifts the
 * moment the app changes. The reasoning below it is hand-written on purpose:
 * evidence does not change when a number in the code does.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const START = '<!-- patterns:start -->';
const END   = '<!-- patterns:end -->';

const CATEGORY = { sleep:'Sleep', stress:'Stress', focus:'Focus', dive:'Dive' };

function readPatterns() {
  const src = readFileSync(join(ROOT, 'index.html'), 'utf8');
  const from = src.indexOf('/* --- freediving tables');
  const to   = src.indexOf('var DURATIONS');
  if (from < 0 || to < 0) throw new Error('Could not locate the PATTERNS block in index.html');
  // this slice is the pattern builders plus PATTERNS itself — no DOM, no audio
  return new Function(src.slice(from, to) + '\n return PATTERNS;')();
}

function secondsOf(p) {
  if (!p.once) return null;
  return Math.round(p.phases.reduce((n, ph) => n + ph.s, 0));
}

function buildTable(patterns) {
  const rows = patterns.map(p => {
    const cats = p.tags.map(t => CATEGORY[t] || t).join(', ');
    const secs = secondsOf(p);
    const len  = secs ? `${Math.round(secs / 60)} min, fixed` : 'you choose, from 5 min';
    return `| **${p.name}** | ${p.rhythm} | ${cats} | ${len} |`;
  });
  return [
    '| Pattern | Rhythm | For | Session |',
    '|---|---|---|---|',
    ...rows,
    '',
    '<sub>Generated from `index.html` by `tools/sync-readme.mjs` — edit the app, not this table.</sub>'
  ].join('\n');
}

const path = join(ROOT, 'README.md');
const readme = readFileSync(path, 'utf8');
const a = readme.indexOf(START), b = readme.indexOf(END);
if (a < 0 || b < 0) {
  console.error(`README.md is missing the ${START} / ${END} markers.`);
  process.exit(2);
}

const table = buildTable(readPatterns());
const next = readme.slice(0, a + START.length) + '\n\n' + table + '\n\n' + readme.slice(b);

if (process.argv.includes('--check')) {
  if (next !== readme) {
    console.error('README.md pattern table is out of date. Run: node tools/sync-readme.mjs');
    process.exit(1);
  }
  console.log('README.md pattern table is current.');
} else {
  if (next === readme) console.log('README.md pattern table already current.');
  else { writeFileSync(path, next); console.log('README.md pattern table updated.'); }
}
