# ✨ Features

## 🖼 Rendering

### 🦋 Live Preview Rendering

The [BasicCodeBlock Blueprint](40-blueprints.md#-basiccodeblock) offers excellent
rendering in *Live Preview*, making your notes seamlessly integrate into
the rest of your beautiful Obsidian notes.

For an example, have a look at the [💃 Demonstration](30-demonstration.md) page.

### 🧮 Math Rendering

Using the Math [postprocessor] your LaTeX in Obsidian will
correctly be rendered in Anki.

### 🃏 Deck Support

**AnkiBridge** intelligently finds the right deck for your note.

The deck to upload to is resolved in the following order:

1. The value specified by the deck key of your [note configuration]
2. The deepest match of your [default deck mapping](08-settings.md#-default-deck-mapping)
3. The default value specified in [settings](08-settings.md#-default-deck-mapping)

### 🏷 Tag Support

You can specify Anki tags for your notes using the [note configuration]

Optionally a global tag for all your notes can be set using the [settings](08-settings.md#-general-settings)

### 📘 Blueprints

Your notes are found using [Blueprints](40-blueprints.md) using a `PEG` parser.

This has several advantages:

1. Easily extensible
2. Performant (as opposed to regex-based solutions)
3. Avoids collisions – a block of text in your Obsidian documents can only be used by a single blueprint.
4. Easier to debug

### 📺 Media Rendering

Using the Media [postprocessor] any embedded images, videos, and audios from
your Obsidian vault will be synchronised to Anki seamlessly!

### ❔ Cloze Deletion

Cloze deletion is a breeze when using the Cloze [postprocessor].

It supports turning both deletion and marks into clozes:

```md
~~Paris~~ is the capitol of ~~France~~
```

Or 

```md
==London== is the capitol of ==England==
```

### Link Rendering

Links to other files in your Obsidian vault are automatically turned into URI links
using the Links [postprocessor]
that will take you straight to the right place in your vault from within Anki.

### Link Back to Source

When using the LinkToSource [postprocessor] **AnkiBridge** will add a link
to the front of your cards taking you back to the note in Obsidian.

## ♻ Safe sync

**AnkiBridge** will always use the Obsidian note as a ground-truth, so you can
be sure that the Anki notes reflect what is in your vault.

> **Always update AnkiBridge cards in Obsidian**
>
>
> Since **AnkiBridge** uses Obsidian as ground-truth, it will overwrite any
> changes made to Obsidian-controlled notes in Anki.
>


### 🚮 Delete from Obsidian

You can delete a note from Anki using **AnkiBridge** by setting the `delete`
key of the [note configuration] to `true` and performing a sync.

### 🤖 Automagic

**AnkiBridge** automatically moves your notes to the appropriate deck in Anki when
updating the Obsidian note.

Similarly it will update your Anki note tags and field content whenever you sync!

[postprocessor]: /processors
[note configuration]: /notes#configuration
