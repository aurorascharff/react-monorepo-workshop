# Steps

Frozen full-repo snapshots after each module, used as a recovery path when participants fall behind.

| What                              | Audience    | Purpose                                                                                                                                                       |
| --------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`exercises/`](../exercises/)     | Participant | Task brief (`exercise-N-NAME.md`) and step-by-step walkthrough in [`exercises/solutions/`](../exercises/solutions/). The walkthroughs are the canonical live-coding script too. |
| [`steps/step{N}/`](.)             | Both        | Frozen full-repo snapshot of the **end state after module `N`**. `step0` is the starter; `step5` is the finished repo.                                        |

Module `N` is the work that takes `step{N-1}` to `step{N}`. So `exercises/solutions/exercise-1-architecture-and-reuse-steps.md` describes the work that turns `step0` into `step1`, which is the same work the matching task brief asks the participant to do.

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

1. Open the matching `exercises/solutions/exercise-N-NAME-steps.md` — the walkthrough holds the rationale, code, and ordering.
2. Give participants their work-time slot.
3. Live-code the walkthrough.
4. Commit and push. Tell participants they can `git pull` if they prefer your version, or check out `steps/step{N}/` if they're badly stuck.
