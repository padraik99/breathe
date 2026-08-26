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
| **Sharp Reset** | 15 forced exhales, then settle | focus | kapalabhati. Forced exhalation recruits deltoid and obliques more than a Valsalva; working-memory accuracy improved post-practice, reaction time lengthened |
| **CO₂ Table** | 6 holds of 40s, rest 90s→30s | dive | trains tolerance of air hunger. In novices, CO₂ tables dropped SpO₂ ~6% vs ~16% for maximal holds |
| **O₂ Table** | 5 holds 30s→70s, 90s recovery | dive | trains hypoxia tolerance. Two weeks of daily dry apnea sharpens the diving response; eight weeks raises resting spleen volume |

Sessions start at 5 minutes because that is the minimum effective dose: comparing
5, 10, 15 and 20 minutes at six breaths per minute found no difference in vagal
activation between them. Longer sessions lower resting respiratory rate
afterward — duration buys carry-over, not depth.

## Breath-hold safety

The dive tables are **land-only**. Sit or lie down; never practise them in or near
water. Hypoxic blackout gives no warning and there is no self-rescue from it. The
breathe-up in these tables is deliberately slow — hyperventilating first is what
makes breath-holding lethal, because it strips the CO₂ that would otherwise make
you breathe before your oxygen ran out. The app states this on every dive pattern.

## Features

- Four ambient companions (Drifter, Aurora, Ink, Bloom) drawn on canvas, each
  breathing with you and idling on its own between phases
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
