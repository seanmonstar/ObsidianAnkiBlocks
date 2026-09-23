import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const readJson = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url)))
const [manifest, pkg, lock] = await Promise.all(
    ['manifest.json', 'package.json', 'package-lock.json'].map(readJson),
)
const version = manifest.version
assert.match(version, /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/, 'Use a numeric major.minor.patch version')
assert.equal(pkg.version, version, 'package.json and manifest.json versions must match')
assert.equal(lock.version, version, 'package-lock.json version must match manifest.json')
assert.equal(lock.packages[''].version, version, 'Lockfile root version must match manifest.json')
assert.equal(manifest.id, 'anki-blocks', 'The release must use the AnkiBlocks plugin ID')
if (process.argv[2] !== undefined) {
    assert.equal(process.argv[2], version, 'Release tag must match manifest.json exactly (no v prefix)')
}
console.log(`Release metadata valid: ${manifest.name} ${version}`)
