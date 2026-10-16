# Brew Atlas Preview

Independent preview of the light iOS/macOS-inspired Brew Atlas design.

Preview: https://zijianz-nv.github.io/brew-atlas-preview/
Original site: https://zijianz-nv.github.io/brew-atlas/

The workflow checks out `zijianz-nv/brew-atlas` at immutable source commit
`7daa7cc59dbfb0def1520fe9b750cfb2e6346393`, applies `overrides/`, and builds
with `VITE_DEFAULT_DESIGN=apple` and the Pages base path. This repository
stores only the preview UI changes; each deployment packages its own complete
catalog, map assets, and display images. Raw research images stay archived
in the original source repository rather than the published site.

Only this repository's Pages deployment is updated. The original site and its
source branch are not modified. Explicit `?design=classic` is available for
comparison; ordinary URLs and shared beer links default to the new design.

To reproduce locally, check out the pinned source, copy `overrides/.` over it,
run `npm ci`, then `VITE_DEFAULT_DESIGN=apple npm run build` and `npm start`.
Keep `GITHUB_SHA` unset locally, or set it to the source commit when building
inside another repository's CI, so archived-source links remain valid.
