# 🦮 Basic Usage

It is time to make your first Anki note **in Obsidian**! 🎉

First ensure that you have followed the instructions in [💿 Installation](05-installation.md)
and test that the `Test` button found in the AnkiBridge settings is working.

> **Remember**
>
>
> Anki must be running whenever you are syncing (or testing) with – otherwise the sync will simply fail to connect.
>
> If that happens, that is fine. Simply start Anki and sync again!
>
> You can always see whether **AnkiBridge** has a connection to Anki by looking at the
> status bar.
>
> ![Anki Status No](../static/img/anki_status_no.png)
> ![Anki Status Yes](../static/img/anki_status_yes.png)
>


## ✍ Writing the first note

Now that you have confirmed that your setup is working, let's make a [BasicCodeBlock](40-blueprints.md#-basiccodeblock)-style note.

You start out by making an `anki` codeblock like so:

````md title="Layout of a BasicCodeBlock-style note"
```anki
CONFIG HERE
---
FRONT HERE
===
BACK HERE
```
````

You simple put the [note configuration](50-notes.md#configuration) in the area marked `CONFIG HERE`.

The front of the Anki card is the content between `---` and `===`, and the back is the remainder of the codeblock (from `===` to ` ``` `).

Both the configuration and the back field are optional, so both of these are also valid [BasicCodeBlock]s:

````md title="Both the configuration and back field are optional"
```anki

This is a front page

$a = b$

[[link to some other note]]
```
````

Or 

````md title="Just front and back"
```anki
What is the answer to the question of life the universe and everything?
===
$42$
```
````

## ♻ Syncing with Anki

We're now ready to sync with Anki

Using the *Command Palette* of Obsidian, you have the following commands available to you:

1. `AnkiBridge: Sync active file with Anki`
2. `AnkiBridge: Sync active file with Anki (Silent)`
3. `AnkiBridge: Sync all files with Anki`

The first two only sync the file you currently have open, while the third command will look through all
of your vault and sync all the found notes with Anki.

Try running the first command: `AnkiBridge: Sync active file with Anki`.
It should report back that a single note was created in Anki!

!!!info
The silent version of the active file sync might be useful to set up
_auto-sync_. For more on this, see [🤖 Auto-Sync](15-advanced-usage/10-auto-sync.md)

## 🎉 Congratulations

You just set up your first Anki note in Obsidian!


[BasicCodeBlock]: /blueprints#-basiccodeblock
