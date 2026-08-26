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

## Two bugs that have already happened

- **An unescaped apostrophe** in a pattern's `why` string terminated the literal
  and broke the entire inline script. The menu still rendered; sessions silently
  refused to start. Pattern prose is full of apostrophes — use `’` inside single
  quoted strings, and let `check.mjs` confirm it.
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
