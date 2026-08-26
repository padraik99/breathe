# Breathe

A breathing practice for sleep, stress, and focus. One self-contained HTML file —
no build step, no dependencies, no network after first load. Add it to an iPhone
Home Screen from Safari and it runs full-screen and offline like a native app.

## Live

**https://padra.github.io/breathe/** *(enable GitHub Pages on `main` / root)*

On iPhone: open in Safari → Share → **Add to Home Screen**.

## The patterns

Every pattern in the app carries a short note on what the evidence actually
supports. The short version:

| Pattern | Rhythm | For | Basis |
|---|---|---|---|
| **Resonance** | 4 in · 6 out | stress, sleep | ~6 breaths/min sits at the baroreflex's resonant frequency; beat box and 4-7-8 head-to-head on HRV |
| **Coherent** | 5.5 · 5.5 | sleep, stress | same principle, even ratio; the pace used in most slow-breathing sleep research |
| **Long Exhale** | 4 in · 8 out | sleep | 1:2 ratio — vagal outflow rises during exhalation, so weighting the out-breath biases the cycle parasympathetic |
| **Cyclic Sigh** | double inhale · long exhale | stress | Stanford RCT: 5 min/day for a month beat box breathing, cyclic hyperventilation and mindfulness meditation on mood |
| **Box** | 4 · 4 · 4 · 4 | stress | moves HRV less than resonance, but the symmetry gives a racing mind a shape to follow |
| **Charge** | 3 in · 1.6 out | focus | inhale-weighted and fast — the sympathetic side of the same lever. Raises felt arousal; does *not* reliably improve motor accuracy |
| **Sharp Reset** | 15 forced exhales, then settle | focus | kapalabhati. Forced exhalation recruits deltoid and obliques more than a Valsalva; working-memory accuracy improved post-practice, reaction time lengthened |

Sessions start at 5 minutes because that is the minimum effective dose: comparing
5, 10, 15 and 20 minutes at six breaths per minute found no difference in vagal
activation between them. Longer sessions lower resting respiratory rate
afterward — duration buys carry-over, not depth.

## Features

- Four ambient companions (Drifter, Aurora, Ink, Bloom) drawn on canvas, each
  breathing with you and idling on its own between phases
- Synthesized audio, no asset files: a sustained tone that glides upward through
  the inhale and down through the exhale, over an optional low drone, with an
  optional soft metronome. Three voices — Bowls, Glass, Breath — plus Silent
- Local-only tracker: total hours, day streak, progress ring, and a chime at
  1, 3, 6, 12, 24, 50 and 100 hours. Nothing leaves the device
- Handles the two iOS traps: flips the audio session to `playback` so the ringer
  switch doesn't mute it, and takes a Wake Lock so the screen stays up

## Limits

Audio stops when iOS backgrounds the app, so it can't run behind a locked screen.

## Sources

- Balban et al. 2023, *Cell Reports Medicine* — [Brief structured respiration practices enhance mood and reduce physiological arousal](https://pmc.ncbi.nlm.nih.gov/articles/PMC9873947)
- Laborde et al. 2021, *IJERPH* — [Effects of slow-paced breathing duration on cardiac vagal activity](https://www.mdpi.com/1660-4601/18/23/12478)
- Laborde et al. 2021, *Sustainability* — [Inhalation/exhalation ratio and respiratory pauses](https://www.mdpi.com/2071-1050/13/14/7775)
- Nielsen et al. 2020, *Scientific Reports* — [Presleep slow breathing and polysomnographic sleep measures](https://www.nature.com/articles/s41598-020-64218-7)
- O'Connell et al. 2015 — [Forced exhalation, grunting and Valsalva on forehand force](https://pubmed.ncbi.nlm.nih.gov/26270695/)
- Cureus 2024 — [Kapalabhati, working memory and phasic HRV](https://www.cureus.com/articles/252321-the-influence-of-kapalabhati-on-working-memory-and-phasic-heart-rate-variability)
- *Frontiers in Psychology* 2022 — [Regulating breathing frequency alters emotions and motor performance](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.963711/full)

## Not medical advice

A calming practice, not a treatment. Stop if you feel light-headed.
