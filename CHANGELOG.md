# Changelog

Newest first. Dates are when the change landed in the repo.

## 2026-08-30 — The dial

Whole interface rebuilt. The old vertical list read as a web page; this reads as
an instrument.

- **A ring instead of a list.** Categories across the top (ALL last), then a dial
  you turn to move between the patterns in that category. One dot per pattern,
  active at the top, with a `2 / 3 · SLEEP` label and tappable chevrons so the
  control explains itself rather than needing a caption. ALL falls back to a list
  — eight dots on one ring is clutter, and consistency is not worth that.
- **Warm night palette, shifting by category.** Deep plum and amber for Sleep,
  cold blue for Dive. Not only style: melanopsin peaks near 480 nm, so the old
  cyan accent was close to the worst possible hue for a bedtime screen.
- **Any whole minute, ending on an exhale.** Type it or hold the accelerating
  ±. The requested time is a target — the app finishes the breath you are in and
  stops at the end of the next exhale, and the home screen shows the real figure.
- **Each mode remembers its own length**, so Sleep opens at your Sleep number and
  Focus at your Focus number, and the common case needs no input at all.
- **Tentacles simulated, not animated.** Each is a chain of points with inertia,
  drag and a spatially varying current; the tail genuinely lags and curls. The
  previous version was a fixed vertical drop with a sine over it, which is why it
  looked like an Irish dancer — feet moving, torso rigid.
- **Aurora rebuilt** as five independent curtains at their own heights and speeds,
  with flares, filling the screen.
- **A pre-cue one second before every phase change**, at the pitch of the phase
  about to arrive, plus a closing ring for anyone running silent.
- **Storage hardened**: `navigator.storage.persist()`, and export/import codes in
  Settings so hours survive a reinstall or a new phone.
- Evidence notes moved into a sheet — two lines on the dial, the whole note one
  tap away.

## 2026-08-26

**Pattern shapes.** Every pattern now shows its rhythm as a line — rising on an
inhale, level on a hold, falling on an exhale — with segment widths true to real
elapsed time and each segment labelled with its seconds. Appears in the
description and again, larger, on the pre-session countdown, which grew from 3s
to 4s so there is time to read it.

**Dive table rhythm lines corrected.** "6 holds of 40s" named only the holds and
hid the fact that the rest between them is 4-in/6-out resonance breathing — most
of the session. Both tables now say so in the rhythm line and the description.

**Fixed:** an unescaped apostrophe in the CO₂ description terminated its string
literal and broke the whole inline script. The app still rendered its menu but
silently refused to start a session. `tools/check.mjs` now guards against this.

**Added:** `tools/check.mjs` (pre-commit checks) and `tools/sync-readme.mjs`
(regenerates the README pattern table from the app).

## 2026-08-26 — Tones changed, links brightened

- **Handpan** voice, tuned harmonically (octave and twelfth) rather than
  inharmonically like the bowls, with a soft shell tap on the onset.
- **Shruti box** background: reed harmonics through a peaking filter, four
  voices drifting a few cents against each other, bellows air on top.
- Raised contrast on every un-selected control — nav row from 20% to 58%
  opacity, plus an accent underline on the active filter, and matching lifts to
  the minute numerals, pattern rows, settings cards and stats line.
- **Fixed:** the pattern list scrolled past the selected heading, measuring the
  row's offset against the wrong ancestor and adding the header height.

## 2026-08-26 — Initial commit

Eight patterns across Sleep, Stress, Focus and Dive, each carrying a note on what
the evidence supports and where it thins out. Four canvas companions. Synthesized
audio with no asset files. Local-only tracker with milestone chimes. iOS audio
session and wake lock handling.

Removed before release: **4-7-8** (a real named protocol, but thinly evidenced
and it under-performed plain 6-breath breathing on HRV) and **Charge** (raised
felt arousal but showed no reliable gain in reaction time or accuracy, which is
the only thing it would have been for).
