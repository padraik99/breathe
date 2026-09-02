# Changelog

Newest first. Dates are when the change landed in the repo.

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
