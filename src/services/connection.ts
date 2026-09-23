// One request at a time, with no timer running while a request is pending.
export class ConnectionMonitor {
    private timer: ReturnType<typeof setTimeout> | undefined
    private pending: Promise<boolean> | undefined
    private active = false
    private retryDelay = 15_000

    constructor(
        private ping: () => Promise<boolean>,
        private updateStatus: (connected: boolean) => void,
        private connectedInterval: () => number | undefined,
    ) {}

    start(): void {
        this.active = true
        this.schedule(0)
    }

    stop(): void {
        this.active = false
        this.clearTimer()
    }

    check(): Promise<boolean> {
        if (this.pending) return this.pending
        this.clearTimer()
        this.pending = this.runCheck()
        return this.pending
    }

    private async runCheck(): Promise<boolean> {
        let connected = false
        try {
            // Also capture a synchronous failure from the request implementation.
            connected = await Promise.resolve().then(() => this.ping())
        } catch {
            connected = false
        }
        this.pending = undefined
        if (this.active) {
            this.updateStatus(connected)
            if (connected) {
                this.retryDelay = 15_000
                const interval = this.connectedInterval()
                if (interval !== undefined) this.schedule(interval)
            } else {
                this.schedule(this.retryDelay)
                this.retryDelay = Math.min(this.retryDelay * 2, 300_000)
            }
        }
        return connected
    }

    private clearTimer(): void {
        if (this.timer !== undefined) clearTimeout(this.timer)
        this.timer = undefined
    }

    private schedule(delay: number): void {
        this.clearTimer()
        if (this.active) {
            this.timer = setTimeout(() => {
                this.timer = undefined
                void this.check()
            }, delay)
        }
    }
}
