import { NoteBase } from './base'
import { NotesInfoResponseEntity } from 'ankibridge/entities/network'
import { NoteField } from 'ankibridge/entities/note'

function info(modelName: 'Basic' | 'Cloze', fields: string[]): NotesInfoResponseEntity {
    return {
        noteId: 123,
        modelName,
        tags: [],
        cards: [],
        fields: Object.fromEntries(fields.map((name, order) => [name, { value: name, order }])),
    }
}

test.each([
    ['Basic', ['Front', 'Back']],
    ['Cloze', ['Text', 'Back Extra']],
] as const)('reads standard %s fields', (modelName, fields) => {
    expect(NoteBase.prototype.normaliseNoteInfoFields(info(modelName, [...fields]))).toEqual({
        [NoteField.Frontlike]: fields[0],
        [NoteField.Backlike]: fields[1],
    })
})

test('reports missing and available fields instead of reading an undefined value', () => {
    expect(() =>
        NoteBase.prototype.normaliseNoteInfoFields(info('Cloze', ['Text', 'Extra'])),
    ).toThrow(
        'Anki note type "Cloze" is missing expected fields: "Back Extra". Available fields: "Text", "Extra".',
    )
})
