import { ConnectionMonitor } from './connection'

beforeEach(() => jest.useFakeTimers())
afterEach(() => jest.useRealTimers())

test('starts in the background, backs off while offline, and stops after connecting', async () => {
    const ping = jest.fn<Promise<boolean>, []>().mockRejectedValue(new Error('offline'))
    const status = jest.fn()
    const monitor = new ConnectionMonitor(ping, status, () => undefined)
    monitor.start()
    expect(ping).not.toHaveBeenCalled()
    await jest.advanceTimersByTimeAsync(0)
    expect(ping).toHaveBeenCalledTimes(1)
    for (const [index, delay] of [
        15_000, 30_000, 60_000, 120_000, 240_000, 300_000, 300_000,
    ].entries()) {
        await jest.advanceTimersByTimeAsync(delay - 1)
        expect(ping).toHaveBeenCalledTimes(index + 1)
        await jest.advanceTimersByTimeAsync(1)
        expect(ping).toHaveBeenCalledTimes(index + 2)
    }
    ping.mockResolvedValue(true)
    await jest.advanceTimersByTimeAsync(300_000)
    expect(status).toHaveBeenLastCalledWith(true)
    expect(jest.getTimerCount()).toBe(0)
    monitor.stop()
})

test('manual checks bypass backoff and reset it after success', async () => {
    const ping = jest.fn<Promise<boolean>, []>().mockResolvedValue(false)
    const monitor = new ConnectionMonitor(ping, jest.fn(), () => undefined)
    monitor.start()
    await jest.advanceTimersByTimeAsync(45_000)
    expect(ping).toHaveBeenCalledTimes(3)
    ping.mockResolvedValue(true)
    expect(await monitor.check()).toBe(true)
    expect(jest.getTimerCount()).toBe(0)
    ping.mockResolvedValue(false)
    expect(await monitor.check()).toBe(false)
    await jest.advanceTimersByTimeAsync(15_000)
    expect(ping).toHaveBeenCalledTimes(6)
    monitor.stop()
})

test('shares pending checks and ignores completion after unload', async () => {
    let resolve!: (value: boolean) => void
    const ping = jest.fn(
        () =>
            new Promise<boolean>((done) => {
                resolve = done
            }),
    )
    const status = jest.fn()
    const monitor = new ConnectionMonitor(ping, status, () => 30_000)
    monitor.start()
    await jest.advanceTimersByTimeAsync(0)
    const first = monitor.check()
    expect(monitor.check()).toBe(first)
    await jest.advanceTimersByTimeAsync(600_000)
    expect(ping).toHaveBeenCalledTimes(1)
    monitor.stop()
    resolve(true)
    expect(await first).toBe(true)
    expect(status).not.toHaveBeenCalled()
    expect(jest.getTimerCount()).toBe(0)
})

test('optional connected checks use one timer, cleared on unload', async () => {
    const ping = jest.fn<Promise<boolean>, []>().mockResolvedValue(true)
    const monitor = new ConnectionMonitor(ping, jest.fn(), () => 30_000)
    monitor.start()
    monitor.start()
    await jest.advanceTimersByTimeAsync(30_000)
    expect(ping).toHaveBeenCalledTimes(2)
    expect(jest.getTimerCount()).toBe(1)
    monitor.stop()
    await jest.advanceTimersByTimeAsync(600_000)
    expect(ping).toHaveBeenCalledTimes(2)
    expect(jest.getTimerCount()).toBe(0)
})
