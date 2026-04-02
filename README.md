# Horse racing

Vue 3 + Vite front-end for a small horse racing simulator. You build a six-round program from a pool of twenty runners, run the races one after another, and read standings in the results panel. State lives in Vuex; the track animation is driven off the same store updates.

## Scripts

| Command | What it does |
|--------|----------------|
| `npm run dev` | Dev server (Vite) |
| `npm run build` | Typecheck + production bundle |
| `npm run preview` | Serve the built app locally |
| `npm run type-check` | `vue-tsc` |
| `npm run test:unit` | Vitest |
| `npm run test:e2e` | Playwright (`e2e/`), starts dev server if nothing is listening on 5173 |
| `npm run test:e2e:ui` | Same tests with Playwright UI mode |
| `npm run lint` | oxlint + ESLint |

The e2e smoke test hits Generate → Start and waits until the last lap shows up under Results. First run downloads browsers if you skipped the step above.

## Layout of the repo

- `src/views` — page-level shell
- `src/components/base` — shared button, table, typography
- `src/components/horse` / `src/components/race` — feature UI
- `src/store` — Vuex modules (`horses`, `race`)
- `src/utils` — schedule generation, finish ordering, frame timing
- `src/assets/styles` — global CSS variables
- `src/__tests__` — unit tests
- `e2e` — Playwright specs

## Notes

Pause during a run uses the same race action; the frame loop respects it so you can stop and resume without restarting the round.

If something looks off in the track or tables, check that the store has a schedule (`Generate program`) before hitting start.
