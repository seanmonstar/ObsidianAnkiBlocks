import { Blueprint } from 'ankibridge/blueprints/base'
import { NoteField } from 'ankibridge/entities/note'
import sandwichParser from 'ankibridge/grammars/CardSandwich.pegjs'
import { NoteBase } from 'ankibridge/notes/base'
import { dump } from 'js-yaml'

export class SandwichBlueprint extends Blueprint {
    public static readonly id = 'Sandwich'
    public static readonly displayName = 'Sandwich'
    public static readonly weight = 50
    public static readonly defaultConfigState = true

    protected async setupParser(): Promise<void> {
        this.parser = sandwichParser
    }

    public renderAsText(note: NoteBase): string {
        const front = note.fields[NoteField.Frontlike]
        const back = note.fields[NoteField.Backlike]

        const config = dump({
            id: note.id,
            deck: note.config.deck,
            tags: note.config.tags,
            delete: note.config.delete,
            enabled: note.config.enabled,
            cloze: note.config.cloze,
        })

        let str = ''
        str += '#anki/start\n'

        str += '```anki-config\n'
        str += config
        str += '```\n'

        str += front
        str += '#anki/---\n'

        str += back
        str += '#anki/end\n'

        return str
    }
}
