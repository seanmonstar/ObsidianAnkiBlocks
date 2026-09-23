# AnkiBlocks

A personal fork of [AnkiBridge](https://github.com/JeppeKlitgaard/ObsidianAnkiBridge),
originally by Jeppe Klitgaard, for syncing flashcard blocks in Obsidian with Anki.
This fork uses its own plugin ID, `anki-blocks`, and its own settings.

## Build

Use Node **22.20.0** (also recorded in `.nvmrc`) and npm **10.9.3**, bundled
with that Node release. If you use nvm, run `nvm install` and `nvm use` first.

```sh
npm ci
npm run build
npm run test:ci
```

`npm ci` installs the committed `package-lock.json` without changing dependency
versions. The build type-checks the plugin and produces `main.js` and
`styles.css` beside `manifest.json`. No website build or publishing step is needed.
Build and test tools are pinned in `package.json` and the lockfile. Runtime
dependency upgrades are handled separately.

## Install through BRAT

After the first [GitHub release](https://github.com/seanmonstar/ObsidianAnkiBlocks/releases)
is published:

1. Install and enable **BRAT** from Obsidian's Community Plugins browser.
2. In BRAT, choose **Add a beta plugin** and enter:
   `https://github.com/seanmonstar/ObsidianAnkiBlocks`
3. Disable the original **AnkiBridge** plugin if installed.
4. Enable **AnkiBlocks** under Community Plugins and configure it for your Anki setup.

BRAT installs the release assets and can handle updates. No submission to the
Obsidian community directory is required. The separate plugin ID means settings
from AnkiBridge are not automatically imported. Existing card syntax and embedded
Anki note IDs are unchanged.

Anki must be running with AnkiConnect installed. See the
[AnkiConnect setup instructions](docs/docs/05-installation.md#installing-ankiconnect)
and [usage documentation](docs/README.md).

## Publish a version

The release workflow builds, tests, and attaches `main.js`, `manifest.json`, and
`styles.css` to a GitHub release when a numeric version tag is pushed. The tag,
release title, and manifest version match, as expected by
[BRAT](https://github.com/TfTHacker/obsidian42-brat/blob/main/BRAT-DEVELOPER-GUIDE.md).

For the first release, commit these changes and push the commit to your fork.
Then tag that commit and push the tag:

```sh
node scripts/check-release.mjs 0.1.0
git tag 0.1.0
git push origin 0.1.0
```

If GitHub Actions is disabled on the fork, enable workflows in the repository's
Actions tab before pushing the tag. Once the **Release for BRAT** workflow succeeds,
BRAT can install the plugin from the repository URL above.

For later releases, use `npm version X.Y.Z --no-git-tag-version` to update
`package.json` and the lockfile, set the same version in `manifest.json`, and commit
those changes. Tag and push that version without a `v` prefix. The workflow rejects
mismatched versions before publishing. Ordinary branch pushes only run checks.

## Development

- `npm run dev` watches and rebuilds JavaScript.
- `npm run sass:dev` watches and rebuilds styles in a second terminal.
- `npm run check` type-checks once; `npm run check:watch` watches changes.
- `npm test` runs tests; `npm run test:dev` watches tests.
- `npm run lint` checks the inherited lint rules; `npm run lint:fix` applies fixes.

Watch commands write into this checkout. Publish a new version to install updates through BRAT.
The existing tests cover only a small part of parsing; they do not validate live
Obsidian/Anki synchronization.

## License

[MIT](LICENSE). Original copyright and attribution are retained.
