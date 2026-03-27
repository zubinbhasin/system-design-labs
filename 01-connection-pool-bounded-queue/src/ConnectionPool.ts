import { BoundedBlockingQueue } from "./BoundedBlockingQueue";
import { Connection } from "./Connection";

/**
 * ConnectionPool
 *
 * Manages a fixed set of reusable Connection objects backed by a
 * BoundedBlockingQueue. When all connections are checked out, callers
 * to acquire() automatically wait (no polling, no busy-waiting) until
 * one is returned.
 *
 *   acquire()  → dequeue from the pool (blocks if empty)
 *   release()  → enqueue back into the pool (unblocks a waiter if any)
 *
 *   withConnection() wraps acquire/release in a try/finally so
 *   connections are always returned even if the callback throws.
 */
export class ConnectionPool {
  private readonly queue: BoundedBlockingQueue<Connection>;
  private readonly poolSize: number;

  constructor(poolSize: number) {
    if (poolSize <= 0) throw new Error("Pool size must be > 0");
    this.poolSize = poolSize;
    this.queue = new BoundedBlockingQueue<Connection>(poolSize);

    // Pre-populate the pool with idle connections
    for (let i = 0; i < poolSize; i++) {
      const conn = new Connection();
      // enqueue() on an empty queue resolves immediately
      this.queue.enqueue(conn);
    }

    console.log(`[Pool] Initialized with ${poolSize} connections`);
  }

  /**
   * Check out a connection. Waits (non-blocking to the event loop) if
   * the pool is exhausted.
   */
  async acquire(): Promise<Connection> {
    const conn = await this.queue.dequeue();
    conn.acquire();
    console.log(`[Pool] Connection #${conn.id} acquired  (pool remaining: ${this.queue.size})`);
    return conn;
  }

  /**
   * Return a connection back to the pool, potentially unblocking a waiter.
   */
  release(conn: Connection): void {
    conn.release();
    this.queue.enqueue(conn);
    console.log(`[Pool] Connection #${conn.id} released  (pool remaining: ${this.queue.size})`);
  }

  /**
   * Convenience wrapper — always releases the connection, even on error.
   */
  async withConnection<T>(fn: (conn: Connection) => Promise<T>): Promise<T> {
    const conn = await this.acquire();
    try {
      return await fn(conn);
    } finally {
      this.release(conn);
    }
  }

  get availableCount(): number {
    return this.queue.size;
  }

  get totalCount(): number {
    return this.poolSize;
  }
}
