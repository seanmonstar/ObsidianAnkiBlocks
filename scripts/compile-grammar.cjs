const { readFileSync } = require('node:fs')
const { join } = require('node:path')
const { generate } = require('peggy')

const dependencies = ['utils.js.static', 'Lib.pegjs'].map((name) =>
    join(__dirname, '../src/grammars', name),
)

function compile(source) {
    const [utils, library] = dependencies.map((path) => readFileSync(path, 'utf8'))
    const grammar = '{{\n' + utils + '\n}}\n\n\n' + source + '\n\n// LIBRARY: lib\n' + library
    return generate(grammar, { output: 'source', format: 'commonjs' })
}

module.exports = { compile, dependencies }
