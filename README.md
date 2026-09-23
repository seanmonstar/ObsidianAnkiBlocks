# Obsidian AnkiBridge — personal fork

Anki integration for Obsidian, originally by Jeppe Klitgaard. This fork is
maintained for personal use and installed locally. The plugin ID remains
`obsidian-ankibridge` so existing settings and notes continue to work.

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
Direct dependency versions are retained from the original Yarn lockfile where
possible; broader dependency upgrades are separate work.

## Install in your vault

Create `<vault>/.obsidian/plugins/obsidian-ankibridge/` and copy these files into it:

- `main.js`
- `styles.css`
- `manifest.json`

Restart Obsidian and enable AnkiBridge under Settings → Community plugins.
For updates, replace those same three files and reload the plugin. Keep any
existing `data.json` in the plugin folder; it contains your settings.

Anki must be running with AnkiConnect installed. See the
[AnkiConnect setup instructions](docs/docs/05-installation.md#installing-ankiconnect)
and [usage documentation](docs/README.md).

## Development

- `npm run dev` watches and rebuilds JavaScript.
- `npm run sass:dev` watches and rebuilds styles in a second terminal.
- `npm run check` type-checks once; `npm run check:watch` watches changes.
- `npm test` runs tests; `npm run test:dev` watches tests.
- `npm run lint` checks the inherited lint rules; `npm run lint:fix` applies fixes.

Watch commands write into this checkout. Copy the output to the vault as above.
The existing tests cover only a small part of parsing; they do not validate live
Obsidian/Anki synchronization.

## License

[MIT](LICENSE). Original copyright and attribution are retained.
