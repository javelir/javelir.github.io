# javelir.github.io

Static redirect to the main Javelir site.

## Setup

1. In `index.html` and `404.html`, replace every `https://javelir.com/` with your real site URL (same string in both files).
2. In the GitHub repo **Settings → Pages**, set **Source** to **Deploy from a branch**, choose your default branch (e.g. `master` or `main`), folder **`/` (root)**.  
   If you previously used the **`gh-pages`** branch from `npm run deploy`, switch to the default branch and root so these HTML files are served.
3. Push the changes.

There is no build step. Optional: remove the local `node_modules` folder if it is still on disk from the old React app; it is not part of this repo anymore.
