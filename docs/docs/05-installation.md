# Installation

Install AnkiBlocks through BRAT using the [installation instructions](../../README.md#install-through-brat).

## Installing AnkiConnect

1. Install [AnkiConnect](https://ankiweb.net/shared/info/2055492159) in Anki
   1. Tools → Add-ons → Get Add-ons...
   2. Paste the code `2055492159` > OK
2. Press the `Setup` button within the **AnkiBlocks** settings in Obsidian
   1. Press `YES` on the Anki pop-up

As an alternative to step 2 you can also paste the configuration below into 
the **AnkiConnect** configuration:

3. Select the plugin → Config → Paste the configuration [below](#ankiconnect-configuration)

### AnkiConnect Configuration

> **Other method is preferred**
>
>
> Using the other method described above is preferred, but this should work as
> well.


```json
{
    "apiKey": null,
    "apiLogPath": null,
    "webBindAddress": "127.0.0.1",
    "webBindPort": 8765,
    "webCorsOrigin": "http://localhost",
    "webCorsOriginList": [
        "http://localhost",
        "app://obsidian.md"
    ]
}
```
