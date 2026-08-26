# Breathe

A breathing practice for sleep, stress, and focus. One self-contained HTML file —
no build step, no dependencies, no network after first load. Add it to an iPhone
Home Screen from Safari and it runs full-screen and offline like a native app.

## Live

**https://padra.github.io/breathe/** *(enable GitHub Pages on `main` / root)*

On iPhone: open in Safari → Share → **Add to Home Screen**.

## The patterns

<!-- patterns:start -->

| Pattern | Rhythm | For | Session |
|---|---|---|---|
| **Resonance** | 4 in · 6 out | Stress, Sleep | you choose, from 5 min |
| **Coherent** | 5.5 in · 5.5 out | Sleep, Stress | you choose, from 5 min |
| **Long Exhale** | 4 in · 8 out | Sleep | you choose, from 5 min |
| **Cyclic Sigh** | in · top up · long out | Stress | you choose, from 5 min |
| **Box** | 4 · 4 · 4 · 4 | Stress | you choose, from 5 min |
| **Sharp Reset** | 15 sharp exhales · then settle | Focus | you choose, from 5 min |
| **CO₂ Table** | rest at 4 in · 6 out, then hold 40s | Dive | 11 min, fixed |
| **O₂ Table** | rest at 4 in · 6 out, then hold 30→70s | Dive | 12 min, fixed |

<sub>Generated from `index.html` by `tools/sync-readme.mjs` — edit the app, not this table.</sub>

<!-- patterns:end -->

Sessions start at 5 minutes because that is the minimum effective dose: comparing
5, 10, 15 and 20 minutes at six breaths per minute found no difference in vagal
activation between them. Longer sessions lower resting respiratory rate
afterward — duration buys carry-over, not depth. The two dive tables set their
own length and ignore the minutes control.

## Why these patterns

- **Resonance** — six breaths a minute sits at the baroreflex's own resonant
  frequency, so heart rate and blood pressure begin swinging in step. Beat both
  box breathing and 4-7-8 head-to-head on heart-rate variability.
- **Coherent** — the same principle at an even ratio; the pace used in most
  slow-breathing sleep research, and the one that survives a long session.
- **Long Exhale** — a 1:2 ratio. Vagal outflow to the heart rises during
  exhalation, so weighting the out-breath biases the whole cycle parasympathetic.
- **Cyclic Sigh** — Stanford RCT: five minutes a day for a month beat box
  breathing, cyclic hyperventilation *and* mindfulness meditation on mood.
- **Box** — moves HRV less than resonance, but the symmetry gives a racing mind
  a shape to follow, which is worth more than a few milliseconds of RMSSD.
- **Sharp Reset** — kapalabhati. Forced exhalation recruits the anterior deltoid
  and obliques more than a Valsalva; working-memory accuracy improved right
  after practice, though reaction time lengthened.
- **CO₂ Table** — trains tolerance of air hunger, which is a CO₂ signal rather
  than an oxygen one. In novices these dropped SpO₂ only ~6% against ~16% for
  maximal breath-holds.
- **O₂ Table** — trains hypoxia tolerance. Two weeks of daily dry apnea sharpens
  the diving response; eight weeks raises resting spleen volume. Honest caveat:
  in novices, tables did not produce deeper hypoxia than plain maximal holds, so
  their value is structure and safety rather than intensity.

## Reading a pattern

Every pattern shows its shape as a line: **rising** while you breathe in,
**level** while you hold, **falling** while you breathe out. Segment widths are
proportional to real elapsed time and each is labelled with its seconds, so a
40-second hold looks like a 40-second hold rather than one more evenly-spaced
step. The same graph appears in the description and again, larger, during the
countdown before a session starts.

## Breath-hold safety

The dive tables are **land-only**. Sit or lie down; never practise them in or near
water. Hypoxic blackout gives no warning and there is no self-rescue from it. The
breathe-up in these tables is deliberately slow — hyperventilating first is what
makes breath-holding lethal, because it strips the CO₂ that would otherwise make
you breathe before your oxygen ran out. The app states this on every dive pattern.

## Features

- Four ambient companions (Drifter, Aurora, Ink, Bloom) drawn on canvas, each
  breathing with you and idling on its own between phases
- A rise/hold/fall graph of each pattern, drawn to real time, in the description
  and on the pre-session countdown
- Synthesized audio, no asset files. Bell tones are modelled on struck metal:
  inharmonic partial ratios, per-partial decay, and two slightly detuned voices
  per partial so each ring beats and shimmers. Voices: Bowls, Glass, Handpan, Breath, None.
  Background: Thrum, Shruti box, Rain, or none. Optional metronome. Everything runs through a
  convolution reverb with progressive treble damping and a gentle limiter
- Local-only tracker: total hours, day streak, progress ring, and a chime at
  1, 3, 6, 12, 24, 50 and 100 hours. Nothing leaves the device
- Handles the two iOS traps: flips the audio session to `playback` so the ringer
  switch doesn't mute it, and takes a Wake Lock so the screen stays up

## Limits

Audio stops when iOS backgrounds the app, so it can't run behind a locked screen.

## Working on it

`index.html` is the whole application — open it, edit it, reload it. There is no
build step and no dependency to install.

Before committing a change to it:

```
node tools/check.mjs
```

That parses the inline script (a stray apostrophe once broke it in a way that
still rendered the menu but silently refused to start a session), confirms
nothing external crept in that would break offline use, checks every pattern has
the fields the UI reads, and verifies the README table still matches the app.

The pattern table in this README is **generated** from the `PATTERNS` array in
`index.html`. Change a rhythm or a duration in the app, then:

```
node tools/sync-readme.mjs
```

Rhythms and durations drift the moment the code changes, so they are derived.
The reasoning under *Why these patterns* is hand-written and stays that way —
evidence does not change because a number in the code did.

## Sources

- Balban et al. 2023, *Cell Reports Medicine* — [Brief structured respiration practices enhance mood and reduce physiological arousal](https://pmc.ncbi.nlm.nih.gov/articles/PMC9873947)
- Laborde et al. 2021, *IJERPH* — [Effects of slow-paced breathing duration on cardiac vagal activity](https://www.mdpi.com/1660-4601/18/23/12478)
- Laborde et al. 2021, *Sustainability* — [Inhalation/exhalation ratio and respiratory pauses](https://www.mdpi.com/2071-1050/13/14/7775)
- Nielsen et al. 2020, *Scientific Reports* — [Presleep slow breathing and polysomnographic sleep measures](https://www.nature.com/articles/s41598-020-64218-7)
- O'Connell et al. 2015 — [Forced exhalation, grunting and Valsalva on forehand force](https://pubmed.ncbi.nlm.nih.gov/26270695/)
- *Eur J Appl Physiol* 2024 — [Physiological responses to maximal apneas, O₂ and CO₂ tables in novices](https://link.springer.com/article/10.1007/s00421-024-05563-7)
- Engan et al. 2013 — [Two weeks of daily apnea training: diving response, spleen contraction, erythropoiesis](https://onlinelibrary.wiley.com/doi/10.1111/j.1600-0838.2011.01391.x)
- StatPearls — [Shallow water blackout](https://www.ncbi.nlm.nih.gov/books/NBK554620/)
- Cureus 2024 — [Kapalabhati, working memory and phasic HRV](https://www.cureus.com/articles/252321-the-influence-of-kapalabhati-on-working-memory-and-phasic-heart-rate-variability)
- *Frontiers in Psychology* 2022 — [Regulating breathing frequency alters emotions and motor performance](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.963711/full)

## Not medical advice

A calming practice, not a treatment. Stop if you feel light-headed.
