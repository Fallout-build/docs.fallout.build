# docs.fallout.build

Docusaurus build that publishes [Fallout](https://github.com/Fallout-build/Fallout)'s documentation at **[docs.fallout.build](https://docs.fallout.build)**.

## Architecture

Two repos, one site:

- **[Fallout-build/Fallout](https://github.com/Fallout-build/Fallout)** — markdown source-of-truth lives at `docs/`. Edits land via PRs to the Fallout repo so doc changes go with the code that motivates them.
- **This repo** — Docusaurus config, theme, components, deploy workflow. No markdown.

At build time, `.github/workflows/deploy.yml` checks out **both** repos: this one (config/theme) and Fallout (source). Docusaurus reads from `./fallout-source/docs` and emits the static site.

## Why two repos

The Fallout repo's GitHub Pages slot is taken by the apex domain `fallout.build`. GH Pages allows only one custom domain per repo, so a sibling subdomain (`docs.fallout.build`) must come from a different repo. This is the cheapest separation.

## Deploy triggers

- `push` to `main` of this repo — config/theme changes.
- Daily schedule at 02:00 UTC — picks up `docs/` updates from Fallout within 24h.
- `workflow_dispatch` — manual rebuild on demand.

If you need an immediate rebuild after a Fallout `docs/` change, trigger the workflow manually from the Actions tab.

## Local development

```bash
# One-time clone of the markdown source as a sibling check-out
git clone https://github.com/Fallout-build/Fallout fallout-source

# Live dev server (npm directly — fast iteration)
npm ci
npm run start   # http://localhost:3000

# Production build — dogfooded through Fallout itself
dotnet run --project _build/_build.csproj -- BuildSite   # static output in ./build
```

## Dogfooding the build

The production build runs through **Fallout** (`_build/Build.cs`), which drives
npm via Fallout's `Npm` tool wrapper: `Restore` (`npm ci`) → `BuildSite`
(`npm run build`). CI (`deploy.yml`) invokes the same `dotnet run … BuildSite`.
This makes the docs site a real-world consumer of Fallout — the C#/.NET build
system documented here building a Node/Docusaurus project.

Fallout is pinned to a nuget.org stable release (`Fallout.Common` in
`_build/_build.csproj`); bump it deliberately like any other dependency.
The `npm run start` dev server is intentionally left on plain npm for fast
local iteration.

## License

Documentation content is MIT-licensed by the [Fallout maintainers](https://github.com/Fallout-build/Fallout/blob/main/LICENSE).
The build chrome in this repo is also MIT-licensed.
