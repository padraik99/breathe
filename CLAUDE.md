# Working on Breathe

Notes for whoever picks this up next — including a future me with no memory of
building it.

## Shape of the project

`index.html` **is** the application. One self-contained file: markup, CSS,
synthesized audio and canvas animation, no dependencies, no build step. Open it,
edit it, reload it.

It must stay self-contained. It is installed to an iPhone Home Screen and used
at bedtime, often on a plane or with no signal — one external `src` or `href`
and it breaks offline. No CDNs, no font hosts, no audio files. Sounds are
generated at runtime by Web Audio, which is why the whole app is under 90 KB.

Patrick works on Windows and publishes with GitHub Desktop. He does not run
build tools, so **nothing unverified should reach him.**

## Before handing over any change

```
node tools/check.mjs
```

Checks the inline script parses, that nothing external crept in, that every
pattern has the fields the UI reads, and that the README table still matches the
app. It must exit 0.

If a rhythm, duration or pattern changed:

```
node tools/sync-readme.mjs
```

The README's pattern table is **generated** from the `PATTERNS` array. Do not
hand-edit it — it drifted badly once already. The reasoning under *Why these
patterns* is hand-written and stays that way: evidence does not change when a
number in the code does.

Then update `CHANGELOG.md` while the reasoning is still warm, and write the
commit message from the actual diff (`git status`, `git log`) rather than memory.

## How the interface is put together

The home screen is a dial, not a list, and it carries three separate jobs at
three radii. **Outer ring (r>148 in svg units): the length** — sixty ticks, an arc
that fills from twelve o'clock, absolute angle-to-minutes mapping. **Inner band
(120<r<148): the world** — companion and voice chosen as a pair from `WORLDS`, a
relative drag with a 50° detent, the band painted with that world's gradient.
**Dots on the inner band: the protocol** — equidistant, all one colour, the live
one wearing a `.halo` that breathes at six a minute; they are tapped, never
turned. Position on the ring carries no meaning, which is what stops it looking
lopsided. `#shapeStrip` flashes the chosen pattern's shape for 2.8s on any change
and then gets out of the way. The `all` category falls back to `#listView`.

The split is deliberate: rotary gestures suit continuous quantities and taps suit
discrete choices. An earlier build had the ring selecting patterns, which is why
it needed carets to explain itself.

Colour is driven entirely by `body[data-cat=…]` custom properties. `--tint` is not
decoration: it is fed to a `source-atop` fill over the canvas so the companion is
warmed toward the category accent without touching the background. Sleep runs warm
on purpose — melanopsin peaks near 480 nm, so a cyan bedtime screen suppresses
melatonin more than an amber one.

Session length is a *target*, not a cutoff. `realLength()` walks the pattern
forward and returns the end of the first exhale at or after the requested time, so
a session never stops mid-out-breath. Dive tables ignore it — they set their own.

## Two bugs that have already happened

- **An unescaped apostrophe** in a pattern's `why` string terminated the literal
  and broke the entire inline script. The menu still rendered; sessions silently
  refused to start. Pattern prose is full of apostrophes — use `’` inside single
  quoted strings, and let `check.mjs` confirm it.
- **A container with no size.** `#listView` was nested inside `#dial`, which
  collapses to 0×0 when its SVG is hidden, so the ALL list rendered into nothing.
  Absolutely positioned children need an ancestor that still has dimensions.
- **Gravity and current swapped** in the tentacle simulation: the lateral force
  was four times gravity, so the tentacles blew sideways like a gale. Gravity
  dominates; the current is a sway. And the flow must vary *along* the rope, not
  only over time — a single lateral force just produces a straight rope leaning.
- **`offsetTop` measured against the wrong ancestor.** `.list` is not positioned,
  so its children's `offsetTop` included the header height and the list scrolled
  past the selected pattern. Measure with `getBoundingClientRect()` against the
  scroll box.

## Things that look like mistakes but are not

- **System fonts, not Google Fonts.** The app must work offline.
- **The base64 PNG in `<head>`.** That is the Home Screen icon; it has to be
  inline for the same reason.
- **The one-second silent WAV.** iOS mutes Web Audio when the ringer switch is
  off, which would silence a bedtime app. Playing a silent `<audio>` element
  flips the session to `playback`. Removing it breaks sound for half the users.
- **Evidence notes that undercut their own pattern.** Box breathing's note says
  it moves HRV less than resonance; the O₂ table's says tables are not more
  intense than plain maximal holds. That honesty is the point of the app, not an
  oversight. Two patterns have already been cut for failing it — 4-7-8 and a
  "Charge" upregulation pattern. Do not quietly reinstate them.

## Safety content is not decoration

The dive tables carry a warning about hypoxic blackout and about
hyperventilation before breath-holding. People die from exactly this. Do not
shorten it for layout reasons.
