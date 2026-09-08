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

/* ------------------------------------------------------------------
   Duplicate top-level names.

   The source files are concatenated into ONE function scope at build
   time, so a `var` at the top level of one file is in scope in all of
   them. `LS` was the localStorage key in _state.js and, independently,
   the layout scale in the visual files. On the first animation frame the
   layout code overwrote the key with 0.5, so every save() after that
   wrote to a key named "0.5" and load() read "breathe.v2", which no
   longer existed. Nothing threw. Settings simply never persisted.

   Short names in separate files are not separate. This checks.
   ------------------------------------------------------------------ */
const SRC = ['_patterns.js','_state.js','_audio.js','_glyph.js',
             '_vis_keep.js','_vis_new.js','_ui.js'];
const seen = new Map();
const clashes = [];
for(const f of SRC){
  const full = join(ROOT, f);
  let text; try{ text = readFileSync(full,'utf8'); }catch{ continue; }
  const names = new Set();
  /* Only real top-level declarations count. A name assigned from another file
     is usually deliberate shared state; a name DECLARED twice is the hazard,
     because the second `var` silently takes over the first one's value. */
  for(const m of text.matchAll(/^(?:var|let|const)\s+([^;\n]*(?:\n\s{4,}[^;\n]*)*)/gm)){
    let depth = 0, cur = '';
    for(const ch of m[1] + ','){
      if('([{'.includes(ch)) depth++;
      else if(')]}'.includes(ch)) depth--;
      if(ch === ',' && depth === 0){
        const id = cur.trim().split('=')[0].trim();
        if(/^[A-Za-z_$][\w$]*$/.test(id)) names.add(id);
        cur = '';
      } else cur += ch;
    }
  }
  for(const m of text.matchAll(/^function\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);
  for(const n of names){
    if(seen.has(n) && seen.get(n) !== f) clashes.push(`${n}  (${seen.get(n)} and ${f})`);
    else seen.set(n, f);
  }
}
if(clashes.length){
  fail('top-level names declared in more than one file — they share one scope:\n      ' +
       clashes.join('\n      '));
} else pass('no top-level name collisions between modules');

if (!process.exitCode) 
console.log('\nAll checks passed.');
