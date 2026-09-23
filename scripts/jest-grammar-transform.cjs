const { createHash } = require('node:crypto')
const { readFileSync } = require('node:fs')
const { compile, dependencies } = require('./compile-grammar.cjs')

module.exports = {
    process(source) {
        return { code: compile(source) }
    },
    getCacheKey(source, path, options) {
        const hash = createHash('sha256').update(source).update(path).update(options.configString)
        for (const dependency of [
            __filename,
            require.resolve('./compile-grammar.cjs'),
            require.resolve('peggy/package.json'),
            ...dependencies,
        ]) {
            hash.update(readFileSync(dependency))
        }
        return hash.digest('hex')
    },
}
