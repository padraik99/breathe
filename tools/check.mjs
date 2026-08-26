#!/usr/bin/env node
/*
 * Everything that must be true before index.html is worth committing.
 *
 *   node tools/check.mjs
 *
 * Catches the two failure modes that have actually bitten this project:
 * a syntax error inside the inline <script> (the app loads, renders the menu,
 * and silently refuses to start a session), and a README that no longer
 * describes the app.
 */
import { readFileSync, writeFileSync, unlinkSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const fail = m => { console.error('FAIL  ' + m); process.exitCode = 1; };
const pass = m => console.log('ok    ' + m);

const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

// 1. the inline script must parse
const script = /<script>([\s\S]*)<\/script>/.exec(html);
if (!script) fail('no inline <script> found in index.html');
else {
  // scratch goes in the OS temp dir, never in the repo — this script must not
  // leave anything behind, least of all somewhere git will notice it
  const dir = mkdtempSync(join(tmpdir(), 'breathe-'));
  const tmp = join(dir, 'inline.js');
  try {
    writeFileSync(tmp, script[1]);
    execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' });
    pass('inline script parses');
  } catch (e) {
    fail('inline script has a syntax error:\n' + String(e.stderr || e.message).trim());
  } finally { try { rmSync(dir, { recursive: true, force: true }); } catch {} }
}

// 2. it must stay self-contained — no external fetches, or offline breaks
const external = [...html.matchAll(/(?:src|href)\s*=\s*["'](https?:)?\/\/[^"']+/gi)]
  .map(m => m[0]).filter(s => !/^href\s*=\s*["']https?:\/\/(pubmed|pmc|www\.mdpi|www\.nature|link\.springer|onlinelibrary|www\.ncbi|www\.frontiersin|www\.cureus|www\.rlss)/i.test(s));
if (external.length) fail('external asset references (breaks offline use):\n  ' + external.join('\n  '));
else pass('no external asset references');

// 3. every pattern needs the fields the UI reads
try {
  const from = html.indexOf('/* --- freediving tables'), to = html.indexOf('var DURATIONS');
  const patterns = new Function(html.slice(from, to) + '\n return PATTERNS;')();
  const required = ['id','name','tags','phases','rhythm','rate','badge','why'];
  let bad = 0;
  for (const p of patterns) {
    for (const k of required) if (p[k] === undefined) { fail(`pattern "${p.id || '?'}" is missing ${k}`); bad++; }
    if (p.phases.some(ph => !(ph.s > 0))) { fail(`pattern "${p.id}" has a phase with no duration`); bad++; }
  }
  if (!bad) pass(`${patterns.length} patterns well-formed`);
} catch (e) { fail('could not read PATTERNS: ' + e.message); }

// 4. README table must match the app
try {
  execFileSync(process.execPath, [join(ROOT, 'tools/sync-readme.mjs'), '--check'], { stdio: 'pipe' });
  pass('README pattern table is current');
} catch (e) {
  fail('README pattern table is stale — run: node tools/sync-readme.mjs');
}

if (!process.exitCode) console.log('\nAll checks passed.');
