import { Anki } from './anki'

test('ping has a bounded timeout and does not immediately retry', async () => {
    const listeners: Record<string, () => void> = {}
    const xhr = {
        timeout: 0,
        addEventListener: (name: string, listener: () => void) => {
            listeners[name] = listener
        },
        open: jest.fn(),
        send: jest.fn(),
    }
    const original = Object.getOwnPropertyDescriptor(globalThis, 'XMLHttpRequest')
    const constructor = jest.fn(() => xhr)
    Object.defineProperty(globalThis, 'XMLHttpRequest', { configurable: true, value: constructor })
    try {
        const anki = new Anki(
            {} as any,
            {
                settings: { ankiConnectAddress: '127.0.0.1', ankiConnectPort: 8765 },
            } as any,
        )
        const ping = anki.ping()
        const result = expect(ping).rejects.toBe('failed to issue request')
        expect(xhr.timeout).toBe(3000)
        listeners.timeout()
        await result
        expect(constructor).toHaveBeenCalledTimes(1)

        const failed = anki.ping()
        const failure = expect(failed).rejects.toBe('failed to issue request')
        listeners.error()
        await failure
        expect(constructor).toHaveBeenCalledTimes(2)
    } finally {
        if (original) Object.defineProperty(globalThis, 'XMLHttpRequest', original)
        else Reflect.deleteProperty(globalThis, 'XMLHttpRequest')
    }
})
