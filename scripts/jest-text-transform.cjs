// Match esbuild's text loader for imported text assets.
module.exports = {
    process(source) {
        return { code: `module.exports = ${JSON.stringify(source)};` }
    },
}
