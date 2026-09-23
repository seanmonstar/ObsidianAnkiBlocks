import basic from './BasicCodeBlock.pegjs'
import processor from './BasicCodeBlockProcessor.pegjs'
import sandwich from './CardSandwich.pegjs'
import { readFileSync } from 'fs'
import { join } from 'path'
import { generate, Parser } from 'peggy'

const read = (name: string): string => readFileSync(join(__dirname, name), 'utf8')

// Reproduce the old runtime assembly independently of the build transformer.
function runtimeParser(name: string): Parser {
    return generate(
        '{{\n' +
            read('utils.js.static') +
            '\n}}\n\n\n' +
            read(name) +
            '\n\n// LIBRARY: lib\n' +
            read('Lib.pegjs'),
    )
}

function outcome(parser: Parser, source: string): unknown {
    try {
        return { result: parser.parse(source) }
    } catch (error) {
        const { name, message, expected, found, location } = error as any
        return { error: { name, message, expected, found, location } }
    }
}

const body = 'id: 1635543498317\ndeck: Default\ntags:\n  - example\n---\nQuestion 🦉\n===\nAnswer\n'

describe.each([
    [
        'BasicCodeBlock.pegjs',
        basic,
        [
            '',
            'Ordinary markdown\n',
            'Before\n```anki\n' + body + '```\nAfter\n',
            '```anki\nFront only\n```\n',
            '```anki\n' + body + '```\n```anki\nSecond\n===\nBack\n```\n',
            '```anki\nUnclosed block\n',
        ],
    ],
    [
        'BasicCodeBlockProcessor.pegjs',
        processor,
        [body, 'Front only\n', 'Question\n===\nAnswer', '', '---\n'],
    ],
    [
        'CardSandwich.pegjs',
        sandwich,
        [
            '',
            'Ordinary markdown\n',
            read('../test/data/sandwich-pure.md'),
            '#anki/start\nFront\n#anki/---\nBack\n#anki/end\n',
            '#anki/start\nUnclosed card\n',
        ],
    ],
] as Array<[string, Parser, string[]]>)('%s', (name, compiled, cases) => {
    const original = runtimeParser(name)

    test.each(cases)('matches runtime parser for %j', (source) => {
        expect(outcome(compiled, source)).toEqual(outcome(original, source))
    })
})
