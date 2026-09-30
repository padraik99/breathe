# Changelog

Newest first. Dates are when the change landed in the repo.

## 2026-09-30 — Settings from a pause

A pause is usually a pause *for* something — most often to change a voice. That
needed ending the session, which was a silly price. The session chrome now
carries a third pill, **Resume · Settings · End**, and Settings appears only
while paused.

Deliberately only while paused: changing a voice mid-breath means fiddling
while the clock runs, and pausing first is the honest gesture — and the one
being made anyway.

Three things had to be taught about the pause:

- Auditioning a **background** used to leave it playing, because the audition
  only switches itself off again when no session is running. It now treats a
  paused session the same way.
- Swapping a **companion** while paused no longer starts the film immediately;
  resuming puts it back on screen.
- The clock still forgets the whole detour. A session with settings changed
  part-way through finishes at its proper length.

Verified by pausing, changing companion, background and voice in one visit,
closing the sheet and resuming: the film comes back playing, all three
settings persist, and the session runs to completion.

## 2026-09-30 — Eight companions

Four new ones, no barrier to entry on any of them.

- **Nettles** and **Moon** — both films, graded and slowed, each its own
  species. Only the chosen one is ever given a decoder; switching stops the
  other. Each session opens at a random point in the loop, so two nights never
  start on the same frame.
- **Dissolve** and **Filigree** — the two Julia sets picked out of the
  September study, which had been archived and then forgotten. Dissolve moves
  c across the edge of the period-2 bulb with the breath: inhale and the set is
  connected, one body; exhale and c leaves the bulb and it shatters into dust.
  Filigree hovers at the golden-mean Siegel point, the most intricate boundary
  in the family — it never breaks apart, the breath only opens and closes the
  lace.

The `--tint` wash is suppressed for the fractals. It exists to warm a drawn
creature toward the category accent, and at 46% over a full-screen render it
would have flooded the palette those sets are already built in.

Measured at device-pixel-ratio 2.5 with no GPU at all:

```
  reef 61   moon 61   dissolve 45   filigree 45
  jelly 45  aurora 29  ink 43       bloom 60
```

The fractals cost exactly what Drifter costs and rather less than Aurora, which
remains the slowest thing in the app.

**Size.** Both films re-cut to about 13.5 seconds at 20fps — slow organic
motion does not need 30, and it buys a third. Two films now cost less than the
single longer one did: **1.56 MB**, under the 2 MB rule with room to spare.

## 2026-09-30 — The footage is a companion, the bell is gone

- **Nettles is a companion now**, first in the list, not a layer behind one.
  Choosing it means the canvas draws no creature; the elapsed ring around it
  still breathes, so the pacing survives the drawn jellyfish leaving. Picking
  any other companion stops the decoder.
- **The pitched bell cue is cut.** Three versions of it failed and the last
  failed for a reason tuning cannot reach: a sound arriving out of nowhere
  makes you flinch, where a steady pulse gives you something to ride. Stored
  settings that still say `bell` migrate to Drops on load.
- **The metronome is a maraca.** It was a 1240 Hz chirp, which is a machine
  counting. It is now eleven grains bunched at the front and thinning out over
  about fifteen milliseconds — seeds hitting a gourd wall. Quieter and tighter
  than the shaker cue, because this one repeats sixty times a minute.

**Fixed: `TIMBRES` and `BEDS` were each declared twice** in the one scope the
app actually runs in — leftovers from when the file was assembled from parts.
Harmless today because the two copies were identical, but editing the first
would have done nothing at all.

**And the guard that should have caught that was checking nothing.** It scanned
`_*.js` files that no longer exist, so it passed by finding no files. Pointed
at the shipped inline script instead. It then still missed the duplicate twice
over: first a bracket-depth parser that recorded nothing for `var BEDS = [`
because the bracket never closes on that line, then a `!seen.has(name)` guard
that skipped a name *because* it had been seen before — which is the whole
condition being tested. Both fixed, and verified by reintroducing a duplicate
and watching the gate reject it.

## 2026-09-29 — Real jellyfish, behind the drawn one

Patrick found footage he shot of sea nettles and moon jellies. It is now the
background of a session, with the canvas companion still breathing on top.

**It runs free, deliberately.** Measured, an unsynchronised clip drifts about
1% of elapsed time — 7 seconds over a twelve-minute session, most of a breath,
enough that the bell would end up contracting on the inhale. A control loop
nudging `playbackRate` held it to 0.08s indefinitely and worked fine. We chose
not to use it. The companion above is already exactly in phase and is the
pacer; two things claiming that job is worse than one, and an animal that
contracted precisely on every exhale for twelve minutes would stop reading as
alive. The independence is the point. This only holds while the footage stays
*behind* and dim — brought forward it becomes the pacer again by default, an
unsynchronised one.

**Graded into the palette rather than used as shot.** The footage is 53.6%
blue by mean channel energy, which is the wavelength melanopsin answers to and
the whole reason Sleep runs amber. Pulled down, with the water pushed toward
plum and the jellies left warm, it measures 22.7% — about where the app's own
amber accent sits (21.3%). A first attempt flattened it to a duotone and was
awful; the blue negative space is what holds the animals apart.

**It fades back after the first minute.** Nobody watches a screen for twelve
minutes — you settle in and then follow the audio. So it rises over four
seconds, holds while you are settling, and then eases from 55% to 26% opacity
over the following minute. Pausing fades it out and stops the decoder; ending
the session removes it entirely. Settings &rarr; Footage turns it off, which
also skips the decode.

Slowed 2.25x with motion interpolation, one 20-second loop, 1.2 MB inlined.
The app is now 1.66 MB. **New standing rule: keep it under 2 MB.**

## 2026-09-09 — Rain that has rain in it

The rain background sounded like wind because it was wind. It was two bands of
filtered noise and nothing else — no impacts at all — with the breath sweeping
its lowpass from 950 to 1650 Hz and its gain up 4 dB and back down. A moving
filter and a moving level over noise is the textbook recipe for a gust. Three
faults, all now fixed.

- **There are drops in it now.** Each is a short exponential ring that rises
  slightly in pitch as the bubble forms under the splash, with a broadband tick
  on the front. Size is cubed-uniform, so most drops are small and the fat ones
  are occasional — which is what makes rain uneven rather than mechanical.
  About 35 a second across three layers.
- **The wash was drowning them.** Measured, the impacts sat 7.5 dB below the
  noise bed in RMS, so the ear got a wash with some texture in it rather than
  rain. The wash is down to a fifth of its old level; it is the mass of rain
  falling further off, not the whole sound.
- **It no longer breathes.** `droneBreath()` now returns immediately for rain.
  Rain falls at one rate.

Measured over ten seconds:

```
                  impacts/sec   drop size spread   level drift
  old rain bed        0.0            0.0 dB          4.3 dB
  new rain bed       10.5            5.3 dB          3.3 dB
```

The remaining 3.3 dB is the randomness of a shower, not a cycle — the old bed's
4.3 dB was locked to the breath. Three loops of awkward length (7.31, 11.13 and
17.51 seconds) at slightly different playback rates mean it never audibly
repeats, and nothing is scheduled, so there are no timers to drift or be
throttled when the screen dims.

**The cue drops were identical every time.** Two drops, fixed offsets, fixed
pitches, fixed levels — only the noise seed changed. Count (two or three),
size, pitch, decay, level and spacing are all drawn fresh now, and size drives
the rest, so a big drop rings lower and longer than a small one. Duration
across twelve firings spread 190 ms, against 11 ms before.

## 2026-09-08 — Cue level says what it does, and the preview stops lying

Two reasons the three cue levels sounded identical.

- **The preview was auditioning them against silence.** The background only
  runs during a session, so tapping a cue in Settings fired it with no bed
  playing — which meant it fell back to the fixed floor used when there is
  nothing to measure. The one thing the setting changes, its margin over the
  background, was not in the room. Tapping either cue row now brings the real
  background up first, plays the cue twice, and fades the background out again.
- **The steps were too small to hear.** They were +1 / +4 / +8 dB: 3 and 4 dB
  apart, 7 dB end to end. Three decibels is about the threshold of noticing on
  a short transient. Now **−2 / +4 / +10** — 6 dB steps, which is a doubling of
  amplitude each time, and 12 dB end to end.

The row also states the actual figure rather than a mood word: *"4 dB over the
background — clearly there, not startling."* Underneath it, a note explains
that the cue is not set to a fixed volume at all: the app measures how loud
your background really is and places the cue that many decibels above it, so
one setting sounds the same under Shruti, the Thrum, Rain or nothing — and
that with Background set to None there is nothing to measure, so a quiet fixed
level is used instead.

## 2026-09-08 — Nothing was ever being saved

**Fixed: every setting, and the whole practice log, had been writing to the
wrong key.** `LS` was the localStorage key in `_state.js`. `LS` was also the
layout scale in the visual files. The source files are concatenated into one
function scope at build time, so on the first animation frame the layout code
overwrote the key: `save()` had been calling
`localStorage.setItem(0.5, …)` while `load()` read `breathe.v2`, which no
longer existed. Nothing threw. Storage looked healthy. Settings simply
evaporated on every reload, which is why "pick up where I left off" never
worked and why the log did not survive updates.

The layout variable is now `LSC`. `tools/check.mjs` fails the build if any
top-level name is declared in two source files, so this class of bug cannot
come back — verified by reintroducing the collision and watching the gate
reject it.

**The transition cue is no longer a note.** Three pitched versions failed
here. A pitched cue has to find a hole in the harmony *and* a level that suits
both a dense background and silence, and those constraints pull against each
other. Noise has no fundamental, so it cannot be masked harmonically — which
leaves only the level, and the level is now measured off the bed with an
`AnalyserNode` rather than guessed. Settings → Transition cue offers **Drops**
(default), **Shaker**, the old **Bell**, and **Off**; Cue level sets how far
above the background it sits — Soft, Medium (+4 dB) or Clear. Across the three
backgrounds, which differ by 11 dB, the same setting gives the same margin.

With the cue Off the closing ring brightens to carry the change on its own.

## 2026-09-04 — Settings stays open, and the app says which build it is

- **Fixed: Settings dismissed itself when you scrolled back up.** The
  swipe-to-close listener sat on the whole sheet and fired on any 70px of
  downward travel — and scrolling *up* through a long sheet is a downward finger
  drag. It now only reads as a dismiss when the content was already at its top,
  did not scroll during the gesture, and the drag was mostly vertical.
- **A build stamp and a storage report** at the foot of Settings: the build
  date-time, whether localStorage accepts a write, how many bytes are actually
  stored, whether resume is on, and whether the browser granted persistent
  storage or is treating it as evictable. There is no service worker, so a
  Home Screen shortcut can serve a stale copy of the app indefinitely — this
  makes "am I running the old one?" answerable on the phone instead of by guess.

## 2026-09-02 — Pause, an elapsed ring, and three sounds measured

From a session on the phone. The three audio changes were rendered offline
through a real Web Audio graph and compared spectrally against the shruti bed —
the loudest, densest background, and the one they failed under — rather than
adjusted by guesswork. Figures below are measured, not claimed.

- **The breath voice no longer sounds like weather.** It was one wide bandpass
  with a lowpass at 1900 Hz, which is a wind machine. It is now two narrow
  formants that glide in opposite directions with the breath, rolled off at
  980 Hz. Energy above 2 kHz is down **25 dB**, the spectral centroid drops from
  551 Hz to 347 Hz, and the swell now sits **9.5 dB under the bed** instead of
  4.3 dB — it is a breath behind the room, not in front of it.
- **The pre-cue was not quiet, it was invisible.** Its old pitch was 293.7 Hz —
  the same pitch as the shruti's own third harmonic, to within 0.3 Hz. Not
  masked: identical. It has moved a minor third up, to 349 Hz, which is a chord
  tone against the drone's D and lands in a spectral hole (the bed has no
  measurable energy there), and it ducks the bed 34% for half a second as it
  strikes. Margin over the bed in its own band: **+0.1 dB before, +19.8 dB
  after**, plus 3.6 dB from the duck.
- **The metronome moved to where the ear lives.** A 155 Hz sine pluck sat in the
  bed's loudest region and 3.7 dB over it, at a frequency the ear is least
  sensitive to. It is now a short 1240→780 Hz chirp with a noise transient:
  **+15.7 dB over the bed**, in the band hearing is sharpest in.
- **The metronome now has a visual pulse.** It never had one — that was a gap,
  not a setting. A small tinted pip breathes at the foot of the screen on each
  beat, so the pulse still reads with the sound off.
- **Pause.** End is no longer the only exit. Pause stops the clock, fades the
  bed, releases the wake lock and marks the screen PAUSED; resuming shifts the
  session start so the paused time is never counted. Both are pill buttons now,
  reachable by tapping the screen.
- **An elapsed ring that breathes.** A thin arc around the companion, filling
  from twelve o'clock, whose width and glow rise and fall with the current
  breath rather than sweeping flat. The old linear progress bar is gone.

## 2026-09-02 — The clicking

**Fixed: the audio-unlock clip was not silent.** 8-bit WAV samples are unsigned,
so silence is `0x80`; the clip was filled with `0x00`, which is full-scale
negative — a DC offset looping every 0.15 seconds. On desktop `volume = 0.001`
hid it. iOS ignores programmatic volume on media elements, so on an iPhone it
played at output level and clicked at every loop boundary. Now genuinely silent
and one second long.

**Fixed: a small pop when a session ended.** `stopDrone()` faded with
`setTargetAtTime`, which only ever approaches zero, then stopped the oscillators
on its tail — a step, and a step is a click. It now ramps to a true zero first.

If anyone misses the pulse: Settings → Metronome is a deliberate one-per-second
soft pluck, off by default.

## 2026-08-30 — Three rings, three jobs

Refinement of the dial after first use.

- **The ring now does two things at two radii.** Outer band sets the length —
  sixty ticks that are a real minute scale, an arc filling from twelve o'clock.
  Inner band turns through *worlds*: companion and voice as a matched pair, with
  the band painted in that world's colours as a preview of what you are about to
  see and hear.
- **Protocol dots are static and tapped**, equidistant around the inner band, all
  one colour, the live one breathing at six a minute. Carets gone — the control
  no longer needs a caption to explain itself.
- **A shape strip** flashes the chosen pattern between the dial and the clock for
  under three seconds, then clears, so the rhythm is confirmed without
  permanently occupying the screen.
- **The bell swims.** Squash and stretch were a tenth each and inverted, so it got
  wider as it emptied. Now it narrows and elongates on the squeeze, the margin
  folds under, a jet pushes it up on the contraction, and it leans into its own
  drift carrying the tentacle roots with it — which is what stopped the tail
  looking bolted on.
- **Begin is a tap**, not a hold. The hold was ceremony pretending to be accident
  prevention.
- **Pre-cue down to 57%** with a slower attack, and its companion ring nearly
  invisible unless the voice is set to None and it has to carry the cue alone.
- Companion removed from the home screen; it belongs to the session.

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
