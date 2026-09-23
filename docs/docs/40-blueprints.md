# 📘 Blueprints

**Blueprints** are the things **AnkiBridge** uses to scan for notes in
your vault.

Each blueprint describes how a note may be laid out in your Obsidian documents,
and fancy logic behind the scenes ensures that no _collisions_ between two blueprints
are possible.

Any individual blueprint can be enabled or disabled using the [settings](08-settings.md) tab.

## 🥪 Sandwich

The sandwich blueprint is enclosed by `#anki/start` and `#anki/end` tags.
The front and back fields _sandwich_ a `#anki/---` tag.

The Sandwich blueprint was the first blueprint added and is generally inferior
to the [BasicCodeBlock blueprint](#-basiccodeblock).

> **Recommendation**
>
>
> I would recommend changing all Sandwich-style notes to the newer BasicCodeBlock-style
>


### Compatibility

| Mode         | Compatibility | Comment   |
| ------------ | :-----------: | --------- |
| Live Preview |      🟡      | Not great |
| Reading      |      ✔       |           |

### Example
````md
#anki/start
```anki-config
id: 1636912129121
deck: Math
tags:
  - equation
```
A function with period $L$ can be written as a __Fourier Series__:
#anki/---
$$
\begin{gather}
	f(x) = \frac{1}{2} a_0 + ∑\limits_{n=1}^∞ a_n \cos(k_n x) + ∑\limits_{n=1}^∞ b_n \sin(k_n x)\\
	\\
	\quad \text{Where } {k_n = \frac{nπx}{L}}
\end{gather}
$$
#anki/end
````

## 💻 BasicCodeBlock

The **BasicCodeBlock**-format consist of an Anki codeblock, hence the name.

### Layout

````md title="Layout of a BasicCodeBlock-style note"
```anki
CONFIG HERE
---
FRONT HERE
===
BACK HERE
```
````

Where both the config and the back are optional. Thus this is also valid:

````md title="Both the configuration and back field are optional"
```anki

This is a front page

$a = b$

[[link to some other note]]
```
````

And as is this:

````md title="Just front and back"
```anki
What is the answer to the question of life the universe and everything?
===
$42$
```
````

### Compatibility

| Mode         | Compatibility | Comment |
| ------------ | :-----------: | ------- |
| Live Preview |      ✔       |         |
| Reading      |      ✔       |         |

### Example

````md
```anki
id: 1636912129121
deck: Math
tags:
  - equation
---
A function with period $L$ can be written as a __Fourier Series__:
===
$$
\begin{gather}
	f(x) = \frac{1}{2} a_0 + ∑\limits_{n=1}^∞ a_n \cos(k_n x) + ∑\limits_{n=1}^∞ b_n \sin(k_n x)\\
	\\
	\quad \text{Where } {k_n = \frac{nπx}{L}}
\end{gather}
$$
```
````

### Appearance in Live Preview

![Live Preview rendering of a BasicCodeBlock note with math](../static/img/basiccodeblock_livepreview.gif)
