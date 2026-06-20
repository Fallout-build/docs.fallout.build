# docs.fallout.build

[![deploy](https://github.com/Fallout-build/docs.fallout.build/actions/workflows/deploy.yml/badge.svg)](https://github.com/Fallout-build/docs.fallout.build/actions/workflows/deploy.yml)
[![last deploy](https://img.shields.io/github/v/release/Fallout-build/docs.fallout.build?sort=date&display_name=tag&label=last%20deploy)](https://github.com/Fallout-build/docs.fallout.build/releases)
[![broken links](https://img.shields.io/github/issues/Fallout-build/docs.fallout.build/broken-link?label=broken%20links&color=critical)](https://github.com/Fallout-build/docs.fallout.build/issues?q=is%3Aissue+is%3Aopen+label%3Abroken-link)
[![last commit](https://img.shields.io/github/last-commit/Fallout-build/docs.fallout.build)](https://github.com/Fallout-build/docs.fallout.build/commits/main)

Docusaurus site that publishes [Fallout](https://github.com/Fallout-build/Fallout)'s documentation at **[docs.fallout.build](https://docs.fallout.build)**.

## How it works

- **Markdown source** lives in [Fallout-build/Fallout](https://github.com/Fallout-build/Fallout) under `docs/` — edited via PRs there, so doc changes ride with the code that motivates them.
- **This repo** holds only the Docusaurus config, theme, and deploy workflow. No markdown.
- **The build is dogfooded through Fallout itself** (`_build/Build.cs` drives npm via Fallout's `Npm` tool wrapper). `deploy.yml` checks out both repos, builds, and publishes to GitHub Pages.

> Two repos because the Fallout repo's Pages slot serves the apex `fallout.build`; GH Pages allows one custom domain per repo, so `docs.fallout.build` comes from here.

## On every deploy

- **Broken links → issues.** Docusaurus runs with `onBrokenLinks: 'warn'`, so links don't fail the build; instead each broken link gets a deduped GitHub issue titled `Broken Link: <link>` (label `broken-link`). One open issue per link — recurrences don't duplicate. New vs. already-known is then obvious from the issue list. See the [open broken links](https://github.com/Fallout-build/docs.fallout.build/issues?q=is%3Aissue+is%3Aopen+label%3Abroken-link).
- **A `deploy-*` release** is cut recording the config commit, the Fallout docs-source commit, and broken-link count — a cheap, browsable [deploy history](https://github.com/Fallout-build/docs.fallout.build/releases).

## Triggers

- `push` to `main` — config/theme changes.
- Daily at 02:00 UTC — picks up `docs/` updates from Fallout within 24h.
- `workflow_dispatch` — manual rebuild from the Actions tab.

## Local development

```bash
# One-time: clone the markdown source as a sibling check-out
git clone https://github.com/Fallout-build/Fallout fallout-source

npm ci
npm run start                                            # dev server, http://localhost:3000
dotnet run --project _build/_build.csproj -- BuildSite   # production build (dogfooded), output in ./build
```

The `npm run start` dev server stays on plain npm for fast iteration; only the production build goes through Fallout. Fallout is pinned to a nuget.org stable (`Fallout.Common` in `_build/_build.csproj`) — bump it deliberately, like any dependency.

## License

Documentation content is MIT-licensed by the [Fallout maintainers](https://github.com/Fallout-build/Fallout/blob/main/LICENSE). The build chrome in this repo is also MIT-licensed.
