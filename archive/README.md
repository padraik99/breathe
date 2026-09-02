# Archive

Every version of this app is already preserved in git — each commit holds a
complete, self-contained `index.html` you can check out and open. This folder
exists for a different reason: **looking is not the same as restoring.** These
are openable directly, in a browser, without a checkout.

Only *generations* are kept here, not every tweak. Git already has the tweaks.

| File | What it was |
|---|---|
| `2026-08-25-list-v1.html` | First build. Vertical list of patterns on near-black, teal accent, serif names. Six patterns, four companions, bell tones at each phase change. |
| `2026-08-26-list-v2.html` | Same skeleton, much evolved: dive tables, handpan and shruti voices, timed rise/hold/fall shape graphs, brighter controls. The end of the list generation. |
| `2026-08-30-design-study-dial.html` | The mockup that chose the current interface. Three static screens, nothing wired up. Kept because the decision is more interesting than the outcome. |

The current app is `../index.html`.

## Why the palette changed

The list generation used cyan on near-black. Melanopsin — the retinal pigment
that signals daytime to the brain — peaks around 480 nm, which is almost exactly
that cyan. For a screen used in bed it was close to the worst available hue. The
dial generation runs warm for Sleep and Stress and is allowed to go cold only for
Focus and Dive, which are daytime tools. Worth knowing before anyone "restores"
the old look because they preferred it.

## Adding to this

When an interface generation is replaced rather than refined:

```
git show <commit>:index.html > archive/YYYY-MM-DD-<name>.html
```

Each file is around 100 KB, so a dozen generations costs about a megabyte. That
is not a reason to skip it.

## 2026-09-01-pre-audio-fixes.html

The build his daughter used the night the notes were written. Kept for A/B
against the measured audio changes: breath timbre, pre-cue pitch, metronome
placement. Everything else is identical to the current app.
