/**
 * Connection
 *
 * Simulates a database connection. In a real system this would wrap
 * a pg.Client, mysql2 connection, etc.
 */
export class Connection {
  private static nextId = 1;

  readonly id: number;
  private _inUse = false;

  constructor() {
    this.id = Connection.nextId++;
  }

  get inUse(): boolean {
    return this._inUse;
  }

  /** Called by the pool when the connection is handed to a client. */
  acquire(): void {
    if (this._inUse) throw new Error(`Connection #${this.id} is already in use`);
    this._inUse = true;
  }

  /** Called by the pool when the connection is returned. */
  release(): void {
    this._inUse = false;
  }

  /**
   * Simulate executing a SQL query with some network/IO latency.
   */
  async query(sql: string): Promise<string> {
    if (!this._inUse) throw new Error(`Connection #${this.id} is not acquired`);
    const latencyMs = 50 + Math.random() * 150; // 50–200 ms
    await new Promise((r) => setTimeout(r, latencyMs));
    return `[conn #${this.id}] result of: ${sql}`;
  }
}
