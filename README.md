# The Farm — Full-Stack Test Coverage Challenge

:pig2: :turkey:

> This is a **live** exercise — you're seeing this for the first time on the call, with about
> 35–40 minutes of coding time after setup. We're not expecting exhaustive coverage of everything
> below in that window; we're far more interested in your prioritization and process than in how
> much you finish. Talk out loud as you go.

### Overview

This is one full-stack application: an Angular UI (`angular-app/`) talking to a small
Express/TypeScript mock server (`mock-server/`). There are a number of rules about how animals
should be organized within the farm's array of colored barns, documented in detail in the
comments at the top of `mock-server/src/farmService.ts`, including two fully worked examples —
that comment is the specification the whole app (mock server and UI) is built against.

**Everything here is already fully implemented and working.** You are not being asked to build
anything. You're being asked to test it — as a real full-stack system, not two disconnected
pieces.

### Running it

From this directory:

```
npm run install:all
npm run dev
```

That installs and starts both pieces together — the mock server on port 3001 and the Angular
dev server on port 4200 (which proxies `/api` requests to the mock server, so the browser only
ever talks to one origin).

Then open **http://localhost:4200** in a browser. You should see a working UI: a form to add an
animal by name and favorite color, and a live view of every barn and which animals are in it.
Adding and removing animals through the page calls the real API underneath — there's no mock
data baked into the frontend itself.

Leave it running for the rest of this exercise — the Playwright suite below talks to this same
running app.

### Troubleshooting

- **`Local:` line never appears / browser says "connection refused" at localhost:4200.** The
  Angular CLI requires **Node 18.13 or newer**. Check with `node -v`. If you're on an older
  version, switch (e.g. `nvm use --lts`, or `nvm install --lts` if you don't have it yet) and
  re-run `npm run dev`. If you use `nvm`, note that switching versions is per-terminal-session
  unless you set a default (`nvm alias default lts/*`) — if you open a new terminal partway
  through, it can silently revert to an older Node and cause this exact symptom.
- **`EADDRINUSE` on port 3001 or 4200.** Something from an earlier run is still listening. Find
  and stop it with `lsof -t -i:3001` (or `:4200`) and `kill <PID>`, then re-run `npm run dev`.

### What's here

- `mock-server/src/farmService.ts` — the core business logic, and the spec comment describing
  the barn rules.
- `mock-server/src/server.ts` — the HTTP API (`GET`/`POST /api/v1/animals`,
  `DELETE /api/v1/animals/:id`) that the UI calls.
- `angular-app/src/app/` — the UI itself: standalone components (`animal-form`, `barn-list`),
  a service (`animal.service.ts`) wrapping the API calls, and the root `app.component`.
- `playwright/` — **your starting point**: true end-to-end tests that drive the real page in a
  real browser against the real running app. Two parallel starter suites are provided —
  `playwright/tests-js/` and `playwright/tests-ts/` — with the same example test and TODOs in
  both. Pick whichever language you're more comfortable with; you don't need to touch both.

### Task

Build the test coverage you'd want in place before you'd trust this app to ship. You're welcome
to add focused unit or component-level tests around the Angular or mock-server code if you think
they're worth the time, but the primary deliverable is the Playwright E2E suite — since that's
the layer that can actually tell you whether the UI and the API agree with each other.

Two things worth calling out:

1. Read the spec comment in `farmService.ts` closely, including both worked examples. A thorough
   suite should be able to reproduce both of them on its own, at whichever layer makes sense to
   you.
2. The UI and the API are not independent of each other. Something that's true of the API in
   isolation isn't automatically true of what a user actually sees on the page, and vice versa.
   Where you land on that is part of what we want to talk through live.

You are **not** required to modify any production code (the Angular app or the mock server). If
your tests turn up a case where something doesn't do what it's documented or expected to do,
that finding — and how you'd describe/report it — is part of the deliverable.

### Rules

_You must:_
- use Playwright for anything that drives the real page

_You may:_
- use any assertion style, test data builder, or fixture pattern you like
- add unit or component tests for the Angular app or mock server if you think they add value
- restructure or replace any of the starter test files if you think that makes the suite better

_You may not:_
- modify the mock server (`mock-server/`) or the shared data models
- add a UI framework or third-party runtime dependency to the Angular app itself

### Running the tests

```
cd playwright
npm install
npx playwright install --with-deps

npm run test:js                 # Playwright, JavaScript suite (needs the app running via `npm run dev` first)
# or
npm run test:ts                 # Playwright, TypeScript suite (same tests, same TODOs)

npm run test:js:ui               # either suite also has a --ui variant, e.g.:
npm run test:ts:ui
```

### Resources

- [Playwright docs](https://playwright.dev/docs/intro)
- [Angular docs](https://angular.dev/)
- [Angular testid / locator best practices](https://playwright.dev/docs/locators#locate-by-test-id)

---

:goat:
