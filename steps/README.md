# Steps

This folder is the instructor-facing companion to [`exercises/`](../exercises/). Three pieces work together:

| What                                         | Audience    | Purpose                                                                                                                |
| -------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| [`exercises/`](../exercises/)                | Participant | The task brief. Same wording the participant reads. Lives at the repo root so they can find it from the README.        |
| [`steps/step-notes/step{N}.md`](step-notes/) | Instructor  | The teaching script for module `N`: framing, questions, live-coding sequence, gotchas, things to say.                  |
| [`steps/step{N}/`](.)                        | Both        | Frozen full-repo snapshot of the **end state after module `N`**. `step0` is the starter. `step5` is the finished repo. |

Module `N` is the work that takes `step{N-1}` to `step{N}`. So `step1.md` describes the work that turns `step0` into `step1`, which is the same work `exercise-1-architecture-and-reuse.md` asks the participant to do.

## Diff between snapshots

```bash
npm run diff:steps                              # summary across every adjacent pair
npm run diff:steps -- --name-only               # changed file names only
npm run diff:steps -- --name-status             # adds A/M/D status
npm run diff:steps -- --all                     # full patch across every pair
npm run diff:steps -- step1 step2               # one pair only
npm run diff:steps -- step1 step2 apps/arena    # one pair, scoped to a path
npm run diff:steps -- --path apps/arena --stat  # all pairs, scoped to a path
```

`scripts/diff-steps.mjs` skips `node_modules`, `.turbo`, `.next`, `dist`, `*.tsbuildinfo`, the SQLite seed, and `next-env.d.ts` by default. Pass `--include-generated` if you want them.

## Live-coding workflow

1. Open the exercise file alongside the step-note. Show the exercise to the participant; keep the step-note in your editor.
2. Give participants their work-time slot.
3. Live-code the step-note flow.
4. Commit and push. Tell participants they can `git pull` if they prefer your version.

`step-notes/step0.md` is the setup walk-through (no participant work) — it covers the README tour, app tour, starter-code tour, boundaries, and a brief AGENTS.md mention.
